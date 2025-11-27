// // components/prayer/PrayerCard.tsx
// "use client";
// import { PrayerTime } from "@/hooks/usePrayerTimes";

// interface PrayerCardProps {
//   prayer: PrayerTime;
//   locale: "en" | "bn";
//   isCurrent: boolean;
//   isNext: boolean;
//   isPassed: boolean;
//   index: number;
// }

// export default function PrayerCard({
//   prayer,
//   locale,
//   isCurrent,
//   isNext,
//   isPassed,
//   index,
// }: PrayerCardProps) {
//   // Get prayer name based on locale
//   const prayerName = locale === "bn" ? prayer.nameBn : prayer.name;

//   // Status text based on locale
//   const statusText = isCurrent
//     ? locale === "bn"
//       ? "বর্তমান"
//       : "Current"
//     : isNext
//     ? locale === "bn"
//       ? "পরবর্তী"
//       : "Next"
//     : "";

//   return (
//     <div
//       className={`
//       relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02]
//       ${
//         isCurrent
//           ? "border-green-500 bg-green-50 shadow-lg"
//           : isNext
//           ? "border-blue-400 bg-blue-50"
//           : isPassed
//           ? "border-gray-200 bg-gray-50 opacity-75"
//           : "border-gray-200 bg-white"
//       }
//     `}
//     >
//       {/* Prayer Indicator */}
//       <div
//         className={`
//         absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full
//         ${
//           isCurrent
//             ? "bg-green-500 animate-pulse"
//             : isNext
//             ? "bg-blue-400"
//             : "bg-gray-300"
//         }
//       `}
//       ></div>

//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           {/* Prayer Icon/Number */}
//           <div
//             className={`
//             w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white
//             ${
//               isCurrent
//                 ? "bg-green-500"
//                 : isNext
//                 ? "bg-blue-400"
//                 : isPassed
//                 ? "bg-gray-400"
//                 : "bg-islamic-green"
//             }
//           `}
//           >
//             {index + 1}
//           </div>

//           {/* Prayer Name */}
//           <div>
//             <h3
//               className={`font-semibold text-lg ${
//                 isCurrent
//                   ? "text-green-700"
//                   : isNext
//                   ? "text-blue-700"
//                   : isPassed
//                   ? "text-gray-500"
//                   : "text-gray-800"
//               }`}
//             >
//               {prayerName}
//             </h3>
//             {statusText && (
//               <span
//                 className={`
//                 text-xs font-medium px-2 py-1 rounded-full
//                 ${
//                   isCurrent
//                     ? "bg-green-100 text-green-800"
//                     : "bg-blue-100 text-blue-800"
//                 }
//               `}
//               >
//                 {statusText}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Prayer Time */}
//         <div
//           className={`
//           text-2xl font-bold
//           ${
//             isCurrent
//               ? "text-green-600"
//               : isNext
//               ? "text-blue-600"
//               : isPassed
//               ? "text-gray-400"
//               : "text-islamic-green"
//           }
//         `}
//         >
//           {prayer.time}
//         </div>
//       </div>

//       {/* Progress bar for current prayer */}
//       {isCurrent && (
//         <div className="mt-3 w-full bg-green-200 rounded-full h-1">
//           <div
//             className="bg-green-500 h-1 rounded-full animate-pulse"
//             style={{ width: "50%" }} // You can calculate actual progress
//           ></div>
//         </div>
//       )}
//     </div>
//   );
// }
// components/prayer/PrayerCard.tsx
"use client";
import { PrayerTime } from "@/hooks/usePrayerTimes";

interface PrayerCardProps {
  prayer: PrayerTime;
  locale: "en" | "bn";
  isCurrent: boolean;
  isNext: boolean;
  isPassed: boolean;
  index: number;
}

export default function PrayerCard({
  prayer,
  locale,
  isCurrent,
  isNext,
  isPassed,
  index,
}: PrayerCardProps) {
  const prayerName = locale === "bn" ? prayer.nameBn : prayer.name;

  const statusText = isCurrent
    ? locale === "bn"
      ? "বর্তমান"
      : "Current"
    : isNext
    ? locale === "bn"
      ? "পরবর্তী"
      : "Next"
    : "";

  return (
    <div
      className={`
      relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02]
      ${
        isCurrent
          ? "border-green-500 bg-green-100 shadow-lg" // Green for current
          : isNext
          ? "border-yellow-400 bg-yellow-50" // Yellow for next
          : isPassed
          ? "border-gray-200 bg-gray-50 opacity-60"
          : "border-gray-200 bg-white"
      }
    `}
    >
      {/* Prayer Indicator */}
      <div
        className={`
        absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full
        ${
          isCurrent
            ? "bg-green-500 animate-pulse"
            : isNext
            ? "bg-yellow-400"
            : "bg-gray-300"
        }
      `}
      ></div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Prayer Icon/Number */}
          <div
            className={`
            w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white
            ${
              isCurrent
                ? "bg-green-500"
                : isNext
                ? "bg-yellow-500"
                : isPassed
                ? "bg-gray-400"
                : "bg-islamic-green"
            }
          `}
          >
            {index + 1}
          </div>

          {/* Prayer Name */}
          <div>
            <h3
              className={`font-semibold text-lg ${
                isCurrent
                  ? "text-green-800"
                  : isNext
                  ? "text-yellow-800"
                  : isPassed
                  ? "text-gray-500"
                  : "text-gray-800"
              }`}
            >
              {prayerName}
            </h3>
            {statusText && (
              <span
                className={`
                text-xs font-medium px-2 py-1 rounded-full
                ${
                  isCurrent
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }
              `}
              >
                {statusText}
              </span>
            )}
          </div>
        </div>

        {/* Prayer Time */}
        <div
          className={`
          text-2xl font-bold
          ${
            isCurrent
              ? "text-green-700"
              : isNext
              ? "text-yellow-700"
              : isPassed
              ? "text-gray-400"
              : "text-islamic-green"
          }
        `}
        >
          {/* {prayer.time} */}
          {prayer.time} - {prayer.endTime}
          {isCurrent && (
            <p className="text-green-600 font-semibold text-sm mt-1">
              {locale === "bn" ? "সময় বাকি" : "Time Remaining"}:
              {prayer.remaining}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar for current prayer */}
      {isCurrent && (
        <div className="mt-3 w-full bg-green-200 rounded-full h-1">
          <div
            className="bg-green-500 h-1 rounded-full animate-pulse"
            style={{ width: "50%" }}
          ></div>
        </div>
      )}
    </div>
  );
}
