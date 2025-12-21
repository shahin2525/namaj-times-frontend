// // // hooks/useWeeklyPrayerTimes.ts

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { useTranslations } from "next-intl";
// import { Location } from "@/hooks/useLocation";
// import {
//   PrayerTimes as AdhanPrayerTimes,
//   Coordinates,
//   CalculationMethod,
//   Madhab,
//   CalculationParameters,
//   SunnahTimes,
// } from "adhan";
// import { FastingTimes } from "./usePrayerTimes";
// export interface PrayerTime {
//   key: string;
//   name: string;
//   nameBn?: string;
//   time: string;
//   timestamp: number;
//   endTime: string;
//   endTimestamp: number;
//   isCurrent: boolean;
//   isNext: boolean;
//   isPassed: boolean;
//   remaining: string;
// }

// /* -------------------- Types -------------------- */

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
//   method?: CalculationMethodType;
//   asrMethod?: "Standard" | "Hanafi";
//   days?: number;
//   hijriOffset?: number; // 🌙 moon sighting adjustment
// }

// /* -------------------- Hijri Date Helper -------------------- */

// // const getHijriDateMaghribBased = (
// //   date: Date,
// //   maghrib: Date,
// //   hijriOffset: number,
// //   t: ReturnType<typeof useTranslations>
// // ): string => {
// //   const now = new Date();
// //   const baseDate = new Date(date);

// //   // 🌙 Hijri day starts at Maghrib
// //   if (date.toDateString() === now.toDateString() && now >= maghrib) {
// //     baseDate.setDate(baseDate.getDate() + 1);
// //   }

// //   // 🌍 Bangladesh / country override
// //   if (hijriOffset !== 0) {
// //     baseDate.setDate(baseDate.getDate() + hijriOffset);
// //   }

// //   const parts = new Intl.DateTimeFormat("en-u-ca-islamic", {
// //     day: "numeric",
// //     month: "numeric",
// //     year: "numeric",
// //   }).formatToParts(baseDate);

// //   const day = parts.find((p) => p.type === "day")?.value;
// //   const month = parts.find((p) => p.type === "month")?.value;
// //   const year = parts.find((p) => p.type === "year")?.value;

// //   return `${day} ${t(`HijriMonths.${month}`)} ${year} ${t(
// //     "HijriDate.hijriYear"
// //   )}`;
// // };
// const getHijriDateMaghribBased = (
//   date: Date,
//   maghrib: Date,
//   hijriOffset: number,
//   isToday: boolean,
//   t: ReturnType<typeof useTranslations>
// ): string => {
//   const now = new Date();
//   const baseDate = new Date(date);

//   // ✅ ONLY today switches at Maghrib
//   if (isToday && now >= maghrib) {
//     baseDate.setDate(baseDate.getDate() + 1);
//   }

//   // ✅ Country moon sighting adjustment (ONCE)
//   if (hijriOffset !== 0) {
//     baseDate.setDate(baseDate.getDate() + hijriOffset);
//   }

//   const parts = new Intl.DateTimeFormat("en-u-ca-islamic", {
//     day: "numeric",
//     month: "numeric",
//     year: "numeric",
//   }).formatToParts(baseDate);

//   const day = parts.find((p) => p.type === "day")?.value;
//   const monthIndex = Number(parts.find((p) => p.type === "month")?.value) - 1;
//   const year = parts.find((p) => p.type === "year")?.value;

//   return `${day} ${t(`HijriMonths.${monthIndex + 1}`)} ${year} ${t(
//     "HijriDate.hijriYear"
//   )}`;
// };
// /* -------------------- Daily Calculation -------------------- */

// const calculateDailyPrayerTimes = (
//   date: Date,
//   location: Location,
//   calcParams: CalculationParameters,
//   t: ReturnType<typeof useTranslations>,
//   hijriOffset: number,
//   isToday = false
// ) => {
//   try {
//     const coords = new Coordinates(location.latitude, location.longitude);
//     const adhan = new AdhanPrayerTimes(coords, date, calcParams);
//     const sunnah = new SunnahTimes(adhan);

//     const formatTime = (d: Date) =>
//       d.toLocaleTimeString(undefined, {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });

//     const now = Date.now();

//     const ishraq = new Date(adhan.sunrise.getTime() + 20 * 60000);
//     const duha = new Date(
//       (adhan.sunrise.getTime() + adhan.dhuhr.getTime()) / 2
//     );
//     const sunset = new Date(adhan.maghrib.getTime() - 60000);

//     const raw = [
//       { key: "tahajjud", start: sunnah.lastThirdOfTheNight, end: adhan.fajr },
//       { key: "fajr", start: adhan.fajr, end: adhan.sunrise },
//       { key: "sunrise", start: adhan.sunrise, end: ishraq },
//       { key: "ishraq", start: ishraq, end: duha },
//       { key: "chast", start: duha, end: adhan.dhuhr },
//       { key: "dhuhr", start: adhan.dhuhr, end: adhan.asr },
//       { key: "asr", start: adhan.asr, end: sunset },
//       { key: "sunset", start: sunset, end: adhan.maghrib },
//       { key: "maghrib", start: adhan.maghrib, end: adhan.isha },
//       { key: "isha", start: adhan.isha, end: sunnah.middleOfTheNight },
//     ];

//     const prayerTimes: PrayerTime[] = raw.map((p) => ({
//       key: p.key,
//       name: t(`Prayers.${p.key}`),
//       time: formatTime(p.start),
//       timestamp: p.start.getTime(),
//       endTime: formatTime(p.end),
//       endTimestamp: p.end.getTime(),
//       isCurrent: isToday && now >= p.start.getTime() && now < p.end.getTime(),
//       isNext: false,
//       isPassed: isToday && now > p.end.getTime(),
//       remaining: "",
//     }));

//     if (isToday) {
//       const currentIndex = prayerTimes.findIndex((p) => p.isCurrent);
//       if (currentIndex >= 0 && prayerTimes[currentIndex + 1]) {
//         prayerTimes[currentIndex + 1].isNext = true;
//       }
//     }

//     const fajr = prayerTimes.find((p) => p.key === "fajr");
//     const maghrib = prayerTimes.find((p) => p.key === "maghrib");

//     const fastingTimes: FastingTimes | null =
//       fajr && maghrib
//         ? {
//             sehriEnd: fajr.time,
//             iftarStart: maghrib.time,
//             isFastingTime:
//               isToday && now >= fajr.timestamp && now < maghrib.timestamp,
//           }
//         : null;

//     return {
//       prayerTimes,
//       fastingTimes,
//       hijriDate: getHijriDateMaghribBased(
//         date,
//         adhan.maghrib,
//         hijriOffset,
//         isToday,
//         t
//       ),
//     };
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

// /* -------------------- Weekly Hook -------------------- */

// export function useWeeklyPrayerTimes({
//   location,
//   method = "BD-DS",
//   asrMethod = "Standard",
//   days = 7,
//   hijriOffset = 0,
// }: UseWeeklyPrayerTimesProps) {
//   const t = useTranslations();

//   const [weeklyPrayerTimes, setWeeklyPrayerTimes] = useState<DailyPrayerInfo[]>(
//     []
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const calcParams = useMemo(() => {
//     const params = CalculationMethod.Karachi();
//     params.fajrAngle = 18;
//     params.ishaAngle = 18;
//     params.madhab = asrMethod === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi;
//     return params;
//   }, [asrMethod]);

//   useEffect(() => {
//     if (!location) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const data: DailyPrayerInfo[] = [];

//       for (let i = 0; i < days; i++) {
//         const date = new Date();
//         date.setDate(date.getDate() + i);

//         const daily = calculateDailyPrayerTimes(
//           date,
//           location,
//           calcParams,
//           t,
//           hijriOffset,
//           i === 0
//         );

//         if (daily) {
//           data.push({
//             date,
//             englishDate: date.toDateString(),
//             dayName: date.toLocaleDateString(undefined, {
//               weekday: "long",
//             }),
//             hijriDate: daily.hijriDate,
//             prayerTimes: daily.prayerTimes,
//             fastingTimes: daily.fastingTimes,
//           });
//         }
//       }

//       setWeeklyPrayerTimes(data);
//     } catch {
//       setError(t("Common.error"));
//     } finally {
//       setIsLoading(false);
//     }
//   }, [location, calcParams, days, hijriOffset, t]);

//   return { weeklyPrayerTimes, isLoading, error };
// }
// // hooks/useWeeklyPrayerTimes.ts
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
// Fixed: Removed Maghrib-based advancement to match standard calendar displays
// (Intl uses Umm al-Qura, and Dec 21, 2025 = 1 Rajab 1447 AH all day)
const getHijriDateMaghribBased = (
  date: Date,
  hijriOffset: number,
  t: ReturnType<typeof useTranslations>
): string => {
  const baseDate = new Date(date);

  // Apply country-specific moon sighting offset (if any)
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
      // Updated call: no longer pass maghrib or isToday
      hijriDate: getHijriDateMaghribBased(date, hijriOffset, t),
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
