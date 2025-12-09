import { format } from "date-fns";

export function format12(date: Date) {
  return format(date, "hh:mm a");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getForbiddenTimes(prayerTimes: any) {
  const sunrise = prayerTimes.sunrise;
  const sunriseEnd = new Date(sunrise.getTime() + 15 * 60000);

  const zawalStart = prayerTimes.dhuhr;
  const zawalEnd = new Date(zawalStart.getTime() + 7 * 60000);

  const sunsetStart = new Date(prayerTimes.maghrib.getTime() - 1 * 60000);
  const sunsetEnd = prayerTimes.maghrib;

  return {
    sunrise: format12(sunrise),
    sunriseEnd: format12(sunriseEnd),
    zawalStart: format12(zawalStart),
    zawalEnd: format12(zawalEnd),
    sunsetStart: format12(sunsetStart),
    sunsetEnd: format12(sunsetEnd),
  };
}
