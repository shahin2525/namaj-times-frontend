"use client";
import type { PrayerTimesResponse } from "@/types";

export default function PrayerCard({ data }: { data: PrayerTimesResponse }) {
  const { times, date, location } = data;
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow rounded-lg p-6">
      <div className="mb-4">
        <div className="text-sm text-muted-foreground">
          {location?.name || "Current Location"}
        </div>
        <div className="text-2xl font-semibold">{date}</div>
      </div>

      <ul className="space-y-3">
        {Object.entries(times).map(([k, v]) => (
          <li key={k} className="flex justify-between">
            <span className="capitalize">{k}</span>
            <span className="font-medium">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
