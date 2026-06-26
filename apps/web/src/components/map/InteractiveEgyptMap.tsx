'use client';

import { useEffect, useRef, useState } from 'react';

interface MapPoint {
  id: string;
  name: string;
  nameAr: string;
  lat: number;
  lng: number;
  type: 'experience' | 'provider' | 'city';
  slug?: string;
}

interface InteractiveEgyptMapProps {
  points: MapPoint[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onPointClick?: (point: MapPoint) => void;
  height?: string;
}

export default function InteractiveEgyptMap({
  points,
  center = { lat: 26.8, lng: 30.8 },
  zoom = 6,
  onPointClick,
  height = '400px',
}: InteractiveEgyptMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isReady, setIsReady] = useState(false);
  const L = useRef<any>(null);

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      L.current = leaflet;
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!isReady || !mapContainerRef.current || !L.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.current.map(mapContainerRef.current, {
      center: [center.lat, center.lng],
      zoom,
      zoomControl: false,
    });

    L.current.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    markersRef.current = points.map((point) => {
      const marker = L.current.marker([point.lat, point.lng]).addTo(map);
      marker.bindPopup(`<b>${point.nameAr || point.name}</b>`);
      marker.on('click', () => onPointClick?.(point));
      return marker;
    });

    mapRef.current = map;

    if (points.length > 0) {
      const bounds = L.current.latLngBounds(points.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [isReady, points, center, zoom, onPointClick]);

  if (!isReady) {
    return (
      <div style={{ height }} className="rounded-2xl bg-theme-surface border border-theme-gold/10 flex items-center justify-center">
        <div className="animate-pulse text-theme-muted font-cairo">جاري تحميل الخريطة...</div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-theme-gold/10">
      <div ref={mapContainerRef} style={{ height, width: '100%', zIndex: 0 }} />
    </div>
  );
}
