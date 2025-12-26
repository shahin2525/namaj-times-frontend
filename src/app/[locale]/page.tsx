// // src/app/[locale]/page.tsx

// import { useTranslations } from "next-intl";
// import { Metadata } from "next";
// import StructuredData from "@/components/seo/StructuredData";
// import PrayerTimes from "@/components/prayer/PrayerTimes";
// import HijriDate from "@/components/prayer/HijriDate";

// import AdSense from "@/components/ui/AdSense";
// import HomeForbiddenTimeSection from "@/components/forbidden/HomeForbiddenTimeSection";

// // Generate metadata
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }): Promise<Metadata> {
//   const { locale } = await params;

//   const metadata = {
//     en: {
//       title: "Islamic Prayer Times - Accurate Salah Times",
//       description:
//         "Get accurate namaz times, forbidden namaz times, and Islamic calendar based on your location.",
//       keywords:
//         "prayer times, salah times, islamic prayer, forbidden times, hijri date, muslim prayer",
//       openGraph: {
//         title: "Islamic Prayer Times - Accurate Salah Times",
//         description:
//           "Get accurate prayer times, forbidden prayer times, and Islamic calendar based on your location.",
//         type: "website",
//         images: ["/images/og-image.jpg"],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: "Islamic Prayer Times - Accurate Salah Times",
//         description:
//           "Get accurate prayer times, forbidden prayer times, and Islamic calendar based on your location.",
//         images: ["/images/twitter-image.jpg"],
//       },
//     },
//     bn: {
//       title: "ইসলামিক নামাজের সময়সূচী - সঠিক সালাতের সময়",
//       description:
//         "আপনার অবস্থান অনুযায়ী সঠিক নামাজের সময়, নিষিদ্ধ সময় এবং ইসলামিক ক্যালেন্ডার পান।",
//       keywords:
//         "নামাজের সময়, সালাতের সময়, ইসলামিক প্রার্থনা, নিষিদ্ধ সময়, হিজরি তারিখ, মুসলিম প্রার্থনা",
//       openGraph: {
//         title: "ইসলামিক নামাজের সময়সূচী - সঠিক সালাতের সময়",
//         description:
//           "আপনার অবস্থান অনুযায়ী সঠিক নামাজের সময়, নিষিদ্ধ সময় এবং ইসলামিক ক্যালেন্ডার পান।",
//         type: "website",
//         images: ["/images/og-image-bn.jpg"],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: "ইসলামিক নামাজের সময়সূচী - সঠিক সালাতের সময়",
//         description:
//           "আপনার অবস্থান অনুযায়ী সঠিক নামাজের সময়, নিষিদ্ধ সময় এবং ইসলামিক ক্যালেন্ডার পান।",
//         images: ["/images/twitter-image-bn.jpg"],
//       },
//     },
//   };

//   const langMetadata = metadata[locale as keyof typeof metadata] || metadata.en;

//   return {
//     title: langMetadata.title,
//     description: langMetadata.description,
//     keywords: langMetadata.keywords,
//     openGraph: {
//       ...langMetadata.openGraph,
//       locale: locale,
//     },
//     twitter: langMetadata.twitter,
//     alternates: {
//       canonical: `https://yourdomain.com/${locale}`,
//       languages: {
//         en: "https://yourdomain.com/en",
//         bn: "https://yourdomain.com/bn",
//       },
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//   };
// }

// export default function HomePage() {
//   const t = useTranslations("Home");

//   return (
//     <>
//       <StructuredData />
//       <div className="space-y-8">
//         {/* Hero Section */}
//         <section className="py-8">
//           <div className="flex flex-col items-center text-center">
//             <h1 className="text-2xl md:text-5xl font-bold text-islamic-green mb-4">
//               {t("title")}
//             </h1>
//             <p className="text-xl text-gray-600 max-w-2xl">{t("subtitle")}</p>
//           </div>
//         </section>

//         {/* AdSense Top */}
//         <AdSense slot="top-banner" />

//         {/* Current Date */}
//         <HijriDate />

//         {/* Main Prayer Times */}
//         <div className="flex justify-center items-center my-5 py-5">
//           <PrayerTimes />
//         </div>

//         {/* AdSense Middle */}
//         <AdSense slot="middle-banner" />

//         {/* Forbidden Times */}
//         <div className="flex justify-center">
//           <HomeForbiddenTimeSection />
//         </div>

//         {/* AdSense Bottom */}
//         <AdSense slot="bottom-banner" />
//       </div>
//     </>
//   );
// }
// src/app/[locale]/page.tsx

import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import PrayerTimes from "@/components/prayer/PrayerTimes";
import HijriDate from "@/components/prayer/HijriDate";
import AdSense from "@/components/ui/AdSense";
import HomeForbiddenTimeSection from "@/components/forbidden/HomeForbiddenTimeSection";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "HomeMeta",
  });

  const title = t("homeTitle");
  const description = t("homeDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <>
      <StructuredData />

      <div className="space-y-8">
        {/* Hero Section */}
        <section className="py-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-islamic-green mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">{t("subtitle")}</p>
          </div>
        </section>

        <AdSense slot="top-banner" />

        <HijriDate />

        <div className="flex justify-center items-center my-5 py-5">
          <PrayerTimes />
        </div>

        <AdSense slot="middle-banner" />

        <div className="flex justify-center">
          <HomeForbiddenTimeSection />
        </div>

        <AdSense slot="bottom-banner" />
      </div>
    </>
  );
}
