// src/components/prayer/FastingTimes.tsx
"use client";
import { useTranslations } from "next-intl";
import { FastingTimes as FastingTimesType } from "@/hooks/usePrayerTimes";

interface FastingTimesProps {
  fastingTimes: FastingTimesType;
  locale: string;
}

export default function FastingTimes({
  fastingTimes,
  locale,
}: FastingTimesProps) {
  const t = useTranslations("Prayer");

  if (!fastingTimes?.sehriEnd || !fastingTimes?.iftarStart) {
    return null;
  }

  return (
    <section
      className="max-w-4xl mx-auto mb-8 pt-4"
      aria-labelledby="fasting-times-heading"
    >
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
        <h2
          id="fasting-times-heading"
          className="text-2xl font-bold mb-4 text-center"
        >
          {locale === "bn" ? "রোজার সময়সূচী" : "Fasting Schedule"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sehri Time */}
          <div
            className={`text-center p-4 rounded-xl transition-all duration-300 ${
              fastingTimes.isFastingTime
                ? "bg-yellow-500 text-gray-800 shadow-lg"
                : "bg-white/20"
            }`}
          >
            <h3 className="font-semibold text-lg mb-2">
              {locale === "bn" ? "সেহরি শেষ" : "Sehri Ends"}
            </h3>
            <div className="text-3xl font-bold">{fastingTimes.sehriEnd}</div>
            <p className="text-sm mt-2 opacity-90">
              {locale === "bn" ? "ফজরের আগ পর্যন্ত" : "Until Fajr"}
            </p>
          </div>

          {/* Iftar Time */}
          <div
            className={`text-center p-4 rounded-xl transition-all duration-300 ${
              !fastingTimes.isFastingTime
                ? "bg-green-400 text-white shadow-lg"
                : "bg-white/20"
            }`}
          >
            <h3 className="font-semibold text-lg mb-2">
              {locale === "bn" ? "ইফতার শুরু" : "Iftar Starts"}
            </h3>
            <div className="text-3xl font-bold">{fastingTimes.iftarStart}</div>
            <p className="text-sm mt-2 opacity-90">
              {locale === "bn" ? "মাগরিবের সময়" : "At Maghrib time"}
            </p>
          </div>
        </div>

        {/* Current Fasting Status */}
        <div className="mt-4 text-center">
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              fastingTimes.isFastingTime
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                fastingTimes.isFastingTime ? "bg-yellow-500" : "bg-green-500"
              }`}
            ></span>
            {fastingTimes.isFastingTime
              ? locale === "bn"
                ? "রোজা চলমান"
                : "Fasting in progress"
              : locale === "bn"
              ? "রোজা নেই"
              : "Not fasting time"}
          </span>
        </div>
      </div>
    </section>
  );
}
