import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { Place } from '../../types';
import { MAP_DEFAULT_VIEW } from '../../data/site';
import { hasCoords } from '../../lib/store';
import { markerIcon, pickMarkerIcon } from './markerIcon';
import PlacePopup from './PlacePopup';

export interface TourMapProps {
  places: Place[];
  selectedId?: string | null;
  /** Бір нысанды қайта таңдағанда да картаны соған апару үшін санауыш */
  focusNonce?: number;
  onSelect?: (id: string) => void;
  /** Тексерілген жол сызығы (тек расталған болса) */
  path?: [number, number][] | null;
  /** Картаны нысандарға сәйкестендіру */
  fitToPlaces?: boolean;
  /** Демо-басқару бетінде картадан координат таңдау */
  pick?: { value: [number, number] | null; onPick: (lat: number, lng: number) => void };
  onTileError?: () => void;
  onTileLoad?: () => void;
  className?: string;
}

/** Таңдалған нысанға ұшып бару және ақпараттық терезені ашу */
function SelectionController({
  selectedId,
  nonce,
  markers,
}: {
  selectedId?: string | null;
  nonce?: number;
  markers: React.RefObject<Map<string, L.Marker>>;
}) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const m = markers.current?.get(selectedId);
    if (!m) return;
    map.flyTo(m.getLatLng(), Math.max(map.getZoom(), 14), { duration: 0.8 });
    const t = window.setTimeout(() => m.openPopup(), 850);
    return () => window.clearTimeout(t);
  }, [selectedId, nonce, map, markers]);
  return null;
}

/** Контейнер өлшемі өзгергенде (телефонды бұрғанда т.б.) картаны қайта есептеу */
function ResizeWatcher() {
  const map = useMap();
  useEffect(() => {
    const el = map.getContainer();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, [map]);
  return null;
}

/** Тышқан дөңгелегімен масштабтау тек карта басылғаннан кейін қосылады — бетті айналдыруға кедергі жасамайды */
function WheelZoomOnFocus() {
  const map = useMapEvents({
    click: () => map.scrollWheelZoom.enable(),
    mouseout: () => map.scrollWheelZoom.disable(),
  });
  return null;
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  const key = points.map((p) => p.join(',')).join('|');
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) map.setView(points[0], 14);
    else map.fitBounds(L.latLngBounds(points), { padding: [48, 48], maxZoom: 15 });
    // points өзгергенде ғана (key арқылы) қайта есептеледі
  }, [key, map]);
  return null;
}

function PickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => onPick(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6))),
  });
  return null;
}

export default function TourMap({
  places,
  selectedId,
  focusNonce,
  onSelect,
  path,
  fitToPlaces = true,
  pick,
  onTileError,
  onTileLoad,
  className = 'h-[480px]',
}: TourMapProps) {
  const markers = useRef<Map<string, L.Marker>>(new Map());
  const mapped = useMemo(() => places.filter(hasCoords), [places]);
  const points = useMemo(() => mapped.map((p) => [p.latitude, p.longitude] as [number, number]), [mapped]);

  return (
    <div className={`relative isolate overflow-hidden ${className}`} role="region" aria-label="Белқарағай туристік картасы">
      <MapContainer
        center={MAP_DEFAULT_VIEW.center}
        zoom={MAP_DEFAULT_VIEW.zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> қатысушылары'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{
            tileerror: () => onTileError?.(),
            tileload: () => onTileLoad?.(),
          }}
        />
        <ResizeWatcher />
        <WheelZoomOnFocus />
        {fitToPlaces && <FitBounds points={points} />}
        <SelectionController selectedId={selectedId} nonce={focusNonce} markers={markers} />

        {path && path.length > 1 && (
          <Polyline positions={path} pathOptions={{ color: '#a9842f', weight: 5, opacity: 0.9, dashArray: '1 10', lineCap: 'round' }} />
        )}

        {mapped.map((p) => (
          <Marker
            key={p.id}
            position={[p.latitude, p.longitude]}
            icon={markerIcon(p.category, { active: p.id === selectedId })}
            title={p.name}
            eventHandlers={{ click: () => onSelect?.(p.id) }}
            ref={(m) => {
              if (m) markers.current.set(p.id, m);
              else markers.current.delete(p.id);
            }}
          >
            <Popup>
              <PlacePopup place={p} />
            </Popup>
          </Marker>
        ))}

        {pick && <PickHandler onPick={pick.onPick} />}
        {pick?.value && <Marker position={pick.value} icon={pickMarkerIcon()} />}
      </MapContainer>
    </div>
  );
}
