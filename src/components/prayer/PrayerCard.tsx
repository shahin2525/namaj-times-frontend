// "use client";
// import type { PrayerTimesResponse } from "@/types";

// export default function PrayerCard({ data }: { data: PrayerTimesResponse }) {
//   const { times, date, location } = data;
//   return (
//     <div className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow rounded-lg p-6">
//       <div className="mb-4">
//         <div className="text-sm text-muted-foreground">
//           {location?.name || "Current Location"}
//         </div>
//         <div className="text-2xl font-semibold">{date}</div>
//       </div>

//       <ul className="space-y-3">
//         {Object.entries(times).map(([k, v]) => (
//           <li key={k} className="flex justify-between">
//             <span className="capitalize">{k}</span>
//             <span className="font-medium">{v}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";

interface PrayerTime {
  name: string;
  time: string;
  isCurrent: boolean;
  isNext: boolean;
}

interface PrayerCardProps {
  prayer: PrayerTime;
  isCurrent: boolean;
  isNext: boolean;
}

export default function PrayerCard({
  prayer,
  isCurrent,
  isNext,
}: PrayerCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border transition-colors ${
        isCurrent
          ? "bg-islamic-green text-white border-islamic-green"
          : isNext
          ? "bg-green-50 border-green-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg">{prayer.name}</span>
          {isCurrent && (
            <span className="px-2 py-1 text-xs bg-white text-islamic-green rounded-full font-medium">
              Current
            </span>
          )}
          {isNext && !isCurrent && (
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
              Next
            </span>
          )}
        </div>
        <span className="text-xl font-bold">{prayer.time}</span>
      </div>
    </div>
  );
}
