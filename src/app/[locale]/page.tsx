// src/app/[locale]/page.tsx
import PrayerTimes from "@/components/prayer/PrayerTimes";
import HijriDate from "@/components/prayer/HijriDate";
import ForbiddenTimes from "@/components/prayer/ForbiddenTimes";
import AdSense from "@/components/ui/AdSense";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-islamic-green mb-4">
          Islamic Prayer Times
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Accurate prayer times, forbidden prayer times, and Islamic calendar
          based on your location
        </p>
      </section>

      {/* AdSense Top */}
      <AdSense slot="top-banner" />

      {/* Current Date */}
      <HijriDate />

      {/* Main Prayer Times */}
      <PrayerTimes />

      {/* AdSense Middle */}
      <AdSense slot="middle-banner" />

      {/* Forbidden Times */}
      <ForbiddenTimes />

      {/* AdSense Bottom */}
      <AdSense slot="bottom-banner" />
    </div>
  );
}
