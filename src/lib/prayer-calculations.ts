// lib/prayer-calculations.ts
import { PrayerTimes } from "prayer-times.js";

export const calculatePrayerTimes = (
  date: Date,
  latitude: number,
  longitude: number,
  method = "MWL"
) => {
  const prayerTimes = new PrayerTimes(method);

  return prayerTimes.getTimes(date, [latitude, longitude], {
    format: "24h",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};

// Forbidden times based on sunrise and sunset
export const getForbiddenTimes = (sunrise: string, sunset: string) => {
  return {
    afterFajr: "From Fajr until sunrise",
    atSunrise: "20 minutes around sunrise",
    atNoon: "When sun is at zenith (15-20 min)",
    afterAsr: "From Asr until sunset",
    atSunset: "20 minutes around sunset",
  };
};
