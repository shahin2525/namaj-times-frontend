// import type { Metadata } from "next";
// import WeeklyPrayerTimes from "@/components/weekly-prayer/WeeklyPrayerTimes";

// export const metadata: Metadata = {
//   title: "Weekly Namaj Times | Accurate Salah Schedule",
//   description:
//     "View accurate weekly prayer times including Fajr, Dhuhr, Asr, Maghrib, and Isha based on your location.",
//   keywords: [
//     "weekly namaj times",
//     "weekly salah times",
//     "islamic prayer schedule",
//     "namaz time this week",
//     "salah timetable",
//   ],
//   openGraph: {
//     title: "Weekly Prayer Times",
//     description: "Accurate weekly Islamic prayer times based on your location.",
//     type: "website",
//   },
// };

// const PrayerTimesPage = () => {
//   return (
//     <div className="flex justify-center items-center w-full">
//       <WeeklyPrayerTimes />
//     </div>
//   );
// };

// export default PrayerTimesPage;
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import WeeklyPrayerTimes from "@/components/weekly-prayer/WeeklyPrayerTimes";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "WeeklyMeta",
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

const PrayerTimesPage = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <WeeklyPrayerTimes />
    </div>
  );
};

export default PrayerTimesPage;
