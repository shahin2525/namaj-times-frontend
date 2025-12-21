// // src/hooks/useLocation.ts

"use client";

import { useState, useEffect } from "react";

export interface Location {
  latitude: number;
  longitude: number;
  city?: string | null;
  country?: string | null;
  timeZone?: string;
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
