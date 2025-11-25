"use client";

import { useState, useEffect } from "react";

export interface UserLocation {
  latitude: number;
  longitude: number;
  city: string | null;
  country: string | null;
  error?: string | null;
}

export function useLocation3() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const updateLocation = (loc: UserLocation) => {
      Promise.resolve().then(() => {
        setLocation(loc);
        setIsLoading(false);
      });
    };

    if (!navigator.geolocation) {
      updateLocation({
        latitude: 0,
        longitude: 0,
        city: null,
        country: null,
        error: "Geolocation is not supported",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        let city = null;
        let country = null;

        try {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          const response = await fetch(url);
          const data = await response.json();

          city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            null;

          country = data.address.country || null;
        } catch (err) {
          console.log("Reverse geocoding failed:", err);
        }

        updateLocation({ latitude, longitude, city, country, error: null });
      },
      (err) => {
        updateLocation({
          latitude: 0,
          longitude: 0,
          city: null,
          country: null,
          error: "Please allow location permission.",
        });
      }
    );
  }, []);
  return { location, isLoading };
}
