"use client";

import { useEffect } from "react";

export function ArabicDocumentSync() {
  useEffect(() => {
    const prevLang = document.documentElement.getAttribute("lang");
    const prevDir = document.documentElement.getAttribute("dir");

    document.documentElement.setAttribute("lang", "ar");
    document.documentElement.setAttribute("dir", "rtl");

    return () => {
      document.documentElement.setAttribute("lang", prevLang || "en");
      document.documentElement.setAttribute("dir", prevDir || "ltr");
    };
  }, []);

  return null;
}
