// "use client";

// import { useTranslations, useLocale } from "next-intl";
// import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
// import { getForbiddenTimes } from "@/lib/getForbiddenTimes";
// import ForbiddenTimeList from "@/components/forbidden/ForbiddenTimeList";
// import { useLocation } from "@/hooks/useLocation";
// // import { useEffect } from "react";

// export default function HomeForbiddenTimeSection() {
//   const t = useTranslations("Forbidden2");
//   const locale = useLocale();
//   const { location, isLoading } = useLocation();

//   if (isLoading) {
//     return <p className="text-center text-gray-500">Detecting location…</p>;
//   }

//   if (!location) {
//     return <p className="text-center text-red-500">Failed to load location</p>;
//   }

//   const coords = new Coordinates(location.latitude, location.longitude);
//   const params = CalculationMethod.MuslimWorldLeague();
//   const today = new Date();
//   const prayerTimes = new PrayerTimes(coords, today, params);
//   const times = getForbiddenTimes(prayerTimes);

//   const forbiddenTimes = [
//     {
//       title: t("forbidden.sunrise.title"),
//       description: t("forbidden.sunrise.desc"),
//       timeRange: `${times.sunrise} - ${times.sunriseEnd}`,
//     },
//     {
//       title: t("forbidden.zawal.title"),
//       description: t("forbidden.zawal.desc"),
//       timeRange: `${times.zawalStart} - ${times.zawalEnd}`,
//     },
//     {
//       title: t("forbidden.sunset.title"),
//       description: t("forbidden.sunset.desc"),
//       timeRange: `${times.sunsetStart} - ${times.sunsetEnd}`,
//     },
//   ];

//   return (
//     <div className="w-full max-w-xl mx-auto">
//       <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
//         {locale === "bn"
//           ? location.city
//             ? `নিষিদ্ধ নামাজের সময় - ${location.city}`
//             : "নিষিদ্ধ নামাজের সময়"
//           : location.city
//           ? `Forbidden Prayer Times in ${location.city}`
//           : "Forbidden Prayer Times"}
//       </h1>

//       <ForbiddenTimeList list={forbiddenTimes} />
//     </div>
//   );
// }
"use client";

import { useTranslations } from "next-intl";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { getForbiddenTimes } from "@/lib/getForbiddenTimes";
import ForbiddenTimeList from "@/components/forbidden/ForbiddenTimeList";
import { useLocation } from "@/hooks/useLocation";

export default function HomeForbiddenTimeSection() {
  const t = useTranslations("Forbidden2");
  const tCommon = useTranslations("Common"); // optional, if you want to reuse common texts
  const { location, isLoading } = useLocation();

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">
        {tCommon("loading") || "Detecting location…"}
      </p>
    );
  }

  if (!location) {
    return <p className="text-center text-red-500">Failed to load location</p>;
  }

  const coords = new Coordinates(location.latitude, location.longitude);
  const params = CalculationMethod.MuslimWorldLeague();
  const today = new Date();
  const prayerTimes = new PrayerTimes(coords, today, params);
  const times = getForbiddenTimes(prayerTimes);

  const forbiddenTimes = [
    {
      title: t("forbidden.sunrise.title"),
      description: t("forbidden.sunrise.desc"),
      timeRange: `${times.sunrise} - ${times.sunriseEnd}`,
    },
    {
      title: t("forbidden.zawal.title"),
      description: t("forbidden.zawal.desc"),
      timeRange: `${times.zawalStart} - ${times.zawalEnd}`,
    },
    {
      title: t("forbidden.sunset.title"),
      description: t("forbidden.sunset.desc"),
      timeRange: `${times.sunsetStart} - ${times.sunsetEnd}`,
    },
  ];

  // Dynamic title using translations (supports en, bn, ar, ur, etc.)
  const pageTitle = location.city
    ? t("titleWithCity", { city: location.city })
    : t("title");

  return (
    <div className="w-full max-w-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
        {pageTitle}
      </h1>
      <ForbiddenTimeList list={forbiddenTimes} />
    </div>
  );
}
