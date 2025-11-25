// import { format } from "date-fns";

// export function format12(date: Date) {
//   return format(date, "hh:mm a"); // 12-hour format
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function getForbiddenTimes(prayerTimes: any) {
//   // dynamic forbidden time ranges

//   const sunrise = prayerTimes.sunrise; // Date
//   const fajrEnd = new Date(sunrise.getTime() + 15 * 60000); // sunrise + 15 min

//   const zawalStart = prayerTimes.dhuhr; // dhuhr time (start of zawal)
//   const zawalEnd = new Date(zawalStart.getTime() + 7 * 60000); // +7 min

//   const sunsetStart = prayerTimes.maghrib; // exact sunset
//   const sunsetEnd = new Date(sunsetStart.getTime() + 2 * 60000); // +2 min

//   return {
//     sunrise: format12(sunrise),
//     sunriseEnd: format12(fajrEnd),
//     zawalStart: format12(zawalStart),
//     zawalEnd: format12(zawalEnd),
//     sunsetStart: format12(sunsetStart),
//     sunsetEnd: format12(sunsetEnd),
//   };
// }
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

  const sunsetStart = prayerTimes.maghrib;
  const sunsetEnd = new Date(sunsetStart.getTime() + 2 * 60000);

  return {
    sunrise: format12(sunrise),
    sunriseEnd: format12(sunriseEnd),
    zawalStart: format12(zawalStart),
    zawalEnd: format12(zawalEnd),
    sunsetStart: format12(sunsetStart),
    sunsetEnd: format12(sunsetEnd),
  };
}
