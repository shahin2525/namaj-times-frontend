// // hooks/usePrayerTimes.ts
// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { Location } from "@/hooks/useLocation";
// import {
//   PrayerTimes as AdhanPrayerTimes,
//   Coordinates,
//   CalculationMethod,
//   Madhab,
//   Prayer,
//   CalculationParameters,
// } from "adhan";

// export interface PrayerTime {
//   name: string;
//   nameBn: string;
//   time: string;
//   timestamp: number;
//   isCurrent: boolean;
//   isNext: boolean;
//   isPassed: boolean;
// }

// export interface FastingTimes {
//   sehriEnd: string;
//   iftarStart: string;
//   isFastingTime: boolean;
// }

// export type CalculationMethodType =
//   | "BD-DS"
//   | "BD-UA"
//   | "MWL"
//   | "ISNA"
//   | "Karachi";

// interface UsePrayerTimesProps {
//   location: Location | null;
//   locale: "en" | "bn";
//   method?: CalculationMethodType;
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
//   const [fastingTimes, setFastingTimes] = useState<FastingTimes | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   /** FORMAT TIME (memoized) */
//   const localeTag = locale === "bn" ? "bn-BD" : "en-US";
//   const formatTime = (date: Date) =>
//     date.toLocaleTimeString(localeTag, {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });

//   /** BUILD CALCULATION PARAMS */
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

//   /** MAIN PRAYER CALCULATION — STABLE, NO LOOP */
//   const calculate = useMemo(() => {
//     return () => {
//       if (!location) return;

//       setIsLoading(true);
//       setError(null);

//       try {
//         const coords = new Coordinates(location.latitude, location.longitude);
//         const date = new Date();

//         const adhanTimes = new AdhanPrayerTimes(coords, date, calcParams);

//         const list = [
//           { name: "Fajr", nameBn: "ফজর", p: Prayer.Fajr },
//           { name: "Sunrise", nameBn: "সূর্যোদয়", p: Prayer.Sunrise },
//           { name: "Dhuhr", nameBn: "জোহর", p: Prayer.Dhuhr },
//           { name: "Asr", nameBn: "আসর", p: Prayer.Asr },
//           { name: "Maghrib", nameBn: "মাগরিব", p: Prayer.Maghrib },
//           { name: "Isha", nameBn: "ইশা", p: Prayer.Isha },
//         ];

//         const now = Date.now();

//         const formatted: PrayerTime[] = list.map((x) => {
//           const dt = adhanTimes.timeForPrayer(x.p);
//           const ts = dt?.getTime() ?? 0;

//           return {
//             name: x.name,
//             nameBn: x.nameBn,
//             time: formatTime(dt),
//             timestamp: ts,
//             isCurrent: false,
//             isNext: false,
//             isPassed: now > ts,
//           };
//         });

//         /** DETECT CURRENT PRAYER */
//         let currentIndex = formatted.findIndex(
//           (p, i) =>
//             now >= p.timestamp &&
//             now < (formatted[i + 1]?.timestamp ?? Infinity)
//         );
//         if (currentIndex === -1) currentIndex = formatted.length - 1;

//         /** MARK CURRENT AND NEXT */
//         formatted[currentIndex].isCurrent = true;
//         formatted[(currentIndex + 1) % formatted.length].isNext = true;

//         setPrayerTimes(formatted);

//         /** FASTING INFORMATION */
//         const fajr = formatted[0];
//         const maghrib = formatted[4];

//         setFastingTimes({
//           sehriEnd: fajr.time,
//           iftarStart: maghrib.time,
//           isFastingTime: now >= fajr.timestamp && now <= maghrib.timestamp,
//         });
//       } catch (e) {
//         console.error(e);
//         setError(
//           locale === "bn"
//             ? "নামাজের সময় গণনায় ত্রুটি হয়েছে"
//             : "Failed to calculate prayer times"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };
//   }, [location, calcParams, localeTag]);

//   /** AUTO-RUN & INTERVAL (NO LOOP) */
//   useEffect(() => {
//     if (!location) return;

//     calculate();
//     const id = setInterval(calculate, 60000);

//     return () => clearInterval(id);
//   }, [location]); // ONLY location changes rerun

//   return {
//     prayerTimes,
//     fastingTimes,
//     isLoading,
//     error,
//   };
// }
// === UPDATED usePrayerTimes.ts ===
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
  SunnahTimes,
} from "adhan";

export interface PrayerTime {
  name: string;
  nameBn: string;
  time: string;
  timestamp: number;
  endTime: string;
  endTimestamp: number;
  isCurrent: boolean;
  isNext: boolean;
  isPassed: boolean;
  remaining: string;
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
}: UsePrayerTimesProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [fastingTimes, setFastingTimes] = useState<FastingTimes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const localeTag = locale === "bn" ? "bn-BD" : "en-US";

  const formatTime = (date: Date) =>
    date.toLocaleTimeString(localeTag, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

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

  const calculate = useMemo(() => {
    return () => {
      if (!location) return;

      setIsLoading(true);
      setError(null);

      try {
        const coords = new Coordinates(location.latitude, location.longitude);
        const date = new Date();

        const adhan = new AdhanPrayerTimes(coords, date, calcParams);
        const sunnah = new SunnahTimes(adhan);

        const now = Date.now();

        const list = [
          // {
          //   name: "Tahajjud",
          //   nameBn: "তাহাজ্জুদ",
          //   start: adhan.tahajjud,
          //   rule: "NEXT",
          // },
          { name: "Fajr", nameBn: "ফজর", start: adhan.fajr, rule: "SUNRISE" },
          {
            name: "Sunrise",
            nameBn: "সূর্যোদয়",
            start: adhan.sunrise,
            rule: "NONE",
          },
          // {
          //   name: "Ishraq",
          //   nameBn: "ইশরাক",
          //   start: adhan.ishraq,
          //   rule: "NEXT",
          // },
          // { name: "Chasht", nameBn: "চাশত", start: adhan.chasht, rule: "NEXT" },

          { name: "Dhuhr", nameBn: "জোহর", start: adhan.dhuhr, rule: "NEXT" },
          { name: "Asr", nameBn: "আসর", start: adhan.asr, rule: "SUNSET" },
          // {
          //   name: "Sunset",
          //   nameBn: "সূর্যাস্ত",
          //   start: adhan.sunset,
          //   rule: "NONE",
          // },
          {
            name: "Maghrib",
            nameBn: "মাগরিব",
            start: adhan.maghrib,
            rule: "NEXT",
          },
          { name: "Isha", nameBn: "ইশা", start: adhan.isha, rule: "MIDNIGHT" },
        ];

        const formatted: PrayerTime[] = list.map((p, i) => {
          let endDate: Date;

          switch (p.rule) {
            case "SUNRISE":
              endDate = adhan.sunrise;
              break;
            case "SUNSET":
              endDate = adhan.maghrib;
              break;
            case "MIDNIGHT":
              endDate = sunnah.middleOfTheNight;
              break;
            case "NEXT":
              endDate =
                list[i + 1]?.start ?? new Date(p.start.getTime() + 7200000);
              break;
            default:
              endDate = new Date(p.start.getTime() + 7200000);
          }

          const ts = p.start.getTime();
          const endTs = endDate.getTime();

          let remaining = "";
          if (now < endTs) {
            const diff = endTs - now;
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            remaining = `${h}h ${m}m`;
          }

          return {
            name: p.name,
            nameBn: p.nameBn,
            time: formatTime(p.start),
            timestamp: ts,
            endTime: formatTime(endDate),
            endTimestamp: endTs,
            isCurrent: false,
            isNext: false,
            isPassed: now > endTs,
            remaining,
          };
        });

        let currentIndex = formatted.findIndex(
          (p) => now >= p.timestamp && now < p.endTimestamp
        );
        if (currentIndex === -1) currentIndex = formatted.length - 1;

        formatted[currentIndex].isCurrent = true;
        formatted[(currentIndex + 1) % formatted.length].isNext = true;

        setPrayerTimes(formatted);

        setFastingTimes({
          sehriEnd: formatted[0].time,
          iftarStart: formatted[4].time,
          isFastingTime:
            now >= formatted[0].timestamp && now < formatted[4].timestamp,
        });
      } catch (e) {
        setError(
          locale === "bn"
            ? "নামাজের সময় গণনায় ত্রুটি হয়েছে"
            : "Failed to calculate prayer times"
        );
      } finally {
        setIsLoading(false);
      }
    };
  }, [location, calcParams]);

  useEffect(() => {
    if (!location) return;
    calculate();
    const id = setInterval(calculate, 60000);
    return () => clearInterval(id);
  }, [location]);

  return { prayerTimes, fastingTimes, isLoading, error };
}
