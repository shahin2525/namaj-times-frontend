"use client";
import { useState, useEffect } from "react";
import PrayerCard from "./PrayerCard";
import LocationSelector from "../location/LocationSelector";
import LoadingSpinner from "../ui/LoadingSpinner";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useLocation } from "@/hooks/useLocation";

export default function PrayerTimes() {
  const { location, setLocation, isLoading: locationLoading } = useLocation();
  const {
    prayerTimes,
    isLoading: prayerLoading,
    error,
  } = usePrayerTimes(location);

  if (locationLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Location Selector */}
        <div className="mb-6">
          <LocationSelector
            location={location}
            onLocationChange={setLocation}
          />
        </div>

        {/* Prayer Times Grid */}
        {prayerLoading ? (
          <div className="grid gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-lg"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <p>Error loading prayer times: {error}</p>
          </div>
        ) : (
          <div className="grid gap-3 md:gap-4">
            {prayerTimes?.map((prayer, index) => (
              <PrayerCard
                key={prayer.name}
                prayer={prayer}
                isCurrent={prayer.isCurrent}
                isNext={prayer.isNext}
              />
            ))}
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </section>
  );
}
