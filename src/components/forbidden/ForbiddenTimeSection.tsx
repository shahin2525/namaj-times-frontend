"use client";

import { useTranslations, useLocale } from "next-intl";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { getForbiddenTimes } from "@/lib/getForbiddenTimes";
import ForbiddenTimeList from "@/components/forbidden/ForbiddenTimeList";
import { useLocation } from "@/hooks/useLocation";
import { useEffect } from "react";

export default function ForbiddenTimeSection() {
  const t = useTranslations("Forbidden2");
  const locale = useLocale();
  const { location, isLoading } = useLocation();
  // 🔥 Dynamic SEO based on city + language
  useEffect(() => {
    if (!location?.city) return;

    const city = location.city;

    let title = "";
    let desc = "";

    if (locale === "bn") {
      // Bangla metadata
      title = `আজকের নিষিদ্ধ নামাজের সময় - ${city}`;
      desc = `${city} এর জন্য আজকের নিষিদ্ধ নামাজের সময় — সূর্যোদয়, জওয়াল ও সূর্যাস্তের নিষিদ্ধ সময়।`;
    } else {
      // English metadata
      title = `Forbidden Namaj Times in ${city} Today`;
      desc = `Today’s forbidden Namaj times in ${city}, including sunrise, zawal and sunset.`;
    }

    // Update <title>
    document.title = title;

    // Update <meta name="description">
    const metaDesc =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement("meta");
        m.name = "description";
        document.head.appendChild(m);
        return m;
      })();

    metaDesc.setAttribute("content", desc);

    // Update OpenGraph
    const ogTitle =
      document.querySelector('meta[property="og:title"]') ??
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:title");
        document.head.appendChild(m);
        return m;
      })();

    const ogDesc =
      document.querySelector('meta[property="og:description"]') ??
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        document.head.appendChild(m);
        return m;
      })();

    ogTitle.setAttribute("content", title);
    ogDesc.setAttribute("content", desc);
  }, [location?.city, locale]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Detecting location…</p>;
  }

  if (!location) {
    return <p className="text-center text-red-500">Failed to load location</p>;
  }

  const coords = new Coordinates(location.latitude, location.longitude);
  const params = CalculationMethod.MuslimWorldLeague();
  const today = new Date();
  const prayerTimes = new PrayerTimes(coords, today, params);
  const times = getForbiddenTimes(prayerTimes);

  const forbiddenTimes = [
    {
      title: t("forbidden.sunrise.title"),
      description: t("forbidden.sunrise.desc"),
      timeRange: `${times.sunrise} - ${times.sunriseEnd}`,
    },
    {
      title: t("forbidden.zawal.title"),
      description: t("forbidden.zawal.desc"),
      timeRange: `${times.zawalStart} - ${times.zawalEnd}`,
    },
    {
      title: t("forbidden.sunset.title"),
      description: t("forbidden.sunset.desc"),
      timeRange: `${times.sunsetStart} - ${times.sunsetEnd}`,
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
        {locale === "bn"
          ? location.city
            ? `নিষিদ্ধ নামাজের সময় - ${location.city}`
            : "নিষিদ্ধ নামাজের সময়"
          : location.city
          ? `Forbidden Prayer Times in ${location.city}`
          : "Forbidden Prayer Times"}
      </h1>

      <ForbiddenTimeList list={forbiddenTimes} />
    </div>
  );
}
