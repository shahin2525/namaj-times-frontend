// // components/ForbiddenTimes.tsx
// 'use client';
// import { useState, useEffect } from 'react';

// export default function ForbiddenTimes() {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [forbiddenTimes, setForbiddenTimes] = useState<any[]>([]);

//   useEffect(() => {
//     // This would be calculated based on actual prayer times
//     const times = [
//       { period: 'After Fajr Prayer', duration: 'Until Sunrise', reason: 'Makruh time' },
//       { period: 'During Sunrise', duration: '20 minutes after sunrise', reason: 'Sun worship time' },
//       { period: 'At Zenith', duration: '15-20 minutes before Dhuhr', reason: 'Extreme heat time' },
//       { period: 'After Asr Prayer', duration: 'Until Sunset', reason: 'Makruh time' },
//       { period: 'During Sunset', duration: '20 minutes around sunset', reason: 'Sun worship time' }
//     ];

//     setForbiddenTimes(times);
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-red-700 mb-6">Forbidden Prayer Times</h2>

//       <div className="space-y-4">
//         {forbiddenTimes.map((time, index) => (
//           <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50">
//             <h3 className="font-semibold text-red-800">{time.period}</h3>
//             <p className="text-gray-700">Duration: {time.duration}</p>
//             <p className="text-gray-600 text-sm">Reason: {time.reason}</p>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//         <p className="text-sm text-yellow-800">
//           <strong>Note:</strong> These times are when voluntary prayers are forbidden.
//           Missed obligatory prayers can be made up at any time.
//         </p>
//       </div>
//     </div>
//   );
// }
// components/ForbiddenTimes.tsx
"use client";
import { useState } from "react";

interface ForbiddenTime {
  period: string;
  duration: string;
  reason: string;
}

const DEFAULT_FORBIDDEN_TIMES: ForbiddenTime[] = [
  {
    period: "After Fajr Prayer",
    duration: "Until Sunrise",
    reason: "Makruh time",
  },
  {
    period: "During Sunrise",
    duration: "20 minutes after sunrise",
    reason: "Sun worship time",
  },
  {
    period: "At Zenith",
    duration: "15-20 minutes before Dhuhr",
    reason: "Extreme heat time",
  },
  {
    period: "After Asr Prayer",
    duration: "Until Sunset",
    reason: "Makruh time",
  },
  {
    period: "During Sunset",
    duration: "20 minutes around sunset",
    reason: "Sun worship time",
  },
];

export default function ForbiddenTimes() {
  const [forbiddenTimes] = useState<ForbiddenTime[]>(DEFAULT_FORBIDDEN_TIMES);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-6">
        Forbidden Prayer Times
      </h2>

      <div className="space-y-4">
        {forbiddenTimes.map((time, index) => (
          <div
            key={index}
            className="p-4 border border-red-200 rounded-lg bg-red-50"
          >
            <h3 className="font-semibold text-red-800">{time.period}</h3>
            <p className="text-gray-700">Duration: {time.duration}</p>
            <p className="text-gray-600 text-sm">Reason: {time.reason}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> These times are when voluntary prayers are
          forbidden. Missed obligatory prayers can be made up at any time.
        </p>
      </div>
    </div>
  );
}
