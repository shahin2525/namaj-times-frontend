// components/prayer/PrayerTimes.tsx
"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePrayerTimes, CalculationMethod } from "@/hooks/usePrayerTimes";
import { useLocation } from "@/hooks/useLocation";
import PrayerCard from "./PrayerCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import { validateLocale } from "@/lib/utils";

export default function PrayerTimes() {
  const locale = useLocale(); // Get current locale from next-intl
  const { location, isLoading: locationLoading } = useLocation();
  const [calculationMethod, setCalculationMethod] =
    useState<CalculationMethod>("BD-DS");
  const [asrMethod, setAsrMethod] = useState<"Standard" | "Hanafi">("Standard");

  const {
    prayerTimes,
    isLoading: prayerLoading,
    error,
  } = usePrayerTimes({
    location,
    locale: locale as "en" | "bn", // Pass locale to hook
    method: calculationMethod,
    asrMethod: asrMethod,
  });

  const t = useTranslations("Prayer");
  const commonT = useTranslations("Common");

  if (locationLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Calculation Method Selector */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">
            {locale === "bn" ? "গণনা পদ্ধতি" : "Calculation Method"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {locale === "bn" ? "প্রধান পদ্ধতি" : "Main Method"}
              </label>
              <select
                value={calculationMethod}
                onChange={(e) =>
                  setCalculationMethod(e.target.value as CalculationMethod)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="BD-DS">
                  {locale === "bn"
                    ? "বাংলাদেশ ইসলামিক ফাউন্ডেশন"
                    : "Bangladesh Islamic Foundation"}
                </option>
                <option value="BD-UA">
                  {locale === "bn"
                    ? "ইসলামিক ইউনিভার্সিটি, করাচি"
                    : "Islamic University, Karachi"}
                </option>
                <option value="MWL">
                  {locale === "bn"
                    ? "মুসলিম ওয়ার্ল্ড লীগ"
                    : "Muslim World League"}
                </option>
                <option value="Karachi">
                  {locale === "bn"
                    ? "করাচি বিশ্ববিদ্যালয়"
                    : "University of Karachi"}
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {locale === "bn" ? "আসর পদ্ধতি" : "Asr Method"}
              </label>
              <select
                value={asrMethod}
                onChange={(e) =>
                  setAsrMethod(e.target.value as "Standard" | "Hanafi")
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Standard">
                  {locale === "bn" ? "শাফেয়ী/হাম্বলী" : "Shafi'i/Hanbali"}
                </option>
                <option value="Hanafi">
                  {locale === "bn" ? "হানাফী" : "Hanafi"}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Prayer Times Display */}
        {prayerLoading ? (
          <div className="grid gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-lg"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-islamic-green text-white rounded-lg"
            >
              {locale === "bn" ? "পুনরায় চেষ্টা করুন" : "Try Again"}
            </button>
          </div>
        ) : (
          <div className="grid gap-3 md:gap-4">
            {prayerTimes?.map((prayer, index) => (
              <PrayerCard
                key={prayer.name}
                prayer={prayer}
                // locale={locale}
                locale={validateLocale(locale)}
                isCurrent={prayer.isCurrent}
                isNext={prayer.isNext}
                isPassed={prayer.isPassed}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Last Updated & Location Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            {locale === "bn" ? "সর্বশেষ আপডেট" : "Last updated"}:{" "}
            {new Date().toLocaleTimeString(locale === "bn" ? "bn-BD" : "en-US")}
          </p>
          {location && (
            <p className="mt-1">
              {locale === "bn" ? "অবস্থান" : "Location"}: {location.city},{" "}
              {location.country}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
