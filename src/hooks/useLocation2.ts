// "use client";

// import { useState, useEffect } from "react";

// export interface UserLocation {
//   latitude: number;
//   longitude: number;
//   error?: string;
// }

// export default function useLocation2() {
//   const [location, setLocation] = useState<UserLocation | null>(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setLocation({
//         latitude: 0,
//         longitude: 0,
//         error: "Geolocation not supported",
//       });
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setLocation({
//           latitude: pos.coords.latitude,
//           longitude: pos.coords.longitude,
//         });
//       },
//       () => {
//         setLocation({
//           latitude: 0,
//           longitude: 0,
//           error: "Location permission denied",
//         });
//       }
//     );
//   }, []);

//   return location;
// }
"use client";

import { useState, useEffect } from "react";

export interface UserLocation {
  latitude: number;
  longitude: number;
  error?: string;
}

export default function useLocation2() {
  const [location, setLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    // Fix: setState must be async inside effects
    const update = (value: UserLocation | null) => {
      Promise.resolve().then(() => setLocation(value));
    };

    if (!navigator.geolocation) {
      update({
        latitude: 0,
        longitude: 0,
        error: "Geolocation not supported",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        update({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => {
        update({
          latitude: 0,
          longitude: 0,
          error: "Location permission denied",
        });
      }
    );
  }, []);

  return location;
}
