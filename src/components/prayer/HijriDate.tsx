// // // src/components/prayer/HijriDate.tsx - Enhanced with useCallback

// "use client";

// import { useTranslations } from "next-intl";
// import { useEffect, useState, useCallback } from "react";
// import { useLocale } from "next-intl";
// import uq from "@umalqura/core";

// interface HijriDateInfo {
//   day: number;
//   month: string;
//   year: number;
//   monthNumber: number;
// }

// export default function HijriDate() {
//   const t = useTranslations("HijriDate");
//   const locale = useLocale();

//   const [hijriDate, setHijriDate] = useState<HijriDateInfo | null>(null);
//   const [gregorianDate, setGregorianDate] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Month names
//   const monthsBN = [
//     "মুহাররম",
//     "সফর",
//     "রবিউল আউয়াল",
//     "রবিউস সানি",
//     "জমাদিউল আউয়াল",
//     "জমাদিউস সানি",
//     "রজব",
//     "শাবান",
//     "রমজান",
//     "শাওয়াল",
//     "জিলকদ",
//     "জিলহজ",
//   ];

//   const monthsEN = [
//     "Muharram",
//     "Safar",
//     "Rabi' al-Awwal",
//     "Rabi' al-Thani",
//     "Jumada al-Awwal",
//     "Jumada al-Thani",
//     "Rajab",
//     "Sha'ban",
//     "Ramadan",
//     "Shawwal",
//     "Dhu al-Qi'dah",
//     "Dhu al-Hijjah",
//   ];

//   const getMonthName = useCallback(
//     (monthNumber: number) => {
//       return (locale === "bn" ? monthsBN : monthsEN)[monthNumber - 1];
//     },
//     [locale]
//   );

//   // Fallback calculation
//   const fallbackHijri = useCallback(() => {
//     const now = new Date();
//     const gY = now.getFullYear();
//     const gM = now.getMonth() + 1;
//     const gD = now.getDate();

//     const hY = Math.floor((gY - 622) * (33 / 32));
//     const hM = ((gM + 9) % 12) + 1;

//     return {
//       day: gD,
//       month: getMonthName(hM),
//       year: hY,
//       monthNumber: hM,
//     };
//   }, [getMonthName]);

//   // Main Hijri loader
//   const loadHijriDate = useCallback(() => {
//     try {
//       const today = new Date();

//       // <- THIS IS THE CORRECT API
//       const h = uq(today);

//       const month = h.hm + 1; // hm = 0–11

//       return {
//         day: h.hd,
//         month: getMonthName(month),
//         year: h.hy,
//         monthNumber: month,
//       };
//     } catch (error) {
//       console.error("Umm al-Qura error:", error);
//       return fallbackHijri();
//     }
//   }, [getMonthName, fallbackHijri]);

//   // Load Gregorian + Hijri
//   useEffect(() => {
//     const update = () => {
//       const now = new Date();

//       setGregorianDate(
//         now.toLocaleDateString(locale, {
//           weekday: "long",
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })
//       );

//       const h = loadHijriDate();
//       setHijriDate(h);
//       setLoading(false);
//     };

//     update();
//     const timer = setInterval(update, 60000); // refresh every minute
//     return () => clearInterval(timer);
//   }, [locale, loadHijriDate]);

//   if (loading || !hijriDate) {
//     return (
//       <section className="text-center py-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-2"></div>
//           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="text-center py-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
//       <div className="space-y-2">
//         <h2 className="text-2xl font-semibold text-islamic-green dark:text-green-400">
//           {t("currentDate")}
//         </h2>

//         <div className="space-y-1">
//           <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
//             {hijriDate.day} {hijriDate.month} {hijriDate.year} {t("hijriYear")}
//           </p>

//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             {gregorianDate}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
// src/components/prayer/HijriDate.tsx - Fixed version

"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { toHijri } from "hijri-converter";
interface HijriDateInfo {
  day: number;
  month: string;
  year: number;
  monthNumber: number;
}

export default function HijriDate() {
  const t = useTranslations("HijriDate");
  const locale = useLocale();

  const [hijriDate, setHijriDate] = useState<HijriDateInfo | null>(null);
  const [gregorianDate, setGregorianDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Month names
  const monthsBN = [
    "মুহাররম",
    "সফর",
    "রবিউল আউয়াল",
    "রবিউস সানি",
    "জমাদিউল আউয়াল",
    "জমাদিউস সানি",
    "রজব",
    "শাবান",
    "রমজান",
    "শাওয়াল",
    "জিলকদ",
    "জিলহজ",
  ];

  const monthsEN = [
    "Muharram",
    "Safar",
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ];

  const getMonthName = useCallback(
    (monthNumber: number) => {
      // Ensure monthNumber is within bounds (1-12)
      const index = Math.max(0, Math.min(monthNumber - 1, 11));
      return (locale === "bn" ? monthsBN : monthsEN)[index];
    },
    [locale]
  );

  // More accurate fallback calculation
  const fallbackHijri = useCallback(() => {
    const now = new Date();
    const gY = now.getFullYear();
    const gM = now.getMonth() + 1;
    const gD = now.getDate();

    // Simple conversion (approximate)
    const adjustment = Math.floor((gY - 622) * 0.97);
    const hY = 1447 + adjustment; // Starting from known base year

    // This is a simplified calculation - you might need a more robust algorithm
    const daysSinceEpoch = Math.floor(
      (now.getTime() - new Date(2023, 6, 19).getTime()) / (1000 * 60 * 60 * 24)
    );
    const hijriDays = Math.floor(daysSinceEpoch * 0.97);

    let remainingDays = hijriDays;
    let year = 1444;
    let month = 1;
    let day = 1;

    const hijriMonthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];

    while (remainingDays >= 0) {
      const monthDays = hijriMonthLengths[(month - 1) % 12];
      if (remainingDays < monthDays) {
        day += remainingDays;
        break;
      }
      remainingDays -= monthDays;
      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }

    return {
      day: day,
      month: getMonthName(month),
      year: year,
      monthNumber: month,
    };
  }, [getMonthName]);

  // Alternative: Use a reliable API for Hijri dates
  const loadHijriDate = useCallback(() => {
    try {
      const today = new Date();
      const hijri = toHijri(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );

      return {
        day: hijri.hd,
        month: getMonthName(hijri.hm),
        year: hijri.hy,
        monthNumber: hijri.hm,
      };
    } catch (error) {
      return fallbackHijri();
    }
  }, [getMonthName, fallbackHijri]);

  // Load Gregorian + Hijri
  useEffect(() => {
    const update = async () => {
      const now = new Date();

      setGregorianDate(
        now.toLocaleDateString(locale, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );

      const h = loadHijriDate();
      setHijriDate(h);
      setLoading(false);
    };

    update();
    const timer = setInterval(update, 60000); // refresh every minute
    return () => clearInterval(timer);
  }, [locale, loadHijriDate]);

  if (loading || !hijriDate) {
    return (
      <section className="text-center py-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    // <section className="text-center py-10 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    //   <div className="space-y-2">
    //     <h2 className="text-2xl font-semibold text-islamic-green dark:text-green-400">
    //       {t("currentDate")}
    //     </h2>

    //     <div className="space-y-1">
    //       <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
    //         {hijriDate.day} {hijriDate.month} {hijriDate.year} {t("hijriYear")}
    //       </p>

    //       <p className="text-sm text-gray-600 dark:text-gray-400">
    //         {gregorianDate}
    //       </p>
    //     </div>
    //   </div>
    // </section>
    <section className="text-center py-10 bg-white dark:bg-gray-900 rounded-lg shadow-md mb-10 min-h-[110px] flex flex-col justify-center">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-islamic-green dark:text-green-400">
          {t("currentDate")}
        </h2>

        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
            {hijriDate.day} {hijriDate.month} {hijriDate.year} {t("hijriYear")}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 pt-4">
            {gregorianDate}
          </p>
        </div>
      </div>
    </section>
  );
}
