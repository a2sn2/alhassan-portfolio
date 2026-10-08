"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RouteProgressBar } from "./RouteProgressBar";
import styles from "./NavigationTransition.module.css";
import { cn } from "@/utils/cn";

interface NavigationTransitionProps {
  children: React.ReactNode;
}

// Sub-component wrapped in Suspense for Next.js App Router query param tracking
function SearchParamsWatcher({
  onSearchChange,
}: {
  onSearchChange: (search: string) => void;
}) {
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();

  useEffect(() => {
    onSearchChange(searchString ? `?${searchString}` : "");
  }, [searchString, onSearchChange]);

  return null;
}

export function NavigationTransition({ children }: NavigationTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentSearch, setCurrentSearch] = useState("");
  const currentRouteKey = `${pathname}${currentSearch}`;
  const [prevRouteKey, setPrevRouteKey] = useState(currentRouteKey);

  const [isNavigating, setIsNavigating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  const pendingHashRef = useRef<string>("");
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hashFrameIdRef = useRef<number | null>(null);
  const hashRetryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confirmationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeConfirmationElRef = useRef<HTMLElement | null>(null);

  // Synchronous route arrival state adjustment during render without accessing refs
  if (currentRouteKey !== prevRouteKey) {
    setPrevRouteKey(currentRouteKey);
    setIsNavigating(false);
    setIsExiting(false);
    if (!hasNavigated) {
      setHasNavigated(true);
    }
  }

  const handleSearchChange = useCallback((newSearch: string) => {
    setCurrentSearch(newSearch);
  }, []);

  const cancelPendingHashScroll = useCallback(() => {
    if (hashFrameIdRef.current !== null) {
      cancelAnimationFrame(hashFrameIdRef.current);
      hashFrameIdRef.current = null;
    }
    if (hashRetryTimerRef.current !== null) {
      clearTimeout(hashRetryTimerRef.current);
      hashRetryTimerRef.current = null;
    }
  }, []);

  const cancelTargetConfirmation = useCallback(() => {
    if (confirmationTimerRef.current !== null) {
      clearTimeout(confirmationTimerRef.current);
      confirmationTimerRef.current = null;
    }
    if (activeConfirmationElRef.current) {
      activeConfirmationElRef.current.classList.remove(
        styles.targetHeadingConfirmation,
        styles.targetCardConfirmation
      );
      activeConfirmationElRef.current = null;
    }
  }, []);

  const triggerTargetConfirmation = useCallback(
    (el: HTMLElement) => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      cancelTargetConfirmation();

      const heading = el.matches("h1, h2, h3, h4, h5, h6")
        ? el
        : (el.querySelector("h1, h2, h3, h4, h5, h6") as HTMLElement | null);

      const targetToAnimate = heading || el;
      const animClass = heading
        ? styles.targetHeadingConfirmation
        : styles.targetCardConfirmation;

      // Single intentional reflow on target arrival to restart keyframe animation
      void targetToAnimate.offsetWidth;
      targetToAnimate.classList.add(animClass);
      activeConfirmationElRef.current = targetToAnimate;

      confirmationTimerRef.current = setTimeout(() => {
        cancelTargetConfirmation();
      }, 480);
    },
    [cancelTargetConfirmation]
  );

  const executeControlledHashScroll = useCallback(
    (targetId: string, expectedPath: string, expectedHash: string): boolean => {
      if (window.location.pathname !== expectedPath) {
        return false;
      }
      const currentCleanHash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      const expectedCleanHash = decodeURIComponent(expectedHash.replace(/^#/, ""));
      if (
        currentCleanHash &&
        currentCleanHash !== expectedCleanHash &&
        currentCleanHash !== targetId
      ) {
        return false;
      }

      const el =
        document.getElementById(targetId) ||
        document.getElementById(`tab-${targetId}`) ||
        document.getElementById(`heading-${targetId}`);
      if (el) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
        triggerTargetConfirmation(el);
        return true;
      }
      return false;
    },
    [triggerTargetConfirmation]
  );

  // Helper to start navigation intent
  const startNavigation = useCallback(
    (hash?: string) => {
      cancelPendingHashScroll();
      pendingHashRef.current = hash || "";
      setIsNavigating(true);
      setIsExiting(true);

      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        setIsNavigating(false);
        setIsExiting(false);
      }, 4000);
    },
    [cancelPendingHashScroll]
  );

  // Listen to global anchor clicks
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element | null)?.closest("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      if (
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("javascript:") ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) {
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const isSamePath = url.pathname === window.location.pathname;
      const isSameSearch = url.search === window.location.search;
      const hasHash = Boolean(url.hash);

      // 1. Same pathname + same search + new hash: Anchor navigation only
      if (isSamePath && isSameSearch && hasHash) {
        e.preventDefault();
        cancelPendingHashScroll();
        const targetId = decodeURIComponent(url.hash.slice(1));
        const targetEl =
          document.getElementById(targetId) ||
          document.getElementById(`tab-${targetId}`) ||
          document.getElementById(`heading-${targetId}`);
        if (targetEl) {
          targetEl.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
          window.history.pushState(null, "", url.hash);
          triggerTargetConfirmation(targetEl);
        }
        return;
      }

      // 2. Same pathname + same search + no hash: Repeated click on exact current URL
      if (isSamePath && isSameSearch && !hasHash) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        return;
      }

      // 3. Different pathname or search with hash: Controlled arrival without native jump
      if ((!isSamePath || !isSameSearch) && hasHash) {
        e.preventDefault();
        setHasNavigated(true);
        startNavigation(url.hash);
        router.push(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
        return;
      }

      // 4. Route transition (different path OR different search query) without hash
      if (!isSamePath || !isSameSearch) {
        setHasNavigated(true);
        startNavigation("");
      }
    };

    const handleCustomNavStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ href?: string }>;
      const targetHash = customEvent.detail?.href?.includes("#")
        ? customEvent.detail.href.slice(customEvent.detail.href.indexOf("#"))
        : "";
      setHasNavigated(true);
      startNavigation(targetHash);
    };

    const handlePopState = () => {
      setHasNavigated(true);
      setIsNavigating(false);
      setIsExiting(false);
      cancelPendingHashScroll();

      if (window.location.hash) {
        const targetId = decodeURIComponent(window.location.hash.slice(1));
        const expectedPath = window.location.pathname;
        const expectedHash = window.location.hash;
        executeControlledHashScroll(targetId, expectedPath, expectedHash);
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    window.addEventListener("navigation-start", handleCustomNavStart);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      window.removeEventListener("navigation-start", handleCustomNavStart);
      window.removeEventListener("popstate", handlePopState);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      cancelPendingHashScroll();
      cancelTargetConfirmation();
    };
  }, [
    router,
    cancelPendingHashScroll,
    cancelTargetConfirmation,
    executeControlledHashScroll,
    startNavigation,
    triggerTargetConfirmation,
  ]);

  // Handle controlled hash arrival positioning upon route resolution
  useEffect(() => {
    cancelPendingHashScroll();

    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }

    const hash = window.location.hash || pendingHashRef.current;
    if (hash) {
      pendingHashRef.current = "";
      const targetId = decodeURIComponent(hash.replace(/^#/, ""));
      const expectedPath = window.location.pathname;
      const expectedHash = window.location.hash || hash;

      hashFrameIdRef.current = requestAnimationFrame(() => {
        hashFrameIdRef.current = null;
        if (!executeControlledHashScroll(targetId, expectedPath, expectedHash)) {
          hashRetryTimerRef.current = setTimeout(() => {
            hashRetryTimerRef.current = null;
            executeControlledHashScroll(targetId, expectedPath, expectedHash);
          }, 120);
        }
      });
    }

    return () => {
      cancelPendingHashScroll();
      cancelTargetConfirmation();
    };
  }, [
    pathname,
    currentSearch,
    cancelPendingHashScroll,
    cancelTargetConfirmation,
    executeControlledHashScroll,
  ]);

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsWatcher onSearchChange={handleSearchChange} />
      </Suspense>
      <RouteProgressBar isNavigating={isNavigating} />
      <div
        className={cn(styles.transitionContainer, isExiting && styles.isExiting)}
        data-navigation-state={isExiting ? "exiting" : "idle"}
      >
        <div
          key={currentRouteKey}
          className={cn(hasNavigated && styles.pageEnter)}
        >
          {children}
        </div>
      </div>
    </>
  );
}
