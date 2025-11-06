// i18n.ts - Create this at ROOT level
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Define supported locales
const locales = ["en", "bn"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
