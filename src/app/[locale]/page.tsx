// src/app/[locale]/page.tsx

import { useTranslations } from "next-intl";
import PrayerTimes from "@/components/prayer/PrayerTimes";
import HijriDate from "@/components/prayer/HijriDate";
import ForbiddenTimes from "@/components/prayer/ForbiddenTimes";
import AdSense from "@/components/ui/AdSense";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {/* // code 1 */}
      <section className="py-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-5xl font-bold text-islamic-green mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">{t("subtitle")}</p>
        </div>
      </section>
      {/* // code 2 */}
      {/* <section className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-islamic-green mb-4">
          {t("title")}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto w-full">
          {t("subtitle")}
        </p>
      </section> */}

      {/* AdSense Top */}
      <AdSense slot="top-banner" />

      {/* Current Date */}

      <HijriDate />

      {/* Main Prayer Times */}
      <div className="flex justify-center items-center">
        {" "}
        <PrayerTimes />
      </div>

      {/* AdSense Middle */}
      <AdSense slot="middle-banner" />

      {/* Forbidden Times */}
      <ForbiddenTimes />

      {/* AdSense Bottom */}
      <AdSense slot="bottom-banner" />
    </div>
  );
}
