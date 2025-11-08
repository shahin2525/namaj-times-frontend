// src/components/location/LocationSelector.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

interface LocationSelectorProps {
  location: Location | null;
  onLocationChange: (location: Location) => void;
}

export default function LocationSelector({
  location,
  onLocationChange,
}: LocationSelectorProps) {
  const t = useTranslations("Location");
  const [isLoading, setIsLoading] = useState(false);
  const [manualLocation, setManualLocation] = useState({
    city: "",
    country: "",
  });

  const getCurrentLocation = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      alert(t("geolocationNotSupported"));
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Reverse geocoding to get city name
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();

          const newLocation: Location = {
            latitude,
            longitude,
            city: data.city || data.locality || t("unknownCity"),
            country: data.countryName || t("unknownCountry"),
          };

          onLocationChange(newLocation);
        } catch (error) {
          console.error("Error getting location:", error);
          // Fallback to just coordinates
          onLocationChange({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: t("currentLocation"),
            country: "",
          });
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(t("locationAccessDenied"));
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleManualLocation = () => {
    if (manualLocation.city.trim()) {
      // For demo purposes, using a fixed location
      // In a real app, you'd use a geocoding API
      onLocationChange({
        latitude: 23.8103, // Default to Dhaka coordinates
        longitude: 90.4125,
        city: manualLocation.city,
        country: manualLocation.country,
      });
      setManualLocation({ city: "", country: "" });
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Location Display */}
      {location && (
        <div className="text-center">
          <p className="text-sm text-gray-600">{t("currentLocation")}</p>
          <p className="font-semibold text-islamic-green">
            {location.city ||
              `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(
                4
              )}`}
            {location.country && `, ${location.country}`}
          </p>
        </div>
      )}

      {/* Location Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-islamic-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {t("detecting")}
            </>
          ) : (
            <>
              <LocationIcon />
              {t("useCurrentLocation")}
            </>
          )}
        </button>

        {/* Manual location input would go here */}
        {/* For now, we'll just show a demo button */}
        <button
          onClick={() =>
            onLocationChange({
              latitude: 23.8103,
              longitude: 90.4125,
              city: "Dhaka",
              country: "Bangladesh",
            })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {t("useDemoLocation")}
        </button>
      </div>

      {/* Manual Location Input (Optional) */}
      <div className="border-t pt-4 mt-4">
        <p className="text-sm text-gray-600 mb-3">{t("enterManual")}</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={t("cityPlaceholder")}
            value={manualLocation.city}
            onChange={(e) =>
              setManualLocation((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent"
          />
          <button
            onClick={handleManualLocation}
            disabled={!manualLocation.city.trim()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("setLocation")}
          </button>
        </div>
      </div>
    </div>
  );
}

// Location icon component
function LocationIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
