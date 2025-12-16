// "use client";

// interface Props {
//   fastingTimes: {
//     sehriEnd: string;
//     iftarStart: string;
//     timeUntilIftar?: string;
//   };
//   isToday: boolean;
//   locale: string;
// }

// export default function RamadanBadge({ fastingTimes, isToday, locale }: Props) {
//   return (
//     <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm">
//       <div className="flex items-center justify-between">
//         <span className="font-semibold text-green-700">
//           🌙 {locale === "bn" ? "রমজান" : "Ramadan"}
//         </span>

//         {isToday && fastingTimes.timeUntilIftar && (
//           <span className="text-green-700 font-medium">
//             {locale === "bn" ? "ইফতার বাকি" : "Iftar in"}{" "}
//             {fastingTimes.timeUntilIftar}
//           </span>
//         )}
//       </div>

//       <div className="mt-2 flex justify-between text-gray-700">
//         <span>
//           {locale === "bn" ? "সেহরি শেষ" : "Sehri Ends"}:{" "}
//           <strong>{fastingTimes.sehriEnd}</strong>
//         </span>
//         <span>
//           {locale === "bn" ? "ইফতার" : "Iftar"}:{" "}
//           <strong>{fastingTimes.iftarStart}</strong>
//         </span>
//       </div>
//     </div>
//   );
// }
"use client";

import { useTranslations } from "next-intl";

interface Props {
  fastingTimes: {
    sehriEnd: string;
    iftarStart: string;
    timeUntilIftar?: string;
  };
  isToday: boolean;
}

export default function RamadanBadge({ fastingTimes, isToday }: Props) {
  const t = useTranslations("WeeklyPrayerTimes.ramadan");

  return (
    <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-green-700">🌙 {t("title")}</span>

        {isToday && fastingTimes.timeUntilIftar && (
          <span className="text-green-700 font-medium">
            {t("iftarIn")} {fastingTimes.timeUntilIftar}
          </span>
        )}
      </div>

      <div className="mt-2 flex justify-between text-gray-700">
        <span>
          {t("sehriEnds")}: <strong>{fastingTimes.sehriEnd}</strong>
        </span>
        <span>
          {t("iftar")}: <strong>{fastingTimes.iftarStart}</strong>
        </span>
      </div>
    </div>
  );
}
