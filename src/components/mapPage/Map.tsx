"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";


const Map = () => {

  return (
    <div className="h-[80vh] w-screen">
      <MapContainer
        center={[-6.2, 106.8]} // Jakarta
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Marker position={[-6.2, 106.8]}>
          <Popup>Hello Jakarta!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map