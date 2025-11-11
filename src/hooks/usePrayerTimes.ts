// "use client";

// import { useState, useEffect } from "react";
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

//   useEffect(() => {
//     if (!location) return;

//     const calculatePrayerTimes = () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const coordinates = new Coordinates(
//           location.latitude,
//           location.longitude
//         );
//         const date = new Date();

//         const params = getBangladeshCalculationParameters(method, asrMethod);
//         const adhanPrayerTimes = new PrayerTimes(coordinates, date, params);

//         // Create prayer times with both English and Bengali names
//         const formattedPrayerTimes: PrayerTime[] = [
//           createPrayerTime(
//             "Fajr",
//             "ফজর",
//             adhanPrayerTimes.fajr,
//             adjustment.fajr
//           ),
//           createPrayerTime(
//             "Sunrise",
//             "সূর্যোদয়",
//             adhanPrayerTimes.sunrise,
//             adjustment.sunrise
//           ),
//           createPrayerTime(
//             "Dhuhr",
//             "জোহর",
//             adhanPrayerTimes.dhuhr,
//             adjustment.dhuhr
//           ),
//           createPrayerTime("Asr", "আসর", adhanPrayerTimes.asr, adjustment.asr),
//           createPrayerTime(
//             "Maghrib",
//             "মাগরিব",
//             adhanPrayerTimes.maghrib,
//             adjustment.maghrib
//           ),
//           createPrayerTime(
//             "Isha",
//             "ইশা",
//             adhanPrayerTimes.isha,
//             adjustment.isha
//           ),
//         ];

//         const now = new Date();
//         const updatedPrayerTimes = markCurrentAndNextPrayer(
//           formattedPrayerTimes,
//           now
//         );

//         setPrayerTimes(updatedPrayerTimes);
//       } catch (err) {
//         setError(
//           locale === "bn"
//             ? "নামাজের সময় গণনায় সমস্যা হয়েছে"
//             : "Failed to calculate prayer times"
//         );
//         console.error("Error calculating prayer times:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     calculatePrayerTimes();

//     const interval = setInterval(calculatePrayerTimes, 60000);
//     return () => clearInterval(interval);
//   }, [location, method, asrMethod, adjustment, locale]);

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
//   const adjustedDate = new Date(date.getTime() + adjustment * 60000);

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
//     const nextPrayer = array[index + 1];
//     const isPassed = currentTime > prayer.timestamp;
//     const isCurrent =
//       !isPassed &&
//       currentTime >= prayer.timestamp &&
//       (!nextPrayer || currentTime < nextPrayer.timestamp);
//     const isNext =
//       !isPassed &&
//       !isCurrent &&
//       currentTime < prayer.timestamp &&
//       (index === 0 || currentTime >= array[index - 1].timestamp);

//     return {
//       ...prayer,
//       isCurrent,
//       isNext,
//       isPassed,
//     };
//   });
// }
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Location } from "./useLocation";
import { PrayerTimes, Coordinates, CalculationParameters, Madhab } from "adhan";

export interface PrayerTime {
  name: string; // English name for internal use
  nameBn: string; // Bengali name
  time: string;
  timestamp: number;
  isCurrent: boolean;
  isNext: boolean;
  isPassed: boolean;
}

export type CalculationMethod = "BD-DS" | "BD-UA" | "MWL" | "ISNA" | "Karachi";

interface UsePrayerTimesProps {
  location: Location | null;
  locale: "en" | "bn"; // From next-intl
  method?: CalculationMethod;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the adjustment object to prevent unnecessary re-renders
  const memoizedAdjustment = useMemo(
    () => adjustment,
    [
      adjustment.fajr,
      adjustment.sunrise,
      adjustment.dhuhr,
      adjustment.asr,
      adjustment.maghrib,
      adjustment.isha,
    ]
  );

  // Memoize the calculation function
  const calculatePrayerTimes = useCallback(() => {
    if (!location) return;

    setIsLoading(true);
    setError(null);

    try {
      const coordinates = new Coordinates(
        location.latitude,
        location.longitude
      );
      const date = new Date();

      const params = getBangladeshCalculationParameters(method, asrMethod);
      const adhanPrayerTimes = new PrayerTimes(coordinates, date, params);

      // Create prayer times with both English and Bengali names
      const formattedPrayerTimes: PrayerTime[] = [
        createPrayerTime(
          "Fajr",
          "ফজর",
          adhanPrayerTimes.fajr,
          memoizedAdjustment.fajr
        ),
        createPrayerTime(
          "Sunrise",
          "সূর্যোদয়",
          adhanPrayerTimes.sunrise,
          memoizedAdjustment.sunrise
        ),
        createPrayerTime(
          "Dhuhr",
          "জোহর",
          adhanPrayerTimes.dhuhr,
          memoizedAdjustment.dhuhr
        ),
        createPrayerTime(
          "Asr",
          "আসর",
          adhanPrayerTimes.asr,
          memoizedAdjustment.asr
        ),
        createPrayerTime(
          "Maghrib",
          "মাগরিব",
          adhanPrayerTimes.maghrib,
          memoizedAdjustment.maghrib
        ),
        createPrayerTime(
          "Isha",
          "ইশা",
          adhanPrayerTimes.isha,
          memoizedAdjustment.isha
        ),
      ];

      const now = new Date();
      const updatedPrayerTimes = markCurrentAndNextPrayer(
        formattedPrayerTimes,
        now
      );

      setPrayerTimes(updatedPrayerTimes);
    } catch (err) {
      setError(
        locale === "bn"
          ? "নামাজের সময় গণনায় সমস্যা হয়েছে"
          : "Failed to calculate prayer times"
      );
      console.error("Error calculating prayer times:", err);
    } finally {
      setIsLoading(false);
    }
  }, [location, method, asrMethod, memoizedAdjustment, locale]);

  useEffect(() => {
    if (!location) return;

    calculatePrayerTimes();

    // Update prayer times every minute
    const interval = setInterval(calculatePrayerTimes, 60000);
    return () => clearInterval(interval);
  }, [calculatePrayerTimes, location]);

  return {
    prayerTimes,
    isLoading,
    error,
  };
}

// Helper function to create prayer time object
function createPrayerTime(
  englishName: string,
  bengaliName: string,
  date: Date,
  adjustment: number = 0
): PrayerTime {
  const adjustedDate = new Date(date.getTime() + (adjustment || 0) * 60000);

  return {
    name: englishName,
    nameBn: bengaliName,
    time: formatTime(adjustedDate),
    timestamp: adjustedDate.getTime(),
    isCurrent: false,
    isNext: false,
    isPassed: false,
  };
}

// Format time based on locale
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Bangladesh calculation parameters (fixed)
function getBangladeshCalculationParameters(
  method: CalculationMethod,
  asrMethod: string
): CalculationParameters {
  let fajrAngle = 18;
  let ishaAngle = 18;
  let ishaInterval = 0;
  let methodName = "BD-DS";

  switch (method) {
    case "BD-DS":
      fajrAngle = 18;
      ishaAngle = 18;
      ishaInterval = 0;
      methodName = "Bangladesh Islamic Foundation (Dhaka)";
      break;
    case "BD-UA":
      fajrAngle = 18;
      ishaAngle = 18;
      ishaInterval = 0;
      methodName = "University of Asia";
      break;
    case "MWL":
      fajrAngle = 18;
      ishaAngle = 17;
      ishaInterval = 0;
      methodName = "Muslim World League";
      break;
    case "ISNA":
      fajrAngle = 15;
      ishaAngle = 15;
      ishaInterval = 0;
      methodName = "Islamic Society of North America";
      break;
    case "Karachi":
      fajrAngle = 18;
      ishaAngle = 18;
      ishaInterval = 0;
      methodName = "University of Islamic Sciences, Karachi";
      break;
    default:
      fajrAngle = 18;
      ishaAngle = 18;
      ishaInterval = 0;
      methodName = "Bangladesh Islamic Foundation (Dhaka)";
  }

  const params = new CalculationParameters(
    fajrAngle,
    ishaAngle,
    ishaInterval,
    methodName
  );

  if (asrMethod === "Hanafi") {
    params.madhab = Madhab.Hanafi;
  } else {
    params.madhab = Madhab.Shafi;
  }

  return params;
}

function markCurrentAndNextPrayer(
  prayerTimes: PrayerTime[],
  now: Date
): PrayerTime[] {
  const currentTime = now.getTime();

  return prayerTimes.map((prayer, index, array) => {
    const prayerTime = prayer.timestamp;
    const nextPrayerTime = array[index + 1]?.timestamp;
    const previousPrayerTime = array[index - 1]?.timestamp;

    const isPassed = currentTime > prayerTime;
    const isCurrent =
      !isPassed && (!nextPrayerTime || currentTime < nextPrayerTime);
    const isNext =
      !isPassed &&
      !isCurrent &&
      (!previousPrayerTime || currentTime >= previousPrayerTime);

    return {
      ...prayer,
      isCurrent,
      isNext,
      isPassed,
    };
  });
}
