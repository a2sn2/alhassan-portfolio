"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function DocumentLocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
    if (isArabic) {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    }
  }, [pathname]);

  return null;
}
