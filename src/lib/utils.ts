// utils/locale.ts
export function validateLocale(locale: string): "en" | "bn" {
  return locale === "bn" ? "bn" : "en";
}
