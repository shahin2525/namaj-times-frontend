/* eslint-disable @typescript-eslint/ban-ts-comment */
// "use client";

// import { useState, useEffect, useMemo, useCallback } from "react";
// import { Location } from "./useLocation";
// import { PrayerTimes, Coordinates, CalculationParameters, Madhab } from "adhan";

// export interface PrayerTime {
//   name: string; // English name for internal use
//   nameBn: string; // Bengali name
//   time: string;
//   timestamp: number;
//   isCurrent: boolean;
//   isNext: boolean;
//   isPassed: boolean;
// }

// export type CalculationMethod = "BD-DS" | "BD-UA" | "MWL" | "ISNA" | "Karachi";

// interface UsePrayerTimesProps {
//   location: Location | null;
//   locale: "en" | "bn"; // From next-intl
//   method?: CalculationMethod;
//   asrMethod?: "Standard" | "Hanafi";
//   adjustment?: { [key: string]: number };
// }

// export function usePrayerTimes({
//   location,
//   locale = "en",
//   method = "BD-DS",
//   asrMethod = "Standard",
//   adjustment = {},
// }: UsePrayerTimesProps) {
//   const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Memoize the adjustment object to prevent unnecessary re-renders
//   const memoizedAdjustment = useMemo(
//     () => adjustment,
//     [
//       adjustment.fajr,
//       adjustment.sunrise,
//       adjustment.dhuhr,
//       adjustment.asr,
//       adjustment.maghrib,
//       adjustment.isha,
//     ]
//   );

//   // Memoize the calculation function
//   const calculatePrayerTimes = useCallback(() => {
//     if (!location) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const coordinates = new Coordinates(
//         location.latitude,
//         location.longitude
//       );
//       const date = new Date();

//       const params = getBangladeshCalculationParameters(method, asrMethod);
//       const adhanPrayerTimes = new PrayerTimes(coordinates, date, params);

//       // Create prayer times with both English and Bengali names
//       const formattedPrayerTimes: PrayerTime[] = [
//         createPrayerTime(
//           "Fajr",
//           "ফজর",
//           adhanPrayerTimes.fajr,
//           memoizedAdjustment.fajr
//         ),
//         createPrayerTime(
//           "Sunrise",
//           "সূর্যোদয়",
//           adhanPrayerTimes.sunrise,
//           memoizedAdjustment.sunrise
//         ),
//         createPrayerTime(
//           "Dhuhr",
//           "জোহর",
//           adhanPrayerTimes.dhuhr,
//           memoizedAdjustment.dhuhr
//         ),
//         createPrayerTime(
//           "Asr",
//           "আসর",
//           adhanPrayerTimes.asr,
//           memoizedAdjustment.asr
//         ),
//         createPrayerTime(
//           "Maghrib",
//           "মাগরিব",
//           adhanPrayerTimes.maghrib,
//           memoizedAdjustment.maghrib
//         ),
//         createPrayerTime(
//           "Isha",
//           "ইশা",
//           adhanPrayerTimes.isha,
//           memoizedAdjustment.isha
//         ),
//       ];

//       const now = new Date();
//       const updatedPrayerTimes = markCurrentAndNextPrayer(
//         formattedPrayerTimes,
//         now
//       );

//       setPrayerTimes(updatedPrayerTimes);
//     } catch (err) {
//       setError(
//         locale === "bn"
//           ? "নামাজের সময় গণনায় সমস্যা হয়েছে"
//           : "Failed to calculate prayer times"
//       );
//       console.error("Error calculating prayer times:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [location, method, asrMethod, memoizedAdjustment, locale]);

//   useEffect(() => {
//     if (!location) return;

//     calculatePrayerTimes();

//     // Update prayer times every minute
//     const interval = setInterval(calculatePrayerTimes, 60000);
//     return () => clearInterval(interval);
//   }, [calculatePrayerTimes, location]);

//   return {
//     prayerTimes,
//     isLoading,
//     error,
//   };
// }

// // Helper function to create prayer time object
// function createPrayerTime(
//   englishName: string,
//   bengaliName: string,
//   date: Date,
//   adjustment: number = 0
// ): PrayerTime {
//   const adjustedDate = new Date(date.getTime() + (adjustment || 0) * 60000);

//   return {
//     name: englishName,
//     nameBn: bengaliName,
//     time: formatTime(adjustedDate),
//     timestamp: adjustedDate.getTime(),
//     isCurrent: false,
//     isNext: false,
//     isPassed: false,
//   };
// }

// // Format time based on locale
// function formatTime(date: Date): string {
//   return date.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });
// }

// // Bangladesh calculation parameters (fixed)
// function getBangladeshCalculationParameters(
//   method: CalculationMethod,
//   asrMethod: string
// ): CalculationParameters {
//   let fajrAngle = 18;
//   let ishaAngle = 18;
//   let ishaInterval = 0;
//   let methodName = "BD-DS";

//   switch (method) {
//     case "BD-DS":
//       fajrAngle = 18;
//       ishaAngle = 18;
//       ishaInterval = 0;
//       methodName = "Bangladesh Islamic Foundation (Dhaka)";
//       break;
//     case "BD-UA":
//       fajrAngle = 18;
//       ishaAngle = 18;
//       ishaInterval = 0;
//       methodName = "University of Asia";
//       break;
//     case "MWL":
//       fajrAngle = 18;
//       ishaAngle = 17;
//       ishaInterval = 0;
//       methodName = "Muslim World League";
//       break;
//     case "ISNA":
//       fajrAngle = 15;
//       ishaAngle = 15;
//       ishaInterval = 0;
//       methodName = "Islamic Society of North America";
//       break;
//     case "Karachi":
//       fajrAngle = 18;
//       ishaAngle = 18;
//       ishaInterval = 0;
//       methodName = "University of Islamic Sciences, Karachi";
//       break;
//     default:
//       fajrAngle = 18;
//       ishaAngle = 18;
//       ishaInterval = 0;
//       methodName = "Bangladesh Islamic Foundation (Dhaka)";
//   }

//   const params = new CalculationParameters(
//     fajrAngle,
//     ishaAngle,
//     ishaInterval,
//     methodName
//   );

//   if (asrMethod === "Hanafi") {
//     params.madhab = Madhab.Hanafi;
//   } else {
//     params.madhab = Madhab.Shafi;
//   }

//   return params;
// }

// function markCurrentAndNextPrayer(
//   prayerTimes: PrayerTime[],
//   now: Date
// ): PrayerTime[] {
//   const currentTime = now.getTime();

//   return prayerTimes.map((prayer, index, array) => {
//     const prayerTime = prayer.timestamp;
//     const nextPrayerTime = array[index + 1]?.timestamp;
//     const previousPrayerTime = array[index - 1]?.timestamp;

//     const isPassed = currentTime > prayerTime;
//     const isCurrent =
//       !isPassed && (!nextPrayerTime || currentTime < nextPrayerTime);
//     const isNext =
//       !isPassed &&
//       !isCurrent &&
//       (!previousPrayerTime || currentTime >= previousPrayerTime);

//     return {
//       ...prayer,
//       isCurrent,
//       isNext,
//       isPassed,
//     };
//   });
// }
// hooks/usePrayerTimes.ts
"use client";

import { useState, useEffect, useMemo } from "react";
import { Location } from "@/hooks/useLocation";
import {
  PrayerTimes as AdhanPrayerTimes,
  Coordinates,
  CalculationMethod,
  Madhab,
  Prayer,
  CalculationParameters,
} from "adhan";

export interface PrayerTime {
  name: string;
  nameBn: string;
  time: string;
  timestamp: number;
  isCurrent: boolean;
  isNext: boolean;
  isPassed: boolean;
}

export interface FastingTimes {
  sehriEnd: string;
  iftarStart: string;
  isFastingTime: boolean;
}

export type CalculationMethodType =
  | "BD-DS"
  | "BD-UA"
  | "MWL"
  | "ISNA"
  | "Karachi";

interface UsePrayerTimesProps {
  location: Location | null;
  locale: "en" | "bn";
  method?: CalculationMethodType;
  asrMethod?: "Standard" | "Hanafi";
  adjustment?: { [key: string]: number };
}

export function usePrayerTimes({
  location,
  locale = "en",
  method = "BD-DS",
  asrMethod = "Standard",
  adjustment = {},
}: UsePrayerTimesProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [fastingTimes, setFastingTimes] = useState<FastingTimes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** FORMAT TIME (memoized) */
  const localeTag = locale === "bn" ? "bn-BD" : "en-US";
  const formatTime = (date: Date) =>
    date.toLocaleTimeString(localeTag, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  /** BUILD CALCULATION PARAMS */
  const calcParams = useMemo(() => {
    let params: CalculationParameters;

    switch (method) {
      case "MWL":
        params = CalculationMethod.MuslimWorldLeague();
        break;
      case "ISNA":
        params = CalculationMethod.NorthAmerica();
        break;
      case "Karachi":
        params = CalculationMethod.Karachi();
        break;
      case "BD-DS":
      case "BD-UA":
      default:
        params = CalculationMethod.Karachi();
        params.fajrAngle = 18;
        params.ishaAngle = 18;
        break;
    }

    params.madhab = asrMethod === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi;

    return params;
  }, [method, asrMethod]);

  /** MAIN PRAYER CALCULATION — STABLE, NO LOOP */
  const calculate = useMemo(() => {
    return () => {
      if (!location) return;

      setIsLoading(true);
      setError(null);

      try {
        const coords = new Coordinates(location.latitude, location.longitude);
        const date = new Date();

        const adhanTimes = new AdhanPrayerTimes(coords, date, calcParams);

        const list = [
          { name: "Fajr", nameBn: "ফজর", p: Prayer.Fajr },
          { name: "Sunrise", nameBn: "সূর্যোদয়", p: Prayer.Sunrise },
          { name: "Dhuhr", nameBn: "জোহর", p: Prayer.Dhuhr },
          { name: "Asr", nameBn: "আসর", p: Prayer.Asr },
          { name: "Maghrib", nameBn: "মাগরিব", p: Prayer.Maghrib },
          { name: "Isha", nameBn: "ইশা", p: Prayer.Isha },
        ];

        const now = Date.now();

        const formatted: PrayerTime[] = list.map((x) => {
          const dt = adhanTimes.timeForPrayer(x.p);
          const ts = dt?.getTime() ?? 0;

          return {
            name: x.name,
            nameBn: x.nameBn,
            time: formatTime(dt),
            timestamp: ts,
            isCurrent: false,
            isNext: false,
            isPassed: now > ts,
          };
        });

        /** DETECT CURRENT PRAYER */
        let currentIndex = formatted.findIndex(
          (p, i) =>
            now >= p.timestamp &&
            now < (formatted[i + 1]?.timestamp ?? Infinity)
        );
        if (currentIndex === -1) currentIndex = formatted.length - 1;

        /** MARK CURRENT AND NEXT */
        formatted[currentIndex].isCurrent = true;
        formatted[(currentIndex + 1) % formatted.length].isNext = true;

        setPrayerTimes(formatted);

        /** FASTING INFORMATION */
        const fajr = formatted[0];
        const maghrib = formatted[4];

        setFastingTimes({
          sehriEnd: fajr.time,
          iftarStart: maghrib.time,
          isFastingTime: now >= fajr.timestamp && now <= maghrib.timestamp,
        });
      } catch (e) {
        console.error(e);
        setError(
          locale === "bn"
            ? "নামাজের সময় গণনায় ত্রুটি হয়েছে"
            : "Failed to calculate prayer times"
        );
      } finally {
        setIsLoading(false);
      }
    };
  }, [location, calcParams, localeTag]);

  /** AUTO-RUN & INTERVAL (NO LOOP) */
  useEffect(() => {
    if (!location) return;

    calculate();
    const id = setInterval(calculate, 60000);

    return () => clearInterval(id);
  }, [location]); // ONLY location changes rerun

  return {
    prayerTimes,
    fastingTimes,
    isLoading,
    error,
  };
}
