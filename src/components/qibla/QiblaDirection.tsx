/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

interface QiblaDirectionProps {
  locale?: string;
}

const KAABA = { lat: 21.4225, lng: 39.8262 };

export default function QiblaDirection({ locale = "en" }: QiblaDirectionProps) {
  const t = useTranslations("Qibla");

  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [permissionRequested, setPermissionRequested] = useState(false);

  const compassRef = useRef<HTMLDivElement>(null);

  /* -----------------------------------------
        QIBLA CALCULATION
  ------------------------------------------ */
  const calculateQiblaDirection = (lat: number, lng: number) => {
    const φK = (KAABA.lat * Math.PI) / 180;
    const λK = (KAABA.lng * Math.PI) / 180;
    const φ = (lat * Math.PI) / 180;
    const λ = (lng * Math.PI) / 180;

    const direction =
      Math.atan2(
        Math.sin(λK - λ),
        Math.cos(φ) * Math.tan(φK) - Math.sin(φ) * Math.cos(λK - λ)
      ) *
      (180 / Math.PI);

    return (direction + 360) % 360;
  };

  /* -----------------------------------------
        GET USER LOCATION (PROMISE VERSION)
  ------------------------------------------ */
  const getUserLocation = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error(t("locationError")));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => reject(new Error(t("locationError"))),
        { enableHighAccuracy: true }
      );
    });
  };

  /* -----------------------------------------
        COMPASS PERMISSION
  ------------------------------------------ */
  const requestCompassPermission = async () => {
    setPermissionRequested(true);

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        if (permission !== "granted") {
          setError(t("compassError"));
          return;
        }
      } catch {
        setError(t("compassError"));
        return;
      }
    }

    window.addEventListener("deviceorientation", (event) => {
      if (event.alpha !== null) setCompassHeading(event.alpha);
    });
  };

  /* -----------------------------------------
        ROTATION OF COMPASS
  ------------------------------------------ */
  const getCompassRotation = () => {
    if (compassHeading === null || qiblaDirection === null) return 0;
    return (qiblaDirection - compassHeading + 360) % 360;
  };

  /* -----------------------------------------
        USER FEEDBACK
  ------------------------------------------ */
  const getDirectionFeedback = () => {
    if (compassHeading === null || qiblaDirection === null) return t("adjust");

    const diff = Math.abs(compassHeading - qiblaDirection);
    const d = Math.min(diff, 360 - diff);

    if (d < 5) return t("facingQibla");
    if (d < 90)
      return compassHeading < qiblaDirection ? t("turnRight") : t("turnLeft");
    return t("adjust");
  };

  /* -----------------------------------------
        INITIAL EFFECT — FIXED ESLINT
  ------------------------------------------ */
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const loc = await getUserLocation();
        setUserLocation(loc);
        setQiblaDirection(calculateQiblaDirection(loc.lat, loc.lng));
      } catch (err: any) {
        setError(err.message || t("locationError"));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  /* -----------------------------------------
        UI
  ------------------------------------------ */
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">{t("title")}</h1>
      <p className="text-center text-gray-600 mb-6">{t("subtitle")}</p>

      {/* Loading */}
      {isLoading && <p className="text-center text-gray-600">{t("loading")}</p>}

      {/* Error */}
      {!isLoading && error && (
        <div className="text-center">
          <p className="text-red-600 mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {t("retry")}
          </button>
        </div>
      )}

      {/* Success */}
      {!isLoading && !error && (
        <>
          {!permissionRequested && (
            <div className="text-center mb-4">
              <p className="text-gray-600 mb-3">{t("compassHelp")}</p>
              <button
                onClick={requestCompassPermission}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {t("enableCompass")}
              </button>
            </div>
          )}

          {/* Compass UI */}
          <div className="relative mx-auto w-64 h-64">
            <div
              className="absolute inset-0 border-4 rounded-full bg-white shadow"
              style={{
                transform: `rotate(${getCompassRotation()}deg)`,
                transition: "0.2s ease-out",
              }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-red-600 font-bold">
                N
              </div>

              {/* Qibla Arrow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-28 bg-red-600 rounded relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-8 border-b-red-600 border-transparent"></div>
                </div>
              </div>
            </div>

            {/* User Direction */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-8 bg-blue-600 rounded"></div>
            </div>
          </div>

          {/* Info */}
          <div className="text-center mt-4">
            <div className="text-xl font-bold">{getDirectionFeedback()}</div>
            <div className="text-gray-700 mt-2">
              {t("direction")}: {qiblaDirection?.toFixed(1)}° {t("degrees")}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
