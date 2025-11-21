// components/ForbiddenTimes.tsx

"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, Clock } from "lucide-react";

export default function ForbiddenTimesCard() {
  const t = useTranslations("Forbidden");
  const items = t.raw("items") as {
    period: string;
    duration: string;
    reason: string;
  }[];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 my-12">
      {/* Extra responsive padding */}
      <div className="h-6" />
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-red-700 mb-10 flex items-center gap-3 justify-center text-center">
        <AlertTriangle className="w-7 h-7" />
        {t("title")}
      </h2>
      <div className="h-3" />
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-5 border rounded-xl bg-red-50 border-red-200 shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold text-red-800 mb-2 text-center">
              {item.period}
            </h3>

            <div className="text-gray-700 space-y-1 text-center">
              <p className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                <strong>{t("duration")}:</strong> {item.duration}
              </p>

              <p className="text-sm text-gray-600">
                <strong>{t("reason")}:</strong> {item.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="h-3" />
      <div className="my-10 p-5 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> {t("note")}
        </p>
      </div>
      <div className="h-3" />
    </div>
  );
}
