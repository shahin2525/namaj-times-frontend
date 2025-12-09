// // components/prayer/PrayerTimes.tsx

"use client";
import { useState, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePrayerTimes, CalculationMethodType } from "@/hooks/usePrayerTimes";
import PrayerCard from "./PrayerCard";
import FastingTimes from "./FastingTimes";
import LoadingSpinner from "../ui/LoadingSpinner";
import { validateLocale } from "@/utils/locale";
import { useLocation } from "@/hooks/useLocation";

export default function PrayerTimes() {
  const t = useTranslations("PrayerTimes");
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
    }),
    [location, locale, calculationMethod, asrMethod]
  );

  const {
    prayerTimes,
    fastingTimes,
    isLoading: prayerLoading,
    error,
  } = usePrayerTimes(prayerConfig);

  const calculationMethodOptions = useMemo(
    () => [
      {
        value: "BD-DS",
        label: t("calcMethod.bd_ds"),
      },
      {
        value: "BD-UA",
        label: t("calcMethod.bd_ua"),
      },
      {
        value: "MWL",
        label: t("calcMethod.mwl"),
      },
      {
        value: "Karachi",
        label: t("calcMethod.karachi"),
      },
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

  const lastUpdatedTime = useMemo(
    () =>
      new Date().toLocaleTimeString(locale === "bn" ? "bn-BD" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    [locale]
  );

  if (locationLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: t("seo.name"),
            description: t("seo.description"),
            applicationCategory: "ReligiousApplication",
            operatingSystem: "All",
            permissions: "geolocation",
          }),
        }}
      />

      <section className="max-w-4xl mx-auto w-full pt-5">
        {fastingTimes && (
          <FastingTimes fastingTimes={fastingTimes} locale={locale} />
        )}

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 pt-5 pb-5">
            {t("title")}
          </h1>

          <section className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="font-semibold mb-3 text-lg sm:text-xl text-gray-800">
              {t("calcMethod.heading")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t("calcMethod.main")}
                </label>
                <select
                  value={calculationMethod}
                  onChange={handleCalculationMethodChange}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-md"
                >
                  {calculationMethodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t("asrMethods.heading")}
                </label>
                <select
                  value={asrMethod}
                  onChange={handleAsrMethodChange}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-md"
                >
                  {asrMethodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="mb-6">
            {prayerLoading ? (
              <div className="grid gap-3 sm:gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="skeleton h-16 sm:h-20 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-red-600 text-base sm:text-lg mb-4">
                  {error}
                </p>
                <button
                  onClick={handleRetry}
                  className="mt-4 px-6 py-3 bg-islamic-green text-white rounded-lg"
                >
                  {t("retry")}
                </button>
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-4">
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
            {/* //   // locale={validateLocale(locale)} // isPassed={prayer.isPassed}
                    // index={index} */}
          </section>

          <footer className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600 space-y-2">
            <p>
              <span className="font-medium">{t("lastUpdated")}:</span>{" "}
              <time>{lastUpdatedTime}</time>
            </p>
            {location && (
              <p>
                <span className="font-medium">{t("location")}:</span>{" "}
                {location.city}, {location.country}
              </p>
            )}
          </footer>
        </div>
      </section>
    </>
  );
}
