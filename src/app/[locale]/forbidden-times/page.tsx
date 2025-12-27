// // app/[locale]/forbidden-time/page.tsx
// import type { Metadata } from "next";
// import ForbiddenTimeSection from "@/components/forbidden/ForbiddenTimeSection";

// export const dynamic = "force-dynamic"; // location-based SEO

// export async function generateMetadata({
//   params,
//   searchParams,
// }: {
//   params: { locale: string };
//   searchParams: { city?: string };
// }): Promise<Metadata> {
//   const locale = params.locale;
//   const city = searchParams.city;

//   // Default fallback
//   let title = "Forbidden prayer (Namaz) Times | Sunrise, Zawal & Sunset";
//   let description =
//     "Today's forbidden namaz times including sunrise, zawal, and sunset.";

//   if (city) {
//     if (locale === "bn") {
//       title = `আজকের নিষিদ্ধ নামাজের সময় - ${city}`;
//       description = `${city} এর জন্য আজকের নিষিদ্ধ নামাজের সময় — সূর্যোদয়, জওয়াল ও সূর্যাস্ত।`;
//     } else {
//       title = `Forbidden Namaz Times in ${city} Today`;
//       description = `Today's forbidden namaz times in ${city}, including sunrise, zawal and sunset.`;
//     }
//   }

//   return {
//     title,
//     description,
//     alternates: {
//       canonical: "/forbidden-time",
//     },
//     openGraph: {
//       title,
//       description,
//       type: "article",
//       siteName: "Islamic Prayer Times",
//     },
//   };
// }

// export default function ForbiddenTimePage() {
//   return (
//     <>
//       {/* Google AdSense */}
//       <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-6 border border-dashed px-10">
//         Google AdSense block
//       </div>
//       <p className="h-10" />
//       <div className="flex justify-center items-center">
//         <ForbiddenTimeSection />
//       </div>
//     </>
//   );
// }
// app/[locale]/forbidden-time/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ForbiddenTimeSection from "@/components/forbidden/ForbiddenTimeSection";

export const dynamic = "force-dynamic"; // location-based SEO

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { city?: string };
}): Promise<Metadata> {
  const t = await getTranslations("ForbiddenTimeMeta");
  const city = searchParams.city;

  let title = t("title");
  let description = t("description");

  if (city) {
    title = t("titleWithCity", { city });
    description = t("descriptionWithCity", { city });
  }

  return {
    title,
    description,
    alternates: {
      canonical: "/forbidden-time",
    },
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "Islamic Prayer Times",
    },
  };
}

export default function ForbiddenTimePage() {
  return (
    <>
      {/* Google AdSense */}
      <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-6 border border-dashed px-10">
        Google AdSense block
      </div>
      <p className="h-10" />
      <div className="flex justify-center items-center">
        <ForbiddenTimeSection />
      </div>
    </>
  );
}
