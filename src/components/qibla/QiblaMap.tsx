"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix default icon issue in Leaflet
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export default function QiblaMap() {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  // Kaaba Coordinates
  const kaabaPos: [number, number] = [21.4225, 39.8262];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPos([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Location error:", err);
        }
      );
    }
  }, []);

  if (!userPos)
    return (
      <div className="text-center py-10 text-gray-600 dark:text-gray-300">
        Fetching your location...
      </div>
    );

  return (
    <div className="w-full h-[60vh] rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={userPos}
        zoom={6}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location */}
        <Marker position={userPos}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Kaaba */}
        <Marker position={kaabaPos}>
          <Popup>Kaaba (Masjid al-Haram)</Popup>
        </Marker>

        {/* Line from user → Kaaba */}
        <Polyline positions={[userPos, kaabaPos]} color="#008bff" weight={4} />
      </MapContainer>
    </div>
  );
}
