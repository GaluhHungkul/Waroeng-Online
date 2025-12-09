"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
});

export default function DeliveryMap() {
  const mapRef = useRef<L.Map | null>(null);
  const courierMarkerRef = useRef<L.Marker | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  // Lokasi kantor (misal kantor pusat)
  const officeLocation: [number, number] = [-7.3279, 108.2225]; // Tasikmalaya

  // State lokasi user (update realtime)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Icon kurir motor
  const courierIcon = L.icon({
    iconUrl: "/icons/kurir.png",
    iconRetinaUrl: "/icons/kurir@2x.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    shadowUrl: "/icons/kurir-shadow.png",
    shadowSize: [50, 50],
    shadowAnchor: [25, 25],
  });

  // Simpan koordinat rute jalan
  const [routeCoords, setRouteCoords] = useState<L.LatLngExpression[]>([]);
  const [movingIndex, setMovingIndex] = useState(0);

  // Posisi kurir (update mengikuti rute)
  const [courierPosition, setCourierPosition] = useState<L.LatLngExpression>(officeLocation);

  // Variabel untuk rotasi marker
  const previousPosRef = useRef<[number, number] | null>(null);

  // Fungsi untuk rotate icon mengikuti arah
  function rotateMarker(marker: L.Marker, next: [number, number]) {
    const previousPos = previousPosRef.current;
    if (!previousPos) {
      previousPosRef.current = next;
      return;
    }
    const [lat1, lng1] = previousPos;
    const [lat2, lng2] = next;

    const angle =
      (Math.atan2(lng2 - lng1, lat2 - lat1) * 180) / Math.PI;

    const el = marker.getElement() as HTMLElement;
    if (el) {
      el.style.transform = `rotate(${angle}deg)`;
    }
    previousPosRef.current = next;
  }

  // Inisialisasi map, marker, dan tile layer
  useEffect(() => {
    if (mapRef.current) return; // cuma sekali init

    const map = L.map("map", {
      center: officeLocation,
      zoom: 14,
    });

    mapRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(map);

    // Marker kantor (kurir start)
    const courierMarker = L.marker(officeLocation, { icon: courierIcon }).addTo(map);
    courierMarkerRef.current = courierMarker;

    // Marker user (posisi nanti update)
    const userMarker = L.marker(officeLocation).addTo(map);
    userMarkerRef.current = userMarker;

    // Route line (polyline)
    routeLineRef.current = L.polyline([], { color: "blue" }).addTo(map);
  }, []);

  // Update posisi user realtime pakai Geolocation API
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung oleh browser ini.");
      return;
    }

    const watcherId = navigator.geolocation.watchPosition(
        (pos) => {
            console.log("Lokasi user:", pos.coords.latitude, pos.coords.longitude);
            setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
            console.error("Error geolocation:", err);
            alert("Gagal mendapatkan lokasi user: " + err.message);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000,
        }
        );

    return () => navigator.geolocation.clearWatch(watcherId);
  }, []);

  // Update marker user di map saat lokasi user berubah
  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    // Update posisi marker user
    userMarkerRef.current?.setLatLng(userLocation);

    // Pusatkan map ke lokasi user (opsional)
    // mapRef.current.setView(userLocation);

    // Minta rute dari kantor ke user
    fetchRoute(officeLocation, userLocation);
  }, [userLocation]);

  // Ambil rute dari OSRM API
  async function fetchRoute(from: [number, number], to: [number, number]) {
    if (!mapRef.current) return;

    const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const coords = data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);

      setRouteCoords(coords);
      setMovingIndex(0);

      // Update polyline
      routeLineRef.current?.setLatLngs(coords);
    } catch (err) {
      console.error("Gagal ambil rute:", err);
    }
  }

  // Animasi marker kurir bergerak mengikuti rute
  useEffect(() => {
    if (routeCoords.length === 0 || !courierMarkerRef.current) return;

    const interval = setInterval(() => {
      setMovingIndex((prev) => {
        const next = prev + 1;

        if (next >= routeCoords.length) {
          clearInterval(interval);
          return prev;
        }

        const pos = routeCoords[next] as [number, number];

        // Update posisi marker kurir
        courierMarkerRef.current!.setLatLng(pos);
        rotateMarker(courierMarkerRef.current!, pos);
        setCourierPosition(pos);

        return next;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [routeCoords]);

  return <div id="map" className="w-full h-80 border-primary-orange border rounded lg:h-[80vh]"/>;
}
