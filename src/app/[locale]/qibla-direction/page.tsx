// "use client";

// import QiblaDirection from "@/components/qibla/QiblaDirection";
// import Head from "next/head";
// import { useTranslations } from "next-intl";

// export default function Page() {
//   const t = useTranslations("Qibla");

//   return (
//     <div>
//       <Head>
//         <title>{t("title")}</title>
//       </Head>

//       <div className="flex justify-center items-center">
//         {" "}
//         <QiblaDirection />
//       </div>
//     </div>
//   );
// }
import QiblaDirection from "@/components/qibla/QiblaDirection";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const t = await getTranslations({ namespace: "Qibla", locale });

  let city = "Worldwide";
  const domain = "https://yourdomain.com";

  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    const data = await res.json();
    city = data.city || "Worldwide";
  } catch {}

  const localizedTitle = t("title", { city }); // Example title key
  const localizedDesc = t("description", { city });

  const pageUrl = `${domain}/${locale}/qibla?city=${city.toLowerCase()}`;

  return {
    title: localizedTitle,
    description: localizedDesc,

    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${domain}/en/qibla`,
        bn: `${domain}/bn/qibla`,
        hi: `${domain}/hi/qibla`,
      },
    },

    openGraph: {
      title: localizedTitle,
      description: localizedDesc,
      url: pageUrl,
      type: "website",
      locale: locale === "en" ? "en_US" : locale,
      alternateLocale: ["en", "bn", "hi"],
      siteName: "Your Website",
      images: [
        {
          url: `${domain}/images/qibla-banner.png`,
          alt: localizedTitle,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: localizedTitle,
      description: localizedDesc,
      images: [`${domain}/images/qibla-banner.png`],
    },
  };
}

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <QiblaDirection />
    </div>
  );
}
