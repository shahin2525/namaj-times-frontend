export interface IslamicDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  dayName: string;
}

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  hijriDate: IslamicDate;
  type: "islamic" | "general";
  description?: string;
}
