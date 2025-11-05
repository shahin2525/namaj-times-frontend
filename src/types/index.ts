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

//
// src/types/index.ts
export interface PrayerTime {
  name: string;
  time: string;
  timestamp: number;
  isCurrent?: boolean;
  isNext?: boolean;
}

export interface LocationData {
  lat: number;
  lng: number;
  city: string;
  country: string;
  timezone: string;
}

export interface PrayerCalculationMethod {
  name: string;
  value: string;
  description: string;
}

export interface ForbiddenTime {
  period: string;
  duration: string;
  reason: string;
  startTime?: string;
  endTime?: string;
}
