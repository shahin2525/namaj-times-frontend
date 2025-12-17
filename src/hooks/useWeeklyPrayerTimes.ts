// // hooks/useWeeklyPrayerTimes.ts
// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { Location } from "@/hooks/useLocation";
// import {
//   PrayerTimes as AdhanPrayerTimes,
//   Coordinates,
//   CalculationMethod,
//   Madhab,
//   CalculationParameters,
//   SunnahTimes,
// } from "adhan";
// import { PrayerTime, FastingTimes } from "./usePrayerTimes";

// export interface DailyPrayerInfo {
//   date: Date;
//   englishDate: string;
//   hijriDate: string;
//   dayName: string;
//   prayerTimes: PrayerTime[];
//   fastingTimes: FastingTimes | null;
// }

// export type CalculationMethodType =
//   | "BD-DS"
//   | "BD-UA"
//   | "MWL"
//   | "ISNA"
//   | "Karachi";

// interface UseWeeklyPrayerTimesProps {
//   location: Location | null;
//   locale: "en" | "bn" | "hi";
//   method?: CalculationMethodType;
//   asrMethod?: "Standard" | "Hanafi";
//   adjustment?: { [key: string]: number };
//   days?: number;
// }

// // Helper functions for date formatting
// const formatEnglishDate = (date: Date, localeTag: string) => {
//   return date.toLocaleDateString(localeTag, {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };

// const getHijriDate = (date: Date): string => {
//   const hijriMonths = [
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

//   // Approximate conversion (simplified)
//   const day = date.getDate();
//   const monthIndex = date.getMonth();
//   const year = date.getFullYear() - 579;

//   return `${day} ${hijriMonths[monthIndex]} ${year} AH`;
// };

// const getDayName = (date: Date, localeTag: string) => {
//   return date.toLocaleDateString(localeTag, { weekday: "long" });
// };

// // Function to calculate prayer times for a specific day
// const calculateDailyPrayerTimes = (
//   date: Date,
//   location: Location,
//   calcParams: CalculationParameters,
//   locale: "en" | "bn" | "hi",
//   isToday: boolean = false
// ) => {
//   const localeTag = locale === "bn" ? "bn-BD" : "en-US";
//   const formatTime = (date: Date) =>
//     date.toLocaleTimeString(localeTag, {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });

//   try {
//     const coords = new Coordinates(location.latitude, location.longitude);
//     const adhan = new AdhanPrayerTimes(coords, date, calcParams);
//     const sunnah = new SunnahTimes(adhan);

//     const now = Date.now();
//     const sunset = new Date(adhan.maghrib.getTime() - 1 * 60000);
//     const ishraq = new Date(adhan.sunrise.getTime() + 20 * 60000);
//     const duha = new Date(
//       (adhan.sunrise.getTime() + adhan.dhuhr.getTime()) / 2
//     );

//     const list = [
//       {
//         key: "tahajjud",
//         name: "Tahajjud",
//         nameBn: "তাহাজ্জুদ",
//         start: sunnah.lastThirdOfTheNight,
//         rule: "NEXT",
//       },
//       {
//         key: "fajr",
//         name: "Fajr",
//         nameBn: "ফজর",
//         start: adhan.fajr,
//         rule: "SUNRISE",
//       },
//       {
//         key: "sunrise",
//         name: "Sunrise",
//         nameBn: "সূর্যোদয়",
//         start: adhan.sunrise,
//         rule: "NEXT",
//       },
//       {
//         key: "ishraq",
//         name: "Ishraq",
//         nameBn: "ইশরাক",
//         start: ishraq,
//         rule: "NEXT",
//       },
//       {
//         key: "chast",
//         name: "Chasht",
//         nameBn: "চাশত",
//         start: duha,
//         rule: "NEXT",
//       },
//       {
//         key: "dhuhr",
//         name: "Dhuhr",
//         nameBn: "জোহর",
//         start: adhan.dhuhr,
//         rule: "NEXT",
//       },
//       {
//         key: "asr",
//         name: "Asr",
//         nameBn: "আসর",
//         start: adhan.asr,
//         rule: "NEXT",
//       },
//       {
//         key: "sunset",
//         name: "Sunset",
//         nameBn: "সূর্যাস্ত",
//         start: sunset,
//         rule: "NEXT",
//       },
//       {
//         key: "maghrib",
//         name: "Maghrib",
//         nameBn: "মাগরিব",
//         start: adhan.maghrib,
//         rule: "Isha",
//       },
//       {
//         key: "awabin",
//         name: "Awwabin",
//         nameBn: "আওয়াবিন",
//         start: adhan.maghrib,
//         rule: "Isha",
//       },
//       {
//         key: "isha",
//         name: "Isha",
//         nameBn: "ইশা",
//         start: adhan.isha,
//         rule: "MIDNIGHT",
//       },
//     ];

//     const formatted: PrayerTime[] = list.map((p, i) => {
//       let endDate: Date;

//       switch (p.rule) {
//         case "SUNRISE":
//           endDate = adhan.sunrise;
//           break;
//         case "SUNSET":
//           endDate = adhan.maghrib;
//           break;
//         case "MIDNIGHT":
//           endDate = sunnah.middleOfTheNight;
//           break;
//         case "Isha":
//           endDate = adhan.isha;
//           break;
//         case "NEXT":
//           endDate = list[i + 1]?.start ?? new Date(p.start.getTime() + 7200000);
//           break;
//         default:
//           endDate = new Date(p.start.getTime() + 7200000);
//       }

//       const ts = p.start.getTime();
//       const endTs = endDate.getTime();

//       let remaining = "";
//       if (isToday && now < endTs) {
//         const diff = endTs - now;
//         const h = Math.floor(diff / 3600000);
//         const m = Math.floor((diff % 3600000) / 60000);
//         remaining = `${h}h ${m}m`;
//       }

//       const isCurrent = isToday && now >= ts && now < endTs;
//       const isPassed = isToday && now > endTs;

//       return {
//         key: p.key,
//         name: p.name,
//         nameBn: p.nameBn,
//         time: formatTime(p.start),
//         timestamp: ts,
//         endTime: formatTime(endDate),
//         endTimestamp: endTs,
//         isCurrent: isCurrent,
//         isNext: false,
//         isPassed: isPassed,
//         remaining,
//       };
//     });

//     // Set current and next prayer for today only
//     if (isToday) {
//       let currentIndex = formatted.findIndex(
//         (p) => now >= p.timestamp && now < p.endTimestamp
//       );
//       if (currentIndex === -1) currentIndex = formatted.length - 1;

//       formatted[currentIndex].isCurrent = true;
//       if (currentIndex + 1 < formatted.length) {
//         formatted[currentIndex + 1].isNext = true;
//       }
//     }

//     // Calculate fasting times
//     let fastingTimes: FastingTimes | null = null;
//     const fajrItem = formatted.find((p) => p.key === "fajr");
//     const maghribItem = formatted.find((p) => p.key === "maghrib");

//     if (fajrItem && maghribItem) {
//       const nowTs = now;
//       const isFasting =
//         isToday && nowTs >= fajrItem.timestamp && nowTs < maghribItem.timestamp;
//       let timeUntilIftar = "";

//       if (isToday && nowTs < maghribItem.timestamp) {
//         const diff = maghribItem.timestamp - nowTs;
//         const h = Math.floor(diff / 3600000);
//         const m = Math.floor((diff % 3600000) / 60000);
//         timeUntilIftar = `${h}h ${m}m`;
//       }

//       fastingTimes = {
//         sehriEnd: fajrItem.time,
//         iftarStart: maghribItem.time,
//         isFastingTime: isFasting,
//         ...(timeUntilIftar ? { timeUntilIftar } : {}),
//       };
//     }

//     return {
//       prayerTimes: formatted,
//       fastingTimes,
//     };
//   } catch (error) {
//     console.error("Error calculating prayer times:", error);
//     return null;
//   }
// };

// export function useWeeklyPrayerTimes({
//   location,
//   locale = "en",
//   method = "BD-DS",
//   asrMethod = "Standard",
//   days = 7,
// }: UseWeeklyPrayerTimesProps) {
//   const [weeklyPrayerTimes, setWeeklyPrayerTimes] = useState<DailyPrayerInfo[]>(
//     []
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const localeTag = locale === "bn" ? "bn-BD" : "en-US";

//   const calcParams = useMemo(() => {
//     let params: CalculationParameters;

//     switch (method) {
//       case "MWL":
//         params = CalculationMethod.MuslimWorldLeague();
//         break;
//       case "ISNA":
//         params = CalculationMethod.NorthAmerica();
//         break;
//       case "Karachi":
//         params = CalculationMethod.Karachi();
//         break;
//       case "BD-DS":
//       case "BD-UA":
//       default:
//         params = CalculationMethod.Karachi();
//         params.fajrAngle = 18;
//         params.ishaAngle = 18;
//         break;
//     }

//     params.madhab = asrMethod === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi;
//     return params;
//   }, [method, asrMethod]);

//   useEffect(() => {
//     if (!location) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const weeklyData: DailyPrayerInfo[] = [];

//       // Generate data for today and next (days-1) days
//       for (let i = 0; i < days; i++) {
//         const currentDate = new Date();
//         currentDate.setDate(currentDate.getDate() + i);

//         const isToday = i === 0;
//         const dailyData = calculateDailyPrayerTimes(
//           currentDate,
//           location,
//           calcParams,
//           locale,
//           isToday
//         );

//         if (dailyData) {
//           weeklyData.push({
//             date: currentDate,
//             englishDate: formatEnglishDate(currentDate, localeTag),
//             hijriDate: getHijriDate(currentDate),
//             dayName: getDayName(currentDate, localeTag),
//             prayerTimes: dailyData.prayerTimes,
//             fastingTimes: dailyData.fastingTimes,
//           });
//         }
//       }

//       setWeeklyPrayerTimes(weeklyData);
//     } catch (e) {
//       console.error("Error calculating weekly prayer times:", e);
//       setError(
//         locale === "bn"
//           ? "সাপ্তাহিক নামাজের সময় গণনায় ত্রুটি হয়েছে"
//           : "Failed to calculate weekly prayer times"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }, [location, calcParams, locale, days, localeTag]);

//   // Auto-refresh for today's data
//   useEffect(() => {
//     if (!location) return;

//     const refreshToday = () => {
//       setWeeklyPrayerTimes((prev) => {
//         const newData = [...prev];
//         if (newData.length > 0) {
//           const todayData = calculateDailyPrayerTimes(
//             new Date(),
//             location,
//             calcParams,
//             locale,
//             true
//           );
//           if (todayData) {
//             newData[0] = {
//               ...newData[0],
//               prayerTimes: todayData.prayerTimes,
//               fastingTimes: todayData.fastingTimes,
//             };
//           }
//         }
//         return newData;
//       });
//     };

//     const id = setInterval(refreshToday, 60000);
//     return () => clearInterval(id);
//   }, [location, calcParams, locale]);

//   return { weeklyPrayerTimes, isLoading, error };
// }
"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Location } from "@/hooks/useLocation";
import {
  PrayerTimes as AdhanPrayerTimes,
  Coordinates,
  CalculationMethod,
  Madhab,
  CalculationParameters,
  SunnahTimes,
} from "adhan";
import { FastingTimes } from "./usePrayerTimes";
export interface PrayerTime {
  key: string;
  name: string;
  nameBn?: string;
  time: string;
  timestamp: number;
  endTime: string;
  endTimestamp: number;
  isCurrent: boolean;
  isNext: boolean;
  isPassed: boolean;
  remaining: string;
}

/* -------------------- Types -------------------- */

export interface DailyPrayerInfo {
  date: Date;
  englishDate: string;
  hijriDate: string;
  dayName: string;
  prayerTimes: PrayerTime[];
  fastingTimes: FastingTimes | null;
}

export type CalculationMethodType =
  | "BD-DS"
  | "BD-UA"
  | "MWL"
  | "ISNA"
  | "Karachi";

interface UseWeeklyPrayerTimesProps {
  location: Location | null;
  method?: CalculationMethodType;
  asrMethod?: "Standard" | "Hanafi";
  days?: number;
  hijriOffset?: number; // 🌙 moon sighting adjustment
}

/* -------------------- Hijri Date Helper -------------------- */

// const getHijriDateMaghribBased = (
//   date: Date,
//   maghrib: Date,
//   hijriOffset: number,
//   t: ReturnType<typeof useTranslations>
// ): string => {
//   const now = new Date();
//   const baseDate = new Date(date);

//   // 🌙 Hijri day starts at Maghrib
//   if (date.toDateString() === now.toDateString() && now >= maghrib) {
//     baseDate.setDate(baseDate.getDate() + 1);
//   }

//   // 🌍 Bangladesh / country override
//   if (hijriOffset !== 0) {
//     baseDate.setDate(baseDate.getDate() + hijriOffset);
//   }

//   const parts = new Intl.DateTimeFormat("en-u-ca-islamic", {
//     day: "numeric",
//     month: "numeric",
//     year: "numeric",
//   }).formatToParts(baseDate);

//   const day = parts.find((p) => p.type === "day")?.value;
//   const month = parts.find((p) => p.type === "month")?.value;
//   const year = parts.find((p) => p.type === "year")?.value;

//   return `${day} ${t(`HijriMonths.${month}`)} ${year} ${t(
//     "HijriDate.hijriYear"
//   )}`;
// };
const getHijriDateMaghribBased = (
  date: Date,
  maghrib: Date,
  hijriOffset: number,
  isToday: boolean,
  t: ReturnType<typeof useTranslations>
): string => {
  const now = new Date();
  const baseDate = new Date(date);

  // ✅ ONLY today switches at Maghrib
  if (isToday && now >= maghrib) {
    baseDate.setDate(baseDate.getDate() + 1);
  }

  // ✅ Country moon sighting adjustment (ONCE)
  if (hijriOffset !== 0) {
    baseDate.setDate(baseDate.getDate() + hijriOffset);
  }

  const parts = new Intl.DateTimeFormat("en-u-ca-islamic", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(baseDate);

  const day = parts.find((p) => p.type === "day")?.value;
  const monthIndex = Number(parts.find((p) => p.type === "month")?.value) - 1;
  const year = parts.find((p) => p.type === "year")?.value;

  return `${day} ${t(`HijriMonths.${monthIndex + 1}`)} ${year} ${t(
    "HijriDate.hijriYear"
  )}`;
};
/* -------------------- Daily Calculation -------------------- */

const calculateDailyPrayerTimes = (
  date: Date,
  location: Location,
  calcParams: CalculationParameters,
  t: ReturnType<typeof useTranslations>,
  hijriOffset: number,
  isToday = false
) => {
  try {
    const coords = new Coordinates(location.latitude, location.longitude);
    const adhan = new AdhanPrayerTimes(coords, date, calcParams);
    const sunnah = new SunnahTimes(adhan);

    const formatTime = (d: Date) =>
      d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    const now = Date.now();

    const ishraq = new Date(adhan.sunrise.getTime() + 20 * 60000);
    const duha = new Date(
      (adhan.sunrise.getTime() + adhan.dhuhr.getTime()) / 2
    );
    const sunset = new Date(adhan.maghrib.getTime() - 60000);

    const raw = [
      { key: "tahajjud", start: sunnah.lastThirdOfTheNight, end: adhan.fajr },
      { key: "fajr", start: adhan.fajr, end: adhan.sunrise },
      { key: "sunrise", start: adhan.sunrise, end: ishraq },
      { key: "ishraq", start: ishraq, end: duha },
      { key: "chast", start: duha, end: adhan.dhuhr },
      { key: "dhuhr", start: adhan.dhuhr, end: adhan.asr },
      { key: "asr", start: adhan.asr, end: sunset },
      { key: "sunset", start: sunset, end: adhan.maghrib },
      { key: "maghrib", start: adhan.maghrib, end: adhan.isha },
      { key: "isha", start: adhan.isha, end: sunnah.middleOfTheNight },
    ];

    const prayerTimes: PrayerTime[] = raw.map((p) => ({
      key: p.key,
      name: t(`Prayers.${p.key}`),
      time: formatTime(p.start),
      timestamp: p.start.getTime(),
      endTime: formatTime(p.end),
      endTimestamp: p.end.getTime(),
      isCurrent: isToday && now >= p.start.getTime() && now < p.end.getTime(),
      isNext: false,
      isPassed: isToday && now > p.end.getTime(),
      remaining: "",
    }));

    if (isToday) {
      const currentIndex = prayerTimes.findIndex((p) => p.isCurrent);
      if (currentIndex >= 0 && prayerTimes[currentIndex + 1]) {
        prayerTimes[currentIndex + 1].isNext = true;
      }
    }

    const fajr = prayerTimes.find((p) => p.key === "fajr");
    const maghrib = prayerTimes.find((p) => p.key === "maghrib");

    const fastingTimes: FastingTimes | null =
      fajr && maghrib
        ? {
            sehriEnd: fajr.time,
            iftarStart: maghrib.time,
            isFastingTime:
              isToday && now >= fajr.timestamp && now < maghrib.timestamp,
          }
        : null;

    return {
      prayerTimes,
      fastingTimes,
      hijriDate: getHijriDateMaghribBased(
        date,
        adhan.maghrib,
        hijriOffset,
        isToday,
        t
      ),
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

/* -------------------- Weekly Hook -------------------- */

export function useWeeklyPrayerTimes({
  location,
  method = "BD-DS",
  asrMethod = "Standard",
  days = 7,
  hijriOffset = 0,
}: UseWeeklyPrayerTimesProps) {
  const t = useTranslations();

  const [weeklyPrayerTimes, setWeeklyPrayerTimes] = useState<DailyPrayerInfo[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calcParams = useMemo(() => {
    const params = CalculationMethod.Karachi();
    params.fajrAngle = 18;
    params.ishaAngle = 18;
    params.madhab = asrMethod === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi;
    return params;
  }, [asrMethod]);

  useEffect(() => {
    if (!location) return;

    setIsLoading(true);
    setError(null);

    try {
      const data: DailyPrayerInfo[] = [];

      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        const daily = calculateDailyPrayerTimes(
          date,
          location,
          calcParams,
          t,
          hijriOffset,
          i === 0
        );

        if (daily) {
          data.push({
            date,
            englishDate: date.toDateString(),
            dayName: date.toLocaleDateString(undefined, {
              weekday: "long",
            }),
            hijriDate: daily.hijriDate,
            prayerTimes: daily.prayerTimes,
            fastingTimes: daily.fastingTimes,
          });
        }
      }

      setWeeklyPrayerTimes(data);
    } catch {
      setError(t("Common.error"));
    } finally {
      setIsLoading(false);
    }
  }, [location, calcParams, days, hijriOffset, t]);

  return { weeklyPrayerTimes, isLoading, error };
}
