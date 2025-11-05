// // src/lib/constants.ts
// export const PRAYER_NAMES = {
//   fajr: "Fajr",
//   sunrise: "Sunrise",
//   dhuhr: "Dhuhr",
//   asr: "Asr",
//   maghrib: "Maghrib",
//   isha: "Isha",
// } as const;

// export const CALCULATION_METHODS = [
//   {
//     value: "MWL",
//     name: "Muslim World League",
//     description: "Standard method used in most European countries",
//   },
//   {
//     value: "ISNA",
//     name: "Islamic Society of North America",
//     description: "Common in USA and Canada",
//   },
//   {
//     value: "Egypt",
//     name: "Egyptian General Authority",
//     description: "Used in Egypt and African countries",
//   },
//   {
//     value: "Makkah",
//     name: "Umm al-Qura University",
//     description: "Used in Saudi Arabia",
//   },
// ];

// export const FORBIDDEN_TIMES_INFO = [
//   {
//     period: "After Fajr Prayer",
//     duration: "Until Sunrise",
//     reason: "Time when the sun is rising",
//   },
//   {
//     period: "During Sunrise",
//     duration: "20 minutes after sunrise",
//     reason: "Sun worship time",
//   },
//   {
//     period: "At Zenith",
//     duration: "15-20 minutes before Dhuhr",
//     reason: "When sun is at its peak",
//   },
//   {
//     period: "After Asr Prayer",
//     duration: "Until Sunset",
//     reason: "Time when the sun is setting",
//   },
//   {
//     period: "During Sunset",
//     duration: "20 minutes around sunset",
//     reason: "Sun worship time",
//   },
// ];
// //
// src/lib/constants.ts
export const PRAYER_NAMES = {
  en: {
    fajr: "Fajr",
    sunrise: "Sunrise",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
  },
  bn: {
    fajr: "ফজর",
    sunrise: "সূর্যোদয়",
    dhuhr: "জোহর",
    asr: "আসর",
    maghrib: "মাগরিব",
    isha: "ইশা",
  },
} as const;

export const FORBIDDEN_TIMES_INFO = {
  en: [
    {
      period: "After Fajr Prayer",
      duration: "Until Sunrise",
      reason: "Time when the sun is rising",
    },
    // ... other English items
  ],
  bn: [
    {
      period: "ফজর নামাজের পরে",
      duration: "সূর্যোদয় পর্যন্ত",
      reason: "সূর্যোদয়ের সময়",
    },
    // ... other Bengali items
  ],
};
