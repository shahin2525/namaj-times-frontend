// src/hooks/usePrayerTimes.ts
// import { useState, useEffect } from "react";
// import { PrayerTime, LocationData } from "@/types";
// import { calculatePrayerTimes } from "@/lib/prayer-calculations";

// export function usePrayerTimes(location: LocationData | null) {
//   const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!location) {
//       setIsLoading(false);
//       return;
//     }

//     const updatePrayerTimes = () => {
//       try {
//         setIsLoading(true);
//         const times = calculatePrayerTimes(
//           new Date(),
//           location.lat,
//           location.lng
//         );
//         const formattedTimes: PrayerTime[] = Object.entries(times).map(
//           ([name, time]) => ({
//             name: name.charAt(0).toUpperCase() + name.slice(1),
//             time,
//             timestamp: new Date(
//               `${new Date().toDateString()} ${time}`
//             ).getTime(),
//           })
//         );

//         // Mark current and next prayers
//         const now = new Date();
//         const currentTime = now.getTime();

//         const updatedTimes = formattedTimes.map((prayer, index, array) => {
//           const isCurrent =
//             currentTime >= prayer.timestamp &&
//             (index === array.length - 1 ||
//               currentTime < array[index + 1]?.timestamp);
//           const isNext =
//             !isCurrent &&
//             currentTime < prayer.timestamp &&
//             (index === 0 || currentTime >= array[index - 1]?.timestamp);

//           return { ...prayer, isCurrent, isNext };
//         });

//         setPrayerTimes(updatedTimes);
//         setError(null);
//       } catch (err) {
//         setError(
//           err instanceof Error
//             ? err.message
//             : "Failed to calculate prayer times"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     updatePrayerTimes();

//     // Update every minute
//     const interval = setInterval(updatePrayerTimes, 60000);
//     return () => clearInterval(interval);
//   }, [location]);

//   return { prayerTimes, isLoading, error };
// }
// src/hooks/usePrayerTimes.ts
"use client";

import { useState, useEffect } from "react";
import { Location } from "./useLocation";

export interface PrayerTime {
  name: string;
  time: string;
  isCurrent: boolean;
  isNext: boolean;
}

export function usePrayerTimes(location: Location | null) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchPrayerTimes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // This is a mock implementation - replace with your actual API call
        const mockPrayerTimes: PrayerTime[] = [
          { name: "Fajr", time: "05:30", isCurrent: false, isNext: true },
          { name: "Sunrise", time: "06:45", isCurrent: false, isNext: false },
          { name: "Dhuhr", time: "12:15", isCurrent: true, isNext: false },
          { name: "Asr", time: "15:45", isCurrent: false, isNext: false },
          { name: "Maghrib", time: "18:20", isCurrent: false, isNext: false },
          { name: "Isha", time: "19:35", isCurrent: false, isNext: false },
        ];

        setPrayerTimes(mockPrayerTimes);
      } catch (err) {
        setError("Failed to fetch prayer times");
        console.error("Error fetching prayer times:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [location]);

  return {
    prayerTimes,
    isLoading,
    error,
  };
}
