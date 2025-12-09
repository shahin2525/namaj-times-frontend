// // export default IslamicCalendar;
// // Updated Islamic Calendar Component with dynamic prayer times, improved spacing, and AdSense block

// "use client";

// import { useState, useEffect } from "react";
// import { useTranslations } from "next-intl";
// import { useLocation } from "@/hooks/useLocation";
// import {
//   getMonthDays,
//   getIslamicDate,
//   islamicMonths,
//   getDynamicPrayerTimes,
// } from "@/utils/islamicCalendar";
// import { PrayerTimes } from "@/types/calendar";

// const IslamicCalendar = () => {
//   const t = useTranslations("Calendar");
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [isLoading, setIsLoading] = useState(true);

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
//   const days = getMonthDays(year, month);
//   const currentIslamicDate = getIslamicDate(currentDate);

//   useEffect(() => {
//     const loadTimes = async () => {
//       setIsLoading(true);
//       try {
//         // You can replace with user's real location later
//         const times = await getDynamicPrayerTimes(
//           selectedDate,
//           23.8103, // Dhaka latitude example
//           90.4125 // Dhaka longitude example
//         );
//         setPrayerTimes(times);
//       } catch (err) {
//         console.error(err);
//       }
//       setIsLoading(false);
//     };

//     loadTimes();
//   }, [selectedDate]);

//   const formatDate = (d: Date) =>
//     d.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//   const isToday = (date: Date) =>
//     date.toDateString() === new Date().toDateString();
//   const isSelected = (date: Date) =>
//     date.toDateString() === selectedDate.toDateString();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4 md:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <h1 className="text-3xl md:text-4xl font-bold text-green-800">
//             {t("title")}
//           </h1>
//           <div className="flex justify-center items-center">
//             <div className="bg-white rounded-lg shadow p-5 space-y-1 w-full max-w-md mx-auto">
//               {" "}
//               <p className="text-lg text-gray-700">{formatDate(currentDate)}</p>
//               <p className="text-xl font-semibold text-green-700">
//                 {currentIslamicDate.day} {currentIslamicDate.monthName}{" "}
//                 {currentIslamicDate.year} AH
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//           <button
//             onClick={() => {
//               setCurrentDate(new Date());
//               setSelectedDate(new Date());
//             }}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//           >
//             {t("today")}
//           </button>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() =>
//                 setCurrentDate(
//                   (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
//                 )
//               }
//               className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
//             >
//               ◀
//             </button>

//             <h2 className="text-xl font-semibold text-gray-800 min-w-[200px] text-center">
//               {currentDate.toLocaleDateString("en-US", {
//                 month: "long",
//                 year: "numeric",
//               })}
//             </h2>

//             <button
//               onClick={() =>
//                 setCurrentDate(
//                   (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
//                 )
//               }
//               className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
//             >
//               ▶
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Calendar */}
//           <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
//             <div className="grid grid-cols-7 gap-2 mb-4">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//                 <div
//                   key={d}
//                   className="text-center font-semibold text-gray-600 py-2 text-sm"
//                 >
//                   {d}
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-7 gap-2">
//               {days.map((day, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedDate(day.date)}
//                   className={`min-h-[85px] p-3 rounded-lg border-2 transition text-left
//                     ${
//                       !day.isCurrentMonth
//                         ? "bg-gray-50 text-gray-400"
//                         : "bg-white"
//                     }
//                     ${
//                       isToday(day.date)
//                         ? "border-green-500 bg-green-50"
//                         : "border-transparent"
//                     }
//                     ${
//                       isSelected(day.date)
//                         ? "border-blue-500 bg-blue-50 shadow"
//                         : ""
//                     }
//                   `}
//                 >
//                   <div className="flex flex-col h-full">
//                     <span
//                       className={`text-sm font-medium mb-1 ${
//                         isToday(day.date) ? "text-green-700" : "text-gray-700"
//                       }`}
//                     >
//                       {day.date.getDate()}
//                     </span>
//                     <span className="text-xs text-green-600 font-medium">
//                       {day.islamicDate.day}
//                     </span>
//                     <span className="text-[10px] text-gray-500 mt-auto">
//                       {day.islamicDate.monthName.slice(0, 3)}
//                     </span>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Selected Date */}
//             <div className="bg-white rounded-xl shadow-lg p-6 space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {t("selectedDate")}
//               </h3>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">{t("gregorian")}:</span>
//                 <span className="font-medium">{formatDate(selectedDate)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">{t("hijri")}:</span>
//                 <span className="font-medium text-green-700">
//                   {getIslamicDate(selectedDate).day}{" "}
//                   {getIslamicDate(selectedDate).monthName}{" "}
//                   {getIslamicDate(selectedDate).year} AH
//                 </span>
//               </div>
//             </div>

//             {/* Prayer Times */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 {t("prayerTimes")}
//               </h3>

//               {isLoading ? (
//                 <div className="animate-pulse space-y-3">
//                   {[...Array(6)].map((_, i) => (
//                     <div key={i} className="h-6 bg-gray-200 rounded"></div>
//                   ))}
//                 </div>
//               ) : prayerTimes ? (
//                 <div className="space-y-2">
//                   {Object.entries(prayerTimes).map(([key, val]) => (
//                     <div key={key} className="flex justify-between">
//                       <span className="text-gray-600 capitalize">
//                         {t(key)}:
//                       </span>
//                       <span className="font-medium text-green-700">{val}</span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center">
//                   {t("prayerTimesUnavailable")}
//                 </p>
//               )}
//             </div>

//             {/* Islamic Month List */}
//             <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 gap-2 text-sm">
//               {islamicMonths.map((m, i) => (
//                 <div
//                   key={m}
//                   className={`p-2 rounded text-center ${
//                     currentIslamicDate.month === i + 1
//                       ? "bg-green-100 text-green-800 font-semibold"
//                       : "bg-gray-50 text-gray-700"
//                   }`}
//                 >
//                   {m}
//                 </div>
//               ))}
//             </div>

//             {/* Empty AdSense Block */}
//             <div className="bg-gray-100 border border-gray-300 rounded-xl h-40 flex items-center justify-center text-gray-500 text-sm italic">
//               Google AdSense Ad Placeholder
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IslamicCalendar;
// export default IslamicCalendar;
// Updated Islamic Calendar Component with dynamic prayer times, improved spacing, and AdSense block

"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useLocation } from "@/hooks/useLocation";
import {
  getMonthDays,
  getIslamicDate,
  islamicMonths,
  getDynamicPrayerTimes,
} from "@/utils/islamicCalendar";
import { PrayerTimes } from "@/types/calendar";

const IslamicCalendar = () => {
  const t = useTranslations("Calendar");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoadingPrayers, setIsLoadingPrayers] = useState(true);

  // Use the location hook
  const { location, isLoading: isLoadingLocation, error } = useLocation();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getMonthDays(year, month);
  const currentIslamicDate = getIslamicDate(currentDate);

  useEffect(() => {
    const loadTimes = async () => {
      setIsLoadingPrayers(true);
      try {
        // Use dynamic location if available, otherwise fallback to Dhaka
        if (location) {
          const times = await getDynamicPrayerTimes(
            selectedDate,
            location.latitude,
            location.longitude
          );
          setPrayerTimes(times);
        } else if (!isLoadingLocation) {
          // If location loading is done but no location, use Dhaka as fallback
          const times = await getDynamicPrayerTimes(
            selectedDate,
            23.8103, // Dhaka latitude fallback
            90.4125 // Dhaka longitude fallback
          );
          setPrayerTimes(times);
        }
      } catch (err) {
        console.error("Error loading prayer times:", err);
        // Fallback to Dhaka on error
        try {
          const times = await getDynamicPrayerTimes(
            selectedDate,
            23.8103,
            90.4125
          );
          setPrayerTimes(times);
        } catch (fallbackErr) {
          console.error("Fallback prayer times also failed:", fallbackErr);
        }
      }
      setIsLoadingPrayers(false);
    };

    // Only load times when location is loaded or we know it's not loading
    if (!isLoadingLocation) {
      loadTimes();
    }
  }, [selectedDate, location, isLoadingLocation]);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const isToday = (date: Date) =>
    date.toDateString() === new Date().toDateString();
  const isSelected = (date: Date) =>
    date.toDateString() === selectedDate.toDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800">
            {t("title")}
          </h1>
          <div className="flex justify-center items-center">
            <div className="bg-white rounded-lg shadow p-5 space-y-1 w-full max-w-md mx-auto">
              <p className="text-lg text-gray-700">{formatDate(currentDate)}</p>
              <p className="text-xl font-semibold text-green-700">
                {currentIslamicDate.day} {currentIslamicDate.monthName}{" "}
                {currentIslamicDate.year} AH
              </p>
              {/* Location Display */}
              {location && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    📍 {location.city || "Unknown City"},{" "}
                    {location.country || "Unknown Country"}
                  </p>
                  {error && (
                    <p className="text-xs text-amber-600 mt-1">{error}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => {
              setCurrentDate(new Date());
              setSelectedDate(new Date());
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {t("today")}
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setCurrentDate(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                )
              }
              className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
            >
              ◀
            </button>

            <h2 className="text-xl font-semibold text-gray-800 min-w-[200px] text-center">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={() =>
                setCurrentDate(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                )
              }
              className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div
                  key={d}
                  className="text-center font-semibold text-gray-600 py-2 text-sm"
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(day.date)}
                  className={`min-h-[85px] p-3 rounded-lg border-2 transition text-left
                    ${
                      !day.isCurrentMonth
                        ? "bg-gray-50 text-gray-400"
                        : "bg-white"
                    }
                    ${
                      isToday(day.date)
                        ? "border-green-500 bg-green-50"
                        : "border-transparent"
                    }
                    ${
                      isSelected(day.date)
                        ? "border-blue-500 bg-blue-50 shadow"
                        : ""
                    }
                  `}
                >
                  <div className="flex flex-col h-full">
                    <span
                      className={`text-sm font-medium mb-1 ${
                        isToday(day.date) ? "text-green-700" : "text-gray-700"
                      }`}
                    >
                      {day.date.getDate()}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      {day.islamicDate.day}
                    </span>
                    <span className="text-[10px] text-gray-500 mt-auto">
                      {day.islamicDate.monthName.slice(0, 3)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {t("selectedDate")}
              </h3>

              <div className="flex justify-between">
                <span className="text-gray-600">{t("gregorian")}:</span>
                <span className="font-medium">{formatDate(selectedDate)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">{t("hijri")}:</span>
                <span className="font-medium text-green-700">
                  {getIslamicDate(selectedDate).day}{" "}
                  {getIslamicDate(selectedDate).monthName}{" "}
                  {getIslamicDate(selectedDate).year} AH
                </span>
              </div>
            </div>

            {/* Prayer Times */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t("prayerTimes")}
                </h3>
                {location && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {location.city || "Your Location"}
                  </span>
                )}
              </div>

              {isLoadingLocation || isLoadingPrayers ? (
                <div className="animate-pulse space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : prayerTimes ? (
                <div className="space-y-2">
                  {Object.entries(prayerTimes).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">
                        {t(key)}:
                      </span>
                      <span className="font-medium text-green-700">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 mb-2">
                    {t("prayerTimesUnavailable")}
                  </p>
                  {error && <p className="text-sm text-amber-600">{error}</p>}
                </div>
              )}
            </div>

            {/* Islamic Month List */}
            <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 gap-2 text-sm">
              {islamicMonths.map((m, i) => (
                <div
                  key={m}
                  className={`p-2 rounded text-center ${
                    currentIslamicDate.month === i + 1
                      ? "bg-green-100 text-green-800 font-semibold"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {m}
                </div>
              ))}
            </div>

            {/* Empty AdSense Block */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl h-40 flex items-center justify-center text-gray-500 text-sm italic">
              Google AdSense Ad Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslamicCalendar;
