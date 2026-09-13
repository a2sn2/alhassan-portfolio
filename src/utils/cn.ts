/**
 * Utility to conditionally combine CSS class names.
 * Lightweight, zero-dependency alternative to clsx.
 */
export function cn(...inputs: (string | boolean | null | undefined)[]): string {
  return inputs.filter(Boolean).join(" ");
}
