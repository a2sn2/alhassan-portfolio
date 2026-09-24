"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function DocumentLocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
    const isGerman = pathname === "/de" || pathname.startsWith("/de/");

    if (isArabic) {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    } else if (isGerman) {
      document.documentElement.lang = "de";
      document.documentElement.dir = "ltr";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    }
  }, [pathname]);

  return null;
}
