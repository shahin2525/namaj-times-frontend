"use client";
import { useState } from "react";
import usePrayerTimes from "@/hooks/usePrayerTimes";
import PrayerCard from "@/components/prayer/PrayerCard";

export default function PrayerPage() {
  const [loc, setLoc] = useState<{ lat: number; lng: number } | undefined>();
  const { data, loading, error } = usePrayerTimes(loc);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">আজকের নামাজের সময়</h2>

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
          স্থানীয় অবস্থান ব্যবহার করুন
        </button>
      </div>

      {loading && <div>লোড হচ্ছে…</div>}
      {error && <div className="text-red-500">{error}</div>}
      {data && <PrayerCard data={data} />}
    </section>
  );
}
