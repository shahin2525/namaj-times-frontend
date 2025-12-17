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
      <div className="flex items-center justify-center">
        <span className="font-semibold text-green-700">🌙 {t("title")}</span>
      </div>

      <div className="mt-2 flex justify-center gap-2 text-gray-700">
        <span>
          {t("sehriEnds")}: <strong>{fastingTimes.sehriEnd}</strong>
        </span>

        <span>
          {t("iftar")}: <strong>{fastingTimes.iftarStart}</strong>
        </span>
        {isToday && fastingTimes.timeUntilIftar && (
          <div className="text-green-700 font-medium ">
            {t("iftarIn")} {fastingTimes.timeUntilIftar}
          </div>
        )}
      </div>
    </div>
  );
}
