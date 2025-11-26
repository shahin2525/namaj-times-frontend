// // src/hooks/useLocation.ts
// "use client";

// import { useState, useEffect } from "react";

// export interface Location {
//   latitude: number;
//   longitude: number;
//   city?: string;
//   country?: string;
// }

// export function useLocation() {
//   const [location, setLocation] = useState<Location | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     const initializeLocation = async () => {
//       try {
//         // Try to get location from localStorage first
//         const savedLocation = localStorage.getItem("prayerTimesLocation");

//         if (savedLocation) {
//           try {
//             const parsedLocation = JSON.parse(savedLocation);
//             if (isMounted) {
//               setLocation(parsedLocation);
//               setIsLoading(false);
//               return; // Exit early if we have saved location
//             }
//           } catch (e) {
//             console.error("Error parsing saved location:", e);
//             localStorage.removeItem("prayerTimesLocation");
//             // Continue to get new location
//           }
//         }

//         // If no saved location or parsing failed, try to get current location
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             async (position) => {
//               if (!isMounted) return;

//               try {
//                 const { latitude, longitude } = position.coords;

//                 // Try to get city name using reverse geocoding
//                 const response = await fetch(
//                   `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//                 );

//                 if (!response.ok) {
//                   throw new Error(`Geocoding API error: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 const newLocation: Location = {
//                   latitude,
//                   longitude,
//                   city: data.city || data.locality,
//                   country: data.countryName,
//                 };

//                 if (isMounted) {
//                   setLocation(newLocation);
//                   localStorage.setItem(
//                     "prayerTimesLocation",
//                     JSON.stringify(newLocation)
//                   );
//                   setError(null);
//                 }
//               } catch (geocodeError) {
//                 console.error("Geocoding error:", geocodeError);
//                 // Fallback to just coordinates
//                 const fallbackLocation: Location = {
//                   latitude: position.coords.latitude,
//                   longitude: position.coords.longitude,
//                 };
//                 if (isMounted) {
//                   setLocation(fallbackLocation);
//                   localStorage.setItem(
//                     "prayerTimesLocation",
//                     JSON.stringify(fallbackLocation)
//                   );
//                   setError(
//                     "Could not get city name, but using your coordinates"
//                   );
//                 }
//               }
//               if (isMounted) {
//                 setIsLoading(false);
//               }
//             },
//             (locationError) => {
//               if (!isMounted) return;

//               // Better error logging and handling
//               console.error("Location error details:", {
//                 code: locationError.code,
//                 message: locationError.message,
//                 PERMISSION_DENIED:
//                   locationError.code === locationError.PERMISSION_DENIED,
//                 POSITION_UNAVAILABLE:
//                   locationError.code === locationError.POSITION_UNAVAILABLE,
//                 TIMEOUT: locationError.code === locationError.TIMEOUT,
//               });

//               let errorMessage = "Failed to get your location";

//               switch (locationError.code) {
//                 case locationError.PERMISSION_DENIED:
//                   errorMessage =
//                     "Location access denied. Please enable location permissions in your browser settings.";
//                   break;
//                 case locationError.POSITION_UNAVAILABLE:
//                   errorMessage =
//                     "Location information unavailable. Please check your device settings.";
//                   break;
//                 case locationError.TIMEOUT:
//                   errorMessage =
//                     "Location request timed out. Please try again.";
//                   break;
//                 default:
//                   errorMessage = "Unable to get your current location.";
//               }

//               // Set default location (Dhaka) if geolocation fails
//               const defaultLocation: Location = {
//                 latitude: 23.8103,
//                 longitude: 90.4125,
//                 city: "Dhaka",
//                 country: "Bangladesh",
//               };

//               if (isMounted) {
//                 setLocation(defaultLocation);
//                 setError(errorMessage);
//                 localStorage.setItem(
//                   "prayerTimesLocation",
//                   JSON.stringify(defaultLocation)
//                 );
//                 setIsLoading(false);
//               }
//             },
//             {
//               enableHighAccuracy: false, // Changed to false for better compatibility
//               timeout: 15000, // Increased timeout to 15 seconds
//               maximumAge: 300000, // 5 minutes
//             }
//           );
//         } else {
//           // Geolocation not supported
//           const defaultLocation: Location = {
//             latitude: 23.8103,
//             longitude: 90.4125,
//             city: "Dhaka",
//             country: "Bangladesh",
//           };

//           if (isMounted) {
//             setLocation(defaultLocation);
//             setError("Geolocation is not supported by your browser");
//             localStorage.setItem(
//               "prayerTimesLocation",
//               JSON.stringify(defaultLocation)
//             );
//             setIsLoading(false);
//           }
//         }
//       } catch (error) {
//         if (isMounted) {
//           console.error("Error in location initialization:", error);
//           setError("Failed to initialize location");

//           // Set default location even on initialization error
//           const defaultLocation: Location = {
//             latitude: 23.8103,
//             longitude: 90.4125,
//             city: "Dhaka",
//             country: "Bangladesh",
//           };
//           setLocation(defaultLocation);
//           localStorage.setItem(
//             "prayerTimesLocation",
//             JSON.stringify(defaultLocation)
//           );
//           setIsLoading(false);
//         }
//       }
//     };

//     initializeLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const updateLocation = (newLocation: Location) => {
//     setLocation(newLocation);
//     setError(null);
//     localStorage.setItem("prayerTimesLocation", JSON.stringify(newLocation));
//   };

//   const clearError = () => {
//     setError(null);
//   };

//   return {
//     location,
//     setLocation: updateLocation,
//     isLoading,
//     error,
//     clearError,
//   };
// }
"use client";

import { useState, useEffect } from "react";

export interface Location {
  latitude: number;
  longitude: number;
  city?: string | null;
  country?: string | null;
}

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const setSafeLocation = (loc: Location, err: string | null = null) => {
      if (!isMounted) return;
      setLocation(loc);
      setError(err);
      localStorage.setItem("prayerTimesLocation", JSON.stringify(loc));
      setIsLoading(false);
    };

    const loadSavedLocation = () => {
      try {
        const saved = localStorage.getItem("prayerTimesLocation");
        if (!saved) return null;

        const parsed = JSON.parse(saved);

        if (
          typeof parsed.latitude === "number" &&
          typeof parsed.longitude === "number" &&
          parsed.latitude !== 23.8103 // avoid saved Dhaka overriding real GPS
        ) {
          return parsed;
        }

        return null;
      } catch {
        return null;
      }
    };

    const reverseGeocode = async (latitude: number, longitude: number) => {
      try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Geocode failed");
        const data = await res.json();

        return {
          city: data.city || data.locality || null,
          country: data.countryName || null,
        };
      } catch {
        return { city: null, country: null };
      }
    };

    const initialize = async () => {
      // 1. Try localStorage FIRST (but avoid Dhaka overriding real GPS)
      const saved = loadSavedLocation();
      if (saved) {
        setSafeLocation(saved);
        return;
      }

      // 2. Get live geolocation
      if (!navigator.geolocation) {
        setSafeLocation(
          {
            latitude: 23.8103,
            longitude: 90.4125,
            city: "Dhaka",
            country: "Bangladesh",
          },
          "Geolocation not supported"
        );
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          // Always use real coordinates when available
          const geo = await reverseGeocode(latitude, longitude);

          setSafeLocation({
            latitude,
            longitude,
            city: geo.city,
            country: geo.country,
          });
        },
        (locationError) => {
          // Only fallback to Dhaka if permission is denied
          let msg = "";
          if (locationError.code === locationError.PERMISSION_DENIED) {
            msg = "Location access denied. Please allow location permissions.";
          } else {
            msg = "Unable to get your location.";
          }

          setSafeLocation(
            {
              latitude: 23.8103,
              longitude: 90.4125,
              city: "Dhaka",
              country: "Bangladesh",
            },
            msg
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    location,
    setLocation: (loc: Location) => {
      setLocation(loc);
      localStorage.setItem("prayerTimesLocation", JSON.stringify(loc));
      setError(null);
    },
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
