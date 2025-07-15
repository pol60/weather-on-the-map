import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "Invalid coordinates" }), { status: 400 });
  }

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "weather-on-the-map/1.0 (your-email@example.com)"
      }
    });
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch from Nominatim" }), { status: 500 });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
} 