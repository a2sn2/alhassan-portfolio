export type SupportedLocale = "en" | "ar" | "de";

/**
 * Idempotently localizes an internal route href for the given locale.
 *
 * Rules:
 * - English routes remain unprefixed (/capabilities, /about, etc.)
 * - Arabic routes contain exactly one /ar prefix (/ar/capabilities, etc.)
 * - German routes contain exactly one /de prefix (/de/capabilities, etc.)
 * - Already-prefixed routes are never duplicated (/ar/capabilities -> /ar/capabilities)
 * - Query strings and hashes are preserved (/capabilities?q=1#hash -> /ar/capabilities?q=1#hash)
 * - External URLs (http/https), mailto:, tel:, and pure hashes (#...) are preserved as-is.
 */
export function getLocalizedHref(
  path?: string,
  locale: SupportedLocale = "en"
): string {
  if (!path) return "";

  // Preserve external URLs, protocols, and anchor-only links
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("//") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const match = path.match(/^([^?#]*)(.*)$/);
  const rawPathname = match ? match[1] : path;
  const suffix = match ? match[2] : "";

  if (!rawPathname) {
    return path;
  }

  // Normalize leading slash
  let cleanPath = rawPathname.startsWith("/") ? rawPathname : `/${rawPathname}`;

  // Strip existing locale prefixes idempotently
  while (
    cleanPath === "/ar" ||
    cleanPath === "/de" ||
    cleanPath.startsWith("/ar/") ||
    cleanPath.startsWith("/de/")
  ) {
    if (cleanPath === "/ar" || cleanPath === "/de") {
      cleanPath = "/";
      break;
    }
    cleanPath = cleanPath.slice(3);
  }

  let targetPath = cleanPath;
  if (locale === "ar") {
    targetPath = cleanPath === "/" ? "/ar" : `/ar${cleanPath}`;
  } else if (locale === "de") {
    targetPath = cleanPath === "/" ? "/de" : `/de${cleanPath}`;
  }

  return `${targetPath}${suffix}`;
}
