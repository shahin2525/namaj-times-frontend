// // components/PrayerTimes.tsx
// 'use client';
// import { useState, useEffect } from 'react';

// interface PrayerTime {
//   name: string;
//   time: string;
//   isCurrent?: boolean;
// }

// export default function PrayerTimes() {
//   const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
//   const [location, setLocation] = useState('Loading...');
//   const [hijriDate, setHijriDate] = useState('');

//   useEffect(() => {
//     loadPrayerTimes();
//   }, []);

//   const loadPrayerTimes = async () => {
//     try {
//       // Get user location
//       const coords = await getCurrentLocation();
//       const city = await getCityName(coords.lat, coords.lng);
//       setLocation(city);

//       // Calculate prayer times
//       const times = calculatePrayerTimes(new Date(), coords.lat, coords.lng);

//       const formattedTimes: PrayerTime[] = [
//         { name: 'Fajr', time: times.fajr },
//         { name: 'Sunrise', time: times.sunrise },
//         { name: 'Dhuhr', time: times.dhuhr },
//         { name: 'Asr', time: times.asr },
//         { name: 'Maghrib', time: times.maghrib },
//         { name: 'Isha', time: times.isha }
//       ];

//       setPrayerTimes(formattedTimes);
//     } catch (error) {
//       console.error('Error loading prayer times:', error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-green-800 mb-2">Prayer Times</h1>
//         <p className="text-gray-600">{location}</p>
//         <p className="text-gray-600">{hijriDate}</p>
//       </div>

//       <div className="grid gap-4">
//         {prayerTimes.map((prayer, index) => (
//           <div
//             key={prayer.name}
//             className={`p-4 rounded-lg border-2 ${
//               prayer.isCurrent
//                 ? 'border-green-500 bg-green-50'
//                 : 'border-gray-200'
//             }`}
//           >
//             <div className="flex justify-between items-center">
//               <span className="text-lg font-semibold">{prayer.name}</span>
//               <span className="text-xl font-bold">{prayer.time}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// src/components/prayer/PrayerTimes.tsx
"use client";
import { useState, useEffect } from "react";
import PrayerCard from "./PrayerCard";
import LocationSelector from "../location/LocationSelector";
import LoadingSpinner from "../ui/LoadingSpinner";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useLocation } from "@/hooks/useLocation";

export default function PrayerTimes() {
  const { location, setLocation, isLoading: locationLoading } = useLocation();
  const {
    prayerTimes,
    isLoading: prayerLoading,
    error,
  } = usePrayerTimes(location);

  if (locationLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Location Selector */}
        <div className="mb-6">
          <LocationSelector
            location={location}
            onLocationChange={setLocation}
          />
        </div>

        {/* Prayer Times Grid */}
        {prayerLoading ? (
          <div className="grid gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-lg"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <p>Error loading prayer times: {error}</p>
          </div>
        ) : (
          <div className="grid gap-3 md:gap-4">
            {prayerTimes?.map((prayer, index) => (
              <PrayerCard
                key={prayer.name}
                prayer={prayer}
                isCurrent={prayer.isCurrent}
                isNext={prayer.isNext}
              />
            ))}
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </section>
  );
}
