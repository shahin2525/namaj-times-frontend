"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CalculationMethodType } from "@/hooks/usePrayerTimes";
import { useWeeklyPrayerTimes } from "@/hooks/useWeeklyPrayerTimes";
import PrayerCard from "@/components/prayer/PrayerCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useLocation } from "@/hooks/useLocation";

export default function WeeklyPrayerTimes() {
  const t = useTranslations("WeeklyPrayerTimes");
  const locale = useLocale();
  const { location, isLoading: locationLoading } = useLocation();

  const [calculationMethod, setCalculationMethod] =
    useState<CalculationMethodType>("BD-DS");
  const [asrMethod, setAsrMethod] = useState<"Standard" | "Hanafi">("Standard");

  const prayerConfig = useMemo(
    () => ({
      location,
      locale: locale as "en" | "bn" | "hi",
      method: calculationMethod,
      asrMethod: asrMethod,
      days: 7,
    }),
    [location, locale, calculationMethod, asrMethod]
  );

  const {
    weeklyPrayerTimes,
    isLoading: prayerLoading,
    error,
  } = useWeeklyPrayerTimes(prayerConfig);

  const calculationMethodOptions = useMemo(
    () => [
      { value: "BD-DS", label: t("calcMethod.bd_ds") },
      { value: "BD-UA", label: t("calcMethod.bd_ua") },
      { value: "MWL", label: t("calcMethod.mwl") },
      { value: "Karachi", label: t("calcMethod.karachi") },
    ],
    [t]
  );

  const asrMethodOptions = useMemo(
    () => [
      { value: "Standard", label: t("asrMethods.standard") },
      { value: "Hanafi", label: t("asrMethods.hanafi") },
    ],
    [t]
  );

  const handleCalculationMethodChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCalculationMethod(e.target.value as CalculationMethodType);
    },
    []
  );

  const handleAsrMethodChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setAsrMethod(e.target.value as "Standard" | "Hanafi");
    },
    []
  );

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  if (locationLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Settings Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="font-semibold mb-4 text-xl text-gray-800">
            {t("settings.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                {t("calcMethod.main")}
              </label>
              <select
                value={calculationMethod}
                onChange={handleCalculationMethodChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green focus:border-transparent transition"
              >
                {calculationMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                {t("asrMethods.heading")}
              </label>
              <select
                value={asrMethod}
                onChange={handleAsrMethodChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green focus:border-transparent transition"
              >
                {asrMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {location && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-medium">{t("location")}:</span>{" "}
                {location.city}, {location.country}
              </p>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8 bg-red-50 rounded-2xl mb-8">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-islamic-green text-white rounded-lg hover:bg-green-700 transition"
            >
              {t("retry")}
            </button>
          </div>
        )}

        {/* Loading State */}
        {prayerLoading ? (
          <div className="grid gap-6">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-6 animate-pulse"
              >
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(11)].map((_, j) => (
                    <div key={j} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Weekly Prayer Times Display */
          <div className="space-y-8">
            {weeklyPrayerTimes.map((day, dayIndex) => (
              <div
                key={day.date.toISOString()}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
                {/* Day Header */}
                <div
                  className={`
                  p-6 border-b
                  ${
                    dayIndex === 0
                      ? "bg-gradient-to-r from-islamic-green to-green-600 text-white"
                      : "bg-gray-50 text-gray-800"
                  }
                `}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{day.dayName}</h3>
                      <p className="mt-1 opacity-90">{day.englishDate}</p>
                    </div>
                    <div className="mt-3 sm:mt-0 text-right">
                      <p className="text-lg font-semibold">{day.hijriDate}</p>
                      {day.fastingTimes && (
                        <div className="mt-2 text-sm">
                          <p>
                            {locale === "bn" ? "রোজার সময়" : "Fasting Times"}:
                            {day.fastingTimes.sehriEnd} -{" "}
                            {day.fastingTimes.iftarStart}
                          </p>
                          {dayIndex === 0 &&
                            day.fastingTimes.timeUntilIftar && (
                              <p className="mt-1">
                                {locale === "bn"
                                  ? "ইফতার পর্যন্ত"
                                  : "Until Iftar"}
                                : {day.fastingTimes.timeUntilIftar}
                              </p>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Prayer Times Grid */}
                <div className="p-6">
                  <div className="grid gap-4">
                    {day.prayerTimes.map((prayer) => (
                      <PrayerCard
                        key={`${day.date.toISOString()}-${prayer.key}`}
                        prayer={prayer}
                        isCurrent={prayer.isCurrent}
                        isNext={prayer.isNext}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Information */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p className="mb-2">
            <span className="font-medium">{t("lastUpdated")}:</span>{" "}
            {new Date().toLocaleTimeString(
              locale === "bn" ? "bn-BD" : "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </p>
          <p className="text-sm">{t("disclaimer")}</p>
        </footer>
      </div>
    </div>
  );
}
