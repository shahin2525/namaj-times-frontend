// src/hooks/useLocation.ts
"use client";

import { useState, useEffect } from "react";

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeLocation = async () => {
      try {
        // Try to get location from localStorage first
        const savedLocation = localStorage.getItem("prayerTimesLocation");

        if (savedLocation) {
          try {
            const parsedLocation = JSON.parse(savedLocation);
            if (isMounted) {
              setLocation(parsedLocation);
              setIsLoading(false);
              return; // Exit early if we have saved location
            }
          } catch (e) {
            console.error("Error parsing saved location:", e);
            localStorage.removeItem("prayerTimesLocation");
            // Continue to get new location
          }
        }

        // If no saved location or parsing failed, try to get current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              if (!isMounted) return;

              try {
                const { latitude, longitude } = position.coords;

                // Try to get city name using reverse geocoding
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );

                if (!response.ok) {
                  throw new Error(`Geocoding API error: ${response.status}`);
                }

                const data = await response.json();

                const newLocation: Location = {
                  latitude,
                  longitude,
                  city: data.city || data.locality,
                  country: data.countryName,
                };

                if (isMounted) {
                  setLocation(newLocation);
                  localStorage.setItem(
                    "prayerTimesLocation",
                    JSON.stringify(newLocation)
                  );
                  setError(null);
                }
              } catch (geocodeError) {
                console.error("Geocoding error:", geocodeError);
                // Fallback to just coordinates
                const fallbackLocation: Location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                };
                if (isMounted) {
                  setLocation(fallbackLocation);
                  localStorage.setItem(
                    "prayerTimesLocation",
                    JSON.stringify(fallbackLocation)
                  );
                  setError(
                    "Could not get city name, but using your coordinates"
                  );
                }
              }
              if (isMounted) {
                setIsLoading(false);
              }
            },
            (locationError) => {
              if (!isMounted) return;

              // Better error logging and handling
              console.error("Location error details:", {
                code: locationError.code,
                message: locationError.message,
                PERMISSION_DENIED:
                  locationError.code === locationError.PERMISSION_DENIED,
                POSITION_UNAVAILABLE:
                  locationError.code === locationError.POSITION_UNAVAILABLE,
                TIMEOUT: locationError.code === locationError.TIMEOUT,
              });

              let errorMessage = "Failed to get your location";

              switch (locationError.code) {
                case locationError.PERMISSION_DENIED:
                  errorMessage =
                    "Location access denied. Please enable location permissions in your browser settings.";
                  break;
                case locationError.POSITION_UNAVAILABLE:
                  errorMessage =
                    "Location information unavailable. Please check your device settings.";
                  break;
                case locationError.TIMEOUT:
                  errorMessage =
                    "Location request timed out. Please try again.";
                  break;
                default:
                  errorMessage = "Unable to get your current location.";
              }

              // Set default location (Dhaka) if geolocation fails
              const defaultLocation: Location = {
                latitude: 23.8103,
                longitude: 90.4125,
                city: "Dhaka",
                country: "Bangladesh",
              };

              if (isMounted) {
                setLocation(defaultLocation);
                setError(errorMessage);
                localStorage.setItem(
                  "prayerTimesLocation",
                  JSON.stringify(defaultLocation)
                );
                setIsLoading(false);
              }
            },
            {
              enableHighAccuracy: false, // Changed to false for better compatibility
              timeout: 15000, // Increased timeout to 15 seconds
              maximumAge: 300000, // 5 minutes
            }
          );
        } else {
          // Geolocation not supported
          const defaultLocation: Location = {
            latitude: 23.8103,
            longitude: 90.4125,
            city: "Dhaka",
            country: "Bangladesh",
          };

          if (isMounted) {
            setLocation(defaultLocation);
            setError("Geolocation is not supported by your browser");
            localStorage.setItem(
              "prayerTimesLocation",
              JSON.stringify(defaultLocation)
            );
            setIsLoading(false);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error in location initialization:", error);
          setError("Failed to initialize location");

          // Set default location even on initialization error
          const defaultLocation: Location = {
            latitude: 23.8103,
            longitude: 90.4125,
            city: "Dhaka",
            country: "Bangladesh",
          };
          setLocation(defaultLocation);
          localStorage.setItem(
            "prayerTimesLocation",
            JSON.stringify(defaultLocation)
          );
          setIsLoading(false);
        }
      }
    };

    initializeLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    setError(null);
    localStorage.setItem("prayerTimesLocation", JSON.stringify(newLocation));
  };

  const clearError = () => {
    setError(null);
  };

  return {
    location,
    setLocation: updateLocation,
    isLoading,
    error,
    clearError,
  };
}
