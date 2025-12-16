// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "bn", "hi", "ar", "ur", "id", "ms", "tr"] as const,

  // Used when no locale matches
  defaultLocale: "en",
});
