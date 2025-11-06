// // src/components/prayer/HijriDate.tsx
// "use client";

// import { useTranslations } from "next-intl";
// import { useEffect, useState } from "react";

// export default function HijriDate() {
//   const t = useTranslations("HijriDate");
//   const [hijriDate, setHijriDate] = useState<string>("");
//   const [gregorianDate, setGregorianDate] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const updateDates = () => {
//       const now = new Date();

//       // Format Gregorian date
//       const gregorianOptions: Intl.DateTimeFormatOptions = {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       };
//       setGregorianDate(now.toLocaleDateString(undefined, gregorianOptions));

//       // Calculate accurate Hijri date using hijri-date library
//       try {
//         const HijriDate = require('hijri-date');
//         const hijri = new HijriDate(now);

//         // Format the Hijri date nicely
//         const hijriDay = hijri.getDate();
//         const hijriMonth = hijri.getMonthName();
//         const hijriYear = hijri.getFullYear();

//         setHijriDate(`${hijriDay} ${hijriMonth} ${hijriYear} AH`);
//       } catch (error) {
//         console.error("Error calculating Hijri date:", error);
//         // Fallback to simple calculation
//         setHijriDate(calculateHijriDate(now));
//       }

//       setIsLoading(false);
//     };

//     updateDates();

//     // Update dates every minute to handle day changes
//     const interval = setInterval(updateDates, 60000);

//     return () => clearInterval(interval);
//   }, []);

//   const calculateHijriDate = (date: Date): string => {
//     // Simple fallback calculation
//     const gregorianYear = date.getFullYear();
//     const hijriYear = Math.floor((gregorianYear - 622) * (33 / 32));

//     const months = [
//       "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
//       "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
//       "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
//     ];

//     const monthIndex = date.getMonth();
//     const day = date.getDate();

//     return `${day} ${months[monthIndex]} ${hijriYear} AH`;
//   };

//   if (isLoading) {
//     return (
//       <section className="text-center py-6 bg-white rounded-lg shadow-md">
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="text-center py-6 bg-white rounded-lg shadow-md">
//       <div className="space-y-2">
//         <h2 className="text-2xl font-semibold text-islamic-green">
//           {t("currentDate")}
//         </h2>
//         <div className="space-y-1">
//           <p className="text-lg font-medium text-gray-800">
//             {hijriDate}
//           </p>
//           <p className="text-sm text-gray-600">
//             {gregorianDate}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
// src/components/prayer/HijriDate.tsx - Enhanced with useCallback
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import { useLocale } from "next-intl";

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
  const [gregorianDate, setGregorianDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Bangla Hijri month names
  const banglaMonths = [
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

  // Arabic Hijri month names
  const arabicMonths = [
    "محرم",
    "صفر",
    "ربيع الأول",
    "ربيع الثاني",
    "جمادى الأولى",
    "جمادى الآخرة",
    "رجب",
    "شعبان",
    "رمضان",
    "شوال",
    "ذو القعدة",
    "ذو الحجة",
  ];

  // English Hijri month names
  const englishMonths = [
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
    (monthNumber: number, language: string): string => {
      switch (language) {
        case "bn":
          return (
            banglaMonths[monthNumber - 1] || englishMonths[monthNumber - 1]
          );
        case "ar":
          return (
            arabicMonths[monthNumber - 1] || englishMonths[monthNumber - 1]
          );
        default:
          return englishMonths[monthNumber - 1];
      }
    },
    []
  );

  // Move getFallbackHijriDate function before useEffect and use useCallback
  const getFallbackHijriDate = useCallback(
    (date: Date): HijriDateInfo => {
      const gregorianYear = date.getFullYear();
      const hijriYear = Math.floor((gregorianYear - 622) * (33 / 32));

      return {
        day: date.getDate(),
        month: getMonthName(date.getMonth() + 1, locale),
        year: hijriYear,
        monthNumber: date.getMonth() + 1,
      };
    },
    [locale, getMonthName]
  );

  // Import hijri-date dynamically to avoid require() issues
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadHijriDate = useCallback(async (): Promise<any> => {
    try {
      // Use dynamic import instead of require()
      const hijriDateModule = await import("hijri-date");
      return hijriDateModule.default || hijriDateModule;
    } catch (error) {
      console.error("Failed to load hijri-date module:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const updateDates = async () => {
      const now = new Date();

      // Format Gregorian date based on locale
      const gregorianOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setGregorianDate(now.toLocaleDateString(locale, gregorianOptions));

      // Calculate accurate Hijri date
      try {
        const HijriDate = await loadHijriDate();

        if (HijriDate) {
          const hijri = new HijriDate(now);

          const hijriInfo: HijriDateInfo = {
            day: hijri.getDate(),
            month: getMonthName(hijri.getMonth(), locale),
            year: hijri.getFullYear(),
            monthNumber: hijri.getMonth(),
          };

          setHijriDate(hijriInfo);
        } else {
          // If library failed to load, use fallback
          throw new Error("Library not available");
        }
      } catch (error) {
        console.error("Error calculating Hijri date:", error);
        setHijriDate(getFallbackHijriDate(now));
      }

      setIsLoading(false);
    };

    updateDates();
    const interval = setInterval(updateDates, 60000);

    return () => clearInterval(interval);
  }, [locale, getFallbackHijriDate, getMonthName, loadHijriDate]);

  if (isLoading || !hijriDate) {
    return (
      <section className="text-center py-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-center py-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-islamic-green">
          {t("currentDate")}
        </h2>
        <div className="space-y-1">
          <p
            className="text-lg font-medium text-gray-800"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {hijriDate.day} {hijriDate.month} {hijriDate.year} {t("hijriYear")}
          </p>
          <p
            className="text-sm text-gray-600"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {gregorianDate}
          </p>
        </div>
      </div>
    </section>
  );
}
