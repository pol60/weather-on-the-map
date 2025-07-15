"use client";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import React from "react";
import L from "leaflet";

// Фикс для корректного отображения маркера на всех устройствах
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

interface MapProps {
  onSelect?: (lat: number, lon: number, city: string) => void;
}

function WeatherPopup({ lat, lon, city }: { lat: number; lon: number; city: string }) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    setLoading(true);
    setError("");
    setWeather(null);
    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setWeather(data);
      })
      .catch(() => setError("Failed to load weather"))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  return (
    <div style={{ minWidth: 180, maxWidth: 220, textAlign: "center" }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{city || (weather && weather.name)}</div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "#c00" }}>{error}</div>}
      {weather && (
        <>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1976d2' }}>{Math.round(weather.main.temp)}°C</div>
          <div style={{ fontSize: 16, textTransform: 'capitalize', color: '#333', marginBottom: 4 }}>{weather.weather[0].description}</div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" width={60} height={60} style={{ margin: '0 auto' }} />
          <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Feels like {Math.round(weather.main.feels_like)}°C</div>
        </>
      )}
    </div>
  );
}

function LocationMarker({ onSelect }: { onSelect?: (lat: number, lon: number, city: string) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [city, setCity] = useState<string>("");
  const markerRef = React.useRef<any>(null);

  useMapEvents({
    click: async (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      // Get city via reverse geocoding (Nominatim, proxied)
      const res = await fetch(`/api/reverse-geocode?lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
      const data = await res.json();
      const cityName = data.address?.city || data.address?.town || data.address?.village || data.address?.state || "";
      setCity(cityName);
      onSelect?.(e.latlng.lat, e.latlng.lng, cityName);
      setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      }, 0);
    },
  });

  return position === null ? null : (
    <Marker position={position} ref={markerRef}>
      <Popup autoPan={true} closeButton={false}>
        <WeatherPopup lat={position[0]} lon={position[1]} city={city} />
      </Popup>
    </Marker>
  );
}

export default function Map({ onSelect }: MapProps) {
  return (
    <MapContainer center={[55.751244, 37.618423]} zoom={5} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelect={onSelect} />
    </MapContainer>
  );
} 