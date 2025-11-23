"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Compass } from "lucide-react";
import Head from "next/head";
import dynamic from "next/dynamic";

// Lazy-load Leaflet map (FREE alternative to Google Maps)
const Map = dynamic(() => import("./QiblaMap"), {
  ssr: false,
});

export default function QiblaDirectionPage() {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");

  const [heading, setHeading] = useState<number | null>(null);
  const [direction, setDirection] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const calculateQibla = (lat: number, lng: number) => {
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;

    const phiK = (kaabaLat * Math.PI) / 180;
    const lambdaK = (kaabaLng * Math.PI) / 180;
    const phi = (lat * Math.PI) / 180;
    const lambda = (lng * Math.PI) / 180;

    const qibla =
      (Math.atan2(
        Math.sin(lambdaK - lambda),
        Math.cos(phi) * Math.tan(phiK) -
          Math.sin(phi) * Math.cos(lambdaK - lambda)
      ) *
        180) /
      Math.PI;

    return (qibla + 360) % 360;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lng: longitude });
          setDirection(calculateQibla(latitude, longitude));
        },
        () => setError("Location permission denied")
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.webkitCompassHeading) {
      setHeading(event.webkitCompassHeading);
    } else if (event.alpha !== null) {
      setHeading(360 - event.alpha);
    }
  };

  const rotation =
    heading !== null && direction !== null ? heading - direction : 0;

  return (
    <>
      {/* SEO Optimization */}
      <Head>
        <title>Qibla Direction | Accurate Islamic Compass</title>
        <meta
          name="description"
          content="Find the accurate Qibla direction using an advanced Islamic compass. Works on all devices. Mobile-friendly and 100% free."
        />
        <meta
          name="keywords"
          content="Qibla direction, Kaaba direction, Islamic compass, Mecca direction, Qibla finder"
        />
        <meta property="og:title" content="Accurate Qibla Direction" />
        <meta
          property="og:description"
          content="Determine the exact Qibla direction with a beautiful compass and optional map view."
        />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-black p-4 pb-24 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold mt-4 dark:text-white animate-fadeIn">
          {t("qiblaDirection")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md mt-1">
          Point your device toward Qibla direction.
        </p>

        {/* Compass Container */}
        <div className="relative mt-8 w-64 h-64 rounded-full border-[6px] border-gray-300 dark:border-gray-700 flex items-center justify-center shadow-xl bg-white/20 backdrop-blur-md animate-fadeInSlow">
          {/* Smooth rotating arrow */}
          <div
            className="absolute w-2 h-24 bg-indigo-600 dark:bg-indigo-400 rounded-full origin-bottom transition-transform duration-300"
            style={{ transform: `rotate(${rotation}deg)` }}
          />

          {/* Kaaba icon */}
          <div className="absolute w-10 h-10 bg-yellow-500 rounded-md shadow-lg flex items-center justify-center text-black font-bold">
            🕋
          </div>

          <Compass className="w-44 h-44 text-indigo-600 dark:text-indigo-400 opacity-30" />
        </div>

        {/* Qibla Degree Display */}
        <div className="mt-6 text-gray-800 dark:text-gray-200 text-lg font-medium">
          {direction !== null ? (
            <p>Qibla: {direction.toFixed(2)}°</p>
          ) : (
            <p>{tCommon("loading")}</p>
          )}
        </div>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        {/* Map View (FREE Leaflet) */}
        <div className="mt-10 w-full max-w-md">
          {coords && <Map lat={coords.lat} lng={coords.lng} />}
        </div>

        {/* Google AdSense Placeholder */}
        <div className="mt-10 w-full max-w-md h-24 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 text-sm">
          Google AdSense Space
        </div>
      </div>
    </>
  );
}
