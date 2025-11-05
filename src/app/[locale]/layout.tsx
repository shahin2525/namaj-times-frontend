// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const locales = ["en", "ar", "ur"];

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen bg-gradient-to-b from-islamic-cream to-white flex flex-col">
        <Header locale={locale} />
        <main className="flex-1 container-responsive py-4">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return {
    title:
      {
        en: "Islamic Prayer Times - Accurate Salah Times",
        ar: "مواقيت الصلاة - أوقات الصلاة الإسلامية",
        ur: "اسلامی نماز کے اوقات - درست نماز کے اوقات",
      }[params.locale] || "Islamic Prayer Times",
    description:
      {
        en: "Get accurate prayer times, forbidden prayer times, and Islamic calendar based on your location.",
        ar: "احصل على أوقات الصلاة الدقيقة، وأوقات الصلاة المحظورة، والتقويم الهجري بناءً على موقعك.",
        ur: "اپنے مقام کے مطابق درست نماز کے اوقات، ممنوعہ اوقات اور اسلامی کیلنڈر حاصل کریں۔",
      }[params.locale] || "Get accurate prayer times based on your location.",
  };
}
