// import { getForbiddenTimes } from "@/lib/getForbiddenTimes";
// import ForbiddenTimeList from "@/components/forbidden/ForbiddenTimeList";
// import { PrayerTimes, Coordinates, CalculationMethod } from "adhan";
// import { useTranslations } from "next-intl";

// export default function ForbiddenTimePage() {
//   const t = useTranslations("Forbidden");

//   // Example location: Dhaka
//   const coordinates = new Coordinates(23.8103, 90.4125);
//   const params = CalculationMethod.MuslimWorldLeague();
//   const today = new Date();

//   const prayerTimes = new PrayerTimes(coordinates, today, params);

//   // 🔥 Dynamic forbidden times (formatted)
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
//     <main className="px-4 py-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6">{t("title")}</h1>

//       <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-6 border border-dashed">
//         Google AdSense
//       </div>

//       <ForbiddenTimeList list={forbiddenTimes} />
//     </main>
//   );
// }
"use client";

import { useTranslations } from "next-intl";
import useLocation2 from "@/hooks/useLocation2";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { getForbiddenTimes } from "@/lib/getForbiddenTimes";
import ForbiddenTimeList from "@/components/forbidden/ForbiddenTimeList";

export default function ForbiddenTimePage() {
  const t = useTranslations("Forbidden2");
  const location = useLocation2();

  if (!location) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        Detecting your location...
      </p>
    );
  }

  if (location.error) {
    return (
      <div className="text-center text-red-500 font-medium">
        {location.error}. Please enable location to see correct forbidden times.
      </div>
    );
  }

  // Adhan setup with device coordinates
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

  return (
    <main className="px-4 py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">{t("title")}</h1>

      <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-6 border border-dashed">
        Google AdSense
      </div>

      <ForbiddenTimeList list={forbiddenTimes} />
    </main>
  );
}
