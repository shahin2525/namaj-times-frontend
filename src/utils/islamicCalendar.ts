// utils/islamicCalendar.ts
// Updated with dynamic prayer times using Adhan

import { Coordinates, CalculationMethod, Madhab, PrayerTimes } from "adhan";
import { toHijri } from "hijri-converter";
import { Location } from "@/hooks/useLocation";
export const islamicMonths = [
  "Muharram",
  "Safar",
  "Rabi al-Awwal",
  "Rabi al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//22
export const getIslamicDate = (date: Date) => {
  const hijri = toHijri(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return {
    day: hijri.hd,
    month: hijri.hm,
    year: hijri.hy,
    monthName: islamicMonths[hijri.hm - 1],
    dayName: weekDays[date.getDay()],
  };
};
export const getMonthDays = (year: number, month: number) => {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startingDayOfWeek = firstDay.getDay();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  // Previous month
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i);
    days.push({
      date,
      isCurrentMonth: false,
      islamicDate: getIslamicDate(date),
    });
  }

  // Current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      islamicDate: getIslamicDate(date),
    });
  }

  // Next month
  const totalCells = 42;
  const remaining = totalCells - days.length;

  for (let i = 1; i <= remaining; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      isCurrentMonth: false,
      islamicDate: getIslamicDate(date),
    });
  }

  return days;
};

// ------------------------------
// Dynamic Prayer Times Function
// ------------------------------
export const getDynamicPrayerTimes = (
  date: Date,
  latitude: number,
  longitude: number
) => {
  const coords = new Coordinates(latitude, longitude);
  const params = CalculationMethod.MuslimWorldLeague();
  params.madhab = Madhab.Shafi;

  const times = new PrayerTimes(coords, date, params);

  const format = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return {
    fajr: format(times.fajr),
    sunrise: format(times.sunrise),
    dhuhr: format(times.dhuhr),
    asr: format(times.asr),
    maghrib: format(times.maghrib),
    isha: format(times.isha),
  };
};
