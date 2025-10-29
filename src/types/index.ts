export interface PrayerTimesResponse {
  date: string; // e.g. '2025-10-30'
  location: { name?: string; lat?: number; lng?: number };
  times: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    sunrise?: string;
  };
}
