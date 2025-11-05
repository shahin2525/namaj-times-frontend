"use client";
import React, { useState } from "react";
import usePrayerTimes from "@/hooks/usePrayerTimes";
import PrayerCard from "@/components/prayer/PrayerCard";
import AdsenseAd from "@/components/AdsenseAd";

export default function PrayerPage() {
  const [loc, setLoc] = useState<{ lat: number; lng: number } | undefined>();
  const { data, loading, error } = usePrayerTimes(loc);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Today&apos;s Prayer Times</h2>

      <div className="mb-4">
        <button
          onClick={() => {
            if (!navigator.geolocation)
              return alert("Geolocation not supported");
            navigator.geolocation.getCurrentPosition(
              (p) => {
                setLoc({ lat: p.coords.latitude, lng: p.coords.longitude });
              },
              () => alert("Unable to get location")
            );
          }}
          className="px-4 py-2 rounded-md border"
        >
          Use device location
        </button>
      </div>

      {loading && <div>Loading…</div>}
      {error && <div className="text-red-500">{error}</div>}
      {data && <PrayerCard data={data} />}

      {/* Example Ad placement — show only after AdSense approval */}
      <AdsenseAd adSlot="1234567890" />
    </section>
  );
}
