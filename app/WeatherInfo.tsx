"use client";
import { useEffect, useState } from "react";

interface WeatherInfoProps {
  lat: number;
  lon: number;
  city: string;
}

export default function WeatherInfo({ lat, lon, city }: WeatherInfoProps) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
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

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!weather) return null;

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, minWidth: 260, background: '#fafafa', textAlign: 'center' }}>
      <h2>{city || weather.name}</h2>
      <div style={{ fontSize: 48, fontWeight: 700 }}>{Math.round(weather.main.temp)}°C</div>
      <div style={{ fontSize: 18 }}>{weather.weather[0].description}</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" width={80} height={80} />
      <div style={{ marginTop: 8, color: '#888' }}>Feels like {Math.round(weather.main.feels_like)}°C</div>
    </div>
  );
} 