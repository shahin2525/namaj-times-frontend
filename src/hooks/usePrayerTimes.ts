// "use client";
// import { useEffect, useState } from "react";
// import { fetchPrayerTimes } from "@/lib/api";
// import type { PrayerTimesResponse } from "@/types";

// export default function usePrayerTimes(location?: {
//   lat: number;
//   lng: number;
// }) {
//   const [data, setData] = useState<PrayerTimesResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     fetchPrayerTimes(location)
//       .then((d) => {
//         if (mounted) setData(d);
//       })
//       .catch((e) => {
//         if (mounted) setError(String(e));
//       })
//       .finally(() => {
//         if (mounted) setLoading(false);
//       });
//     return () => {
//       mounted = false;
//     };
//   }, [location?.lat, location?.lng]);

//   return { data, loading, error };
// }

// "use client";
// import { useEffect, useState } from "react";
// import { fetchPrayerTimes } from "@/lib/api";
// import type { PrayerTimesResponse } from "@/types";

// export default function usePrayerTimes(location?: {
//   lat: number;
//   lng: number;
// }) {
//   const [data, setData] = useState<PrayerTimesResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!location) return;

//     let isMounted = true;

//     const getPrayerTimes = async () => {
//       setLoading(true); // ✅ called inside async function
//       try {
//         const d = await fetchPrayerTimes(location);
//         if (isMounted) setData(d);
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       } catch (e: any) {
//         if (isMounted) setError(String(e));
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     getPrayerTimes();

//     return () => {
//       isMounted = false;
//     };
//   }, [location?.lat, location?.lng]);

//   return { data, loading, error };
// }
// src/hooks/usePrayerTimes.ts
import { useState, useEffect } from "react";
import { PrayerTime, LocationData } from "@/types";
import { calculatePrayerTimes } from "@/lib/prayer-calculations";

export function usePrayerTimes(location: LocationData | null) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) {
      setIsLoading(false);
      return;
    }

    const updatePrayerTimes = () => {
      try {
        setIsLoading(true);
        const times = calculatePrayerTimes(
          new Date(),
          location.lat,
          location.lng
        );
        const formattedTimes: PrayerTime[] = Object.entries(times).map(
          ([name, time]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            time,
            timestamp: new Date(
              `${new Date().toDateString()} ${time}`
            ).getTime(),
          })
        );

        // Mark current and next prayers
        const now = new Date();
        const currentTime = now.getTime();

        const updatedTimes = formattedTimes.map((prayer, index, array) => {
          const isCurrent =
            currentTime >= prayer.timestamp &&
            (index === array.length - 1 ||
              currentTime < array[index + 1]?.timestamp);
          const isNext =
            !isCurrent &&
            currentTime < prayer.timestamp &&
            (index === 0 || currentTime >= array[index - 1]?.timestamp);

          return { ...prayer, isCurrent, isNext };
        });

        setPrayerTimes(updatedTimes);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to calculate prayer times"
        );
      } finally {
        setIsLoading(false);
      }
    };

    updatePrayerTimes();

    // Update every minute
    const interval = setInterval(updatePrayerTimes, 60000);
    return () => clearInterval(interval);
  }, [location]);

  return { prayerTimes, isLoading, error };
}
