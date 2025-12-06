// // components/prayer/PrayerTimes.tsx
// "use client";
// import { useState, useMemo, useCallback } from "react";
// import { useTranslations, useLocale } from "next-intl";
// import { usePrayerTimes, CalculationMethodType } from "@/hooks/usePrayerTimes";
// // import { useLocation } from "@/hooks/useLocation";
// import PrayerCard from "./PrayerCard";
// import FastingTimes from "./FastingTimes";
// import LoadingSpinner from "../ui/LoadingSpinner";
// import { validateLocale } from "@/utils/locale";
// import { useLocation } from "@/hooks/useLocation";
// // import { useLocation3 } from "@/hooks/useLocation3";

// export default function PrayerTimes() {
//   const locale = useLocale();
//   const { location, isLoading: locationLoading } = useLocation();
//   const [calculationMethod, setCalculationMethod] =
//     useState<CalculationMethodType>("BD-DS");
//   const [asrMethod, setAsrMethod] = useState<"Standard" | "Hanafi">("Standard");

//   // Memoized prayer times configuration
//   const prayerConfig = useMemo(
//     () => ({
//       location,
//       locale: locale as "en" | "bn",
//       method: calculationMethod,
//       asrMethod: asrMethod,
//     }),
//     [location, locale, calculationMethod, asrMethod]
//   );

//   const {
//     prayerTimes,
//     fastingTimes,
//     isLoading: prayerLoading,
//     error,
//   } = usePrayerTimes(prayerConfig);

//   // Memoized calculation method options
//   const calculationMethodOptions = useMemo(
//     () => [
//       {
//         value: "BD-DS",
//         en: "Bangladesh Islamic Foundation",
//         bn: "বাংলাদেশ ইসলামিক ফাউন্ডেশন",
//       },
//       {
//         value: "BD-UA",
//         en: "Islamic University, Karachi",
//         bn: "ইসলামিক ইউনিভার্সিটি, করাচি",
//       },
//       { value: "MWL", en: "Muslim World League", bn: "মুসলিম ওয়ার্ল্ড লীগ" },
//       {
//         value: "Karachi",
//         en: "University of Karachi",
//         bn: "করাচি বিশ্ববিদ্যালয়",
//       },
//     ],
//     []
//   );

//   // Memoized Asr method options
//   const asrMethodOptions = useMemo(
//     () => [
//       { value: "Standard", en: "Shafi'i/Hanbali", bn: "শাফেয়ী/হাম্বলী" },
//       { value: "Hanafi", en: "Hanafi", bn: "হানাফী" },
//     ],
//     []
//   );

//   // Optimized event handlers
//   const handleCalculationMethodChange = useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       setCalculationMethod(e.target.value as CalculationMethodType);
//     },
//     []
//   );

//   const handleAsrMethodChange = useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       setAsrMethod(e.target.value as "Standard" | "Hanafi");
//     },
//     []
//   );

//   const handleRetry = useCallback(() => {
//     window.location.reload();
//   }, []);

//   // Memoized last updated time
//   const lastUpdatedTime = useMemo(
//     () =>
//       new Date().toLocaleTimeString(locale === "bn" ? "bn-BD" : "en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//       }),
//     [locale]
//   );

//   if (locationLoading) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* SEO Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "WebApplication",
//             name: locale === "bn" ? "প্রার্থনার সময়" : "Prayer Times",
//             description:
//               locale === "bn"
//                 ? "সঠিক প্রার্থনার সময় এবং ইসলামিক ক্যালেন্ডার"
//                 : "Accurate prayer times and Islamic calendar",
//             applicationCategory: "ReligiousApplication",
//             operatingSystem: "All",
//             permissions: "geolocation",
//           }),
//         }}
//       />

//       <section
//         className="max-w-4xl mx-auto w-full pt-5"
//         role="main"
//         aria-label={locale === "bn" ? "প্রার্থনার সময়" : "Prayer Times"}
//       >
//         {/* Fasting Times Section */}
//         {fastingTimes && (
//           <FastingTimes fastingTimes={fastingTimes} locale={locale} />
//         )}

//         <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
//           {/* Prayer Times Heading */}
//           <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 pt-5 pb-5">
//             {locale === "bn"
//               ? "আজকের নামাজের সময়সূচী"
//               : "Today’s Prayer Times"}
//           </h1>
//           {/* Calculation Method Selector */}

//           <section
//             className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
//             aria-labelledby="calculation-method-heading"
//           >
//             <h2
//               id="calculation-method-heading"
//               className="font-semibold mb-3 text-lg sm:text-xl text-gray-800"
//             >
//               {locale === "bn" ? "গণনা পদ্ধতি" : "Calculation Method"}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//               <div className="space-y-2">
//                 <label
//                   htmlFor="main-method-select"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   {locale === "bn" ? "প্রধান পদ্ধতি" : "Main Method"}
//                 </label>
//                 <select
//                   id="main-method-select"
//                   value={calculationMethod}
//                   onChange={handleCalculationMethodChange}
//                   className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-islamic-green focus:border-transparent transition-all duration-200 text-sm sm:text-base"
//                   aria-describedby="main-method-description"
//                 >
//                   {calculationMethodOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {locale === "bn" ? option.bn : option.en}
//                     </option>
//                   ))}
//                 </select>
//                 <p
//                   id="main-method-description"
//                   className="text-xs text-gray-500"
//                 >
//                   {locale === "bn"
//                     ? "প্রার্থনার সময় গণনার পদ্ধতি নির্বাচন করুন"
//                     : "Select calculation method for prayer times"}
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="asr-method-select"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   {locale === "bn" ? "আসর পদ্ধতি" : "Asr Method"}
//                 </label>
//                 <select
//                   id="asr-method-select"
//                   value={asrMethod}
//                   onChange={handleAsrMethodChange}
//                   className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-islamic-green focus:border-transparent transition-all duration-200 text-sm sm:text-base"
//                   aria-describedby="asr-method-description"
//                 >
//                   {asrMethodOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {locale === "bn" ? option.bn : option.en}
//                     </option>
//                   ))}
//                 </select>
//                 <p
//                   id="asr-method-description"
//                   className="text-xs text-gray-500"
//                 >
//                   {locale === "bn"
//                     ? "আসর নামাজের সময় গণনার পদ্ধতি"
//                     : "Method for calculating Asr prayer time"}
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Prayer Times Display */}
//           <section aria-labelledby="prayer-times-heading" className="mb-6">
//             <h2 id="prayer-times-heading" className="sr-only">
//               {locale === "bn"
//                 ? "প্রার্থনার সময়সূচী"
//                 : "Prayer Times Schedule"}
//             </h2>

//             {prayerLoading ? (
//               <div
//                 className="grid gap-3 sm:gap-4"
//                 role="status"
//                 aria-label={locale === "bn" ? "লোড হচ্ছে" : "Loading"}
//               >
//                 {[...Array(6)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="skeleton h-16 sm:h-20 rounded-lg animate-pulse"
//                     aria-hidden="true"
//                   />
//                 ))}
//               </div>
//             ) : error ? (
//               <div
//                 className="text-center py-6 sm:py-8"
//                 role="alert"
//                 aria-live="polite"
//               >
//                 <div className="max-w-md mx-auto">
//                   <svg
//                     className="w-12 h-12 text-red-500 mx-auto mb-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
//                     />
//                   </svg>
//                   <p className="text-red-600 text-base sm:text-lg mb-4">
//                     {error}
//                   </p>
//                   <button
//                     onClick={handleRetry}
//                     className="mt-4 px-6 py-3 bg-islamic-green text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 text-sm sm:text-base font-medium"
//                   >
//                     {locale === "bn" ? "পুনরায় চেষ্টা করুন" : "Try Again"}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div
//                 className="grid gap-3 sm:gap-4"
//                 role="list"
//                 aria-label={
//                   locale === "bn" ? "প্রার্থনার তালিকা" : "Prayer list"
//                 }
//               >
//                 {prayerTimes?.map((prayer, index) => (
//                   <PrayerCard
//                     key={prayer.name}
//                     prayer={prayer}
//                     locale={validateLocale(locale)}
//                     isCurrent={prayer.isCurrent}
//                     isNext={prayer.isNext}
//                     isPassed={prayer.isPassed}
//                     index={index}
//                   />
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* Last Updated & Location Info */}
//           <footer className="mt-6 pt-6 border-t border-gray-200">
//             <div className="text-center text-sm text-gray-600 space-y-2">
//               <p>
//                 <span className="font-medium">
//                   {locale === "bn" ? "সর্বশেষ আপডেট" : "Last updated"}:
//                 </span>{" "}
//                 <time dateTime={new Date().toISOString()}>
//                   {lastUpdatedTime}
//                 </time>
//               </p>
//               {location && (
//                 <p>
//                   <span className="font-medium">
//                     {locale === "bn" ? "অবস্থান" : "Location"}:
//                   </span>{" "}
//                   <span className="text-gray-700">
//                     {location.city}, {location.country}
//                   </span>
//                 </p>
//               )}
//             </div>
//           </footer>
//         </div>
//       </section>
//     </>
//   );
// }
// Converted PrayerTimes.tsx using useTranslations()
// Below this component, you will find en.json, bn.json, and hi.json content separated by comments.

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
                    locale={validateLocale(locale)}
                    isCurrent={prayer.isCurrent}
                    isNext={prayer.isNext}
                    isPassed={prayer.isPassed}
                    index={index}
                  />
                ))}
              </div>
            )}
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
