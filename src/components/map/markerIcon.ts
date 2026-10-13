import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { MapPinPlus } from 'lucide-react';
import { CATEGORY_BY_ID } from '../../data/categories';
import type { CategoryId } from '../../types';

const cache = new Map<string, L.DivIcon>();

/** Санатқа сәйкес түсті белгі. Тексерілмеген нысан — сұр, үзік жиекті. */
export function markerIcon(category: CategoryId, opts: { active?: boolean; verified?: boolean } = {}) {
  const { active = false, verified = true } = opts;
  const key = `${category}-${active}-${verified}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const meta = CATEGORY_BY_ID[category];
  const svg = renderToStaticMarkup(createElement(meta.icon, { size: 17, strokeWidth: 2.4 }));
  const icon = L.divIcon({
    className: `eco-marker${active ? ' eco-marker--active' : ''}${verified ? '' : ' eco-marker--unverified'}`,
    html: `<div class="eco-marker__pin" style="background:${meta.color}">${svg}</div>`,
    iconSize: [38, 38],
    iconAnchor: [5, 38],
    popupAnchor: [14, -36],
  });
  cache.set(key, icon);
  return icon;
}

let pickIcon: L.DivIcon | null = null;
export function pickMarkerIcon() {
  if (!pickIcon) {
    const svg = renderToStaticMarkup(createElement(MapPinPlus, { size: 17, strokeWidth: 2.4 }));
    pickIcon = L.divIcon({
      className: 'eco-marker eco-marker--pick',
      html: `<div class="eco-marker__pin">${svg}</div>`,
      iconSize: [38, 38],
      iconAnchor: [5, 38],
    });
  }
  return pickIcon;
}
