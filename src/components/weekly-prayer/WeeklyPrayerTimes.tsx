"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CalculationMethodType } from "@/hooks/usePrayerTimes";
import { useWeeklyPrayerTimes } from "@/hooks/useWeeklyPrayerTimes";
import { useLocation } from "@/hooks/useLocation";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StickySettings from "./StickySettings";
import DayPrayerCard from "./DayPrayerCard";

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
      asrMethod,
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

  /* -------------------- STATES -------------------- */

  if (locationLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-islamic-green text-white rounded-lg"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t("title")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("subtitle")}</p>
        </header>

        {/* Sticky Settings */}
        <StickySettings
          calculationMethod={calculationMethod}
          asrMethod={asrMethod}
          onCalcChange={handleCalculationMethodChange}
          onAsrChange={handleAsrMethodChange}
          calcOptions={calculationMethodOptions}
          asrOptions={asrMethodOptions}
          t={t}
        />

        {/* Location */}
        {location && (
          <p className="text-center text-sm text-gray-600 mb-6">
            {t("location")}: {location.city}, {location.country}
          </p>
        )}

        {/* Loading */}
        {prayerLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-5">
            {weeklyPrayerTimes.map((day, index) => (
              <DayPrayerCard
                key={day.date.toISOString()}
                day={day}
                isToday={index === 0}
                locale={locale}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            {t("lastUpdated")}:{" "}
            {new Date().toLocaleTimeString(
              locale === "bn" ? "bn-BD" : "en-US",
              { hour: "2-digit", minute: "2-digit" }
            )}
          </p>
          <p className="mt-1">{t("disclaimer")}</p>
        </footer>
      </div>
    </div>
  );
}
