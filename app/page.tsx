"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Home() {
  // Состояния больше не нужны, так как погода отображается на карте
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>Weather on the Map</h1>
      <div style={{ width: "100%", maxWidth: 600, height: 400, marginBottom: 24 }}>
        <Map />
      </div>
      <p style={{ marginTop: 24, color: '#888' }}>Click on the map to get the weather at the selected location.</p>
    </main>
  );
}
