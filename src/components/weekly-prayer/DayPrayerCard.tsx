"use client";

import { useState } from "react";
import PrayerGrid from "./PrayerGrid";
import RamadanBadge from "./RamadanBadge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DayPrayerCard({ day, isToday }: any) {
  const [open, setOpen] = useState(isToday);

  return (
    <div className="bg-white rounded-xl shadow border">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full p-4 flex justify-between items-center rounded-xl
          ${isToday ? "bg-islamic-green text-white" : "bg-gray-50"}
        `}
      >
        <div>
          <h3 className="text-lg font-bold">{day.dayName}</h3>
          <p className="text-sm opacity-90">{day.englishDate}</p>
          <p className="text-xs opacity-80">{day.hijriDate}</p>
        </div>

        <span className="text-2xl font-bold">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="p-4 space-y-4">
          {/* Ramadan Badge */}
          {day.fastingTimes && (
            <RamadanBadge fastingTimes={day.fastingTimes} isToday={isToday} />
          )}

          {/* Prayer Grid */}
          <PrayerGrid prayers={day.prayerTimes} />
        </div>
      )}
    </div>
  );
}
