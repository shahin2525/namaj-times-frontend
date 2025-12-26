// //src\app\[locale]\layout.tsx

// import { NextIntlClientProvider } from "next-intl";
// import { getMessages } from "next-intl/server";
// import { notFound } from "next/navigation";
// import { routing } from "@/i18n/routing";
// import Header from "@/components/ui/Header";
// import Footer from "@/components/ui/Footer";

// interface LocaleLayoutProps {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }

// export default async function LocaleLayout({
//   children,
//   params,
// }: LocaleLayoutProps) {
//   // Await the params promise
//   const { locale } = await params;

//   // Ensure that the incoming `locale` is valid
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   if (!routing.locales.includes(locale as any)) {
//     notFound();
//   }

//   const messages = await getMessages();

//   return (
//     <NextIntlClientProvider messages={messages}>
//       {/* <div className="min-h-screen bg-gradient-to-b from-islamic-cream to-white flex flex-col"> */}
//       <Header locale={locale} />
//       <div className="h-7"></div> {/* This adds fixed 32px space */}
//       <main className="min-h-screen">{children}</main>
//       <Footer />
//       {/* </div> */}
//     </NextIntlClientProvider>
//   );
// }

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }) {
//   // Await the params promise here as well
//   const { locale } = await params;

//   const metadata = {
//     en: {
//       title: "Islamic Prayer Times - Accurate Salah Times ",
//       description:
//         "Get accurate prayer times, forbidden prayer times, and Islamic calendar based on your location.",
//     },
//     bn: {
//       title: "ইসলামিক নামাজের সময়সূচী - সঠিক সালাতের সময়",
//       description:
//         "আপনার অবস্থান অনুযায়ী সঠিক নামাজের সময়, নিষিদ্ধ সময় এবং ইসলামিক ক্যালেন্ডার পান।",
//     },
//   };

//   return {
//     title:
//       metadata[locale as keyof typeof metadata]?.title || metadata.en.title,
//     description:
//       metadata[locale as keyof typeof metadata]?.description ||
//       metadata.en.description,
//   };
// }
// src/app/[locale]/layout.tsx

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header locale={locale} />
      <div className="h-7" />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "LocaleLayoutMeta",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}
