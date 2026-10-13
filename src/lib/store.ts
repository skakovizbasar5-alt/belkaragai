import { useMemo } from 'react';
import { places as basePlaces } from '../data/places';
import type { EcoReport, Place, ReportStatus } from '../types';
import { removeKey, readJSON, useStoredJSON, writeJSON, type WriteResult } from './storage';

/** localStorage кілттері */
export const KEYS = {
  reports: 'ecotour.reports.v1',
  customPlaces: 'ecotour.customPlaces.v1',
} as const;

const EMPTY_REPORTS: EcoReport[] = [];
const EMPTY_PLACES: Place[] = [];

/* ---------------- Нысандар ---------------- */

export function useCustomPlaces(): Place[] {
  return useStoredJSON<Place[]>(KEYS.customPlaces, EMPTY_PLACES);
}

/** places.ts + демо-басқару бетінен қосылған нысандар */
export function useAllPlaces(): Place[] {
  const custom = useCustomPlaces();
  return useMemo(() => [...basePlaces, ...custom], [custom]);
}

export function addCustomPlace(place: Omit<Place, 'id' | 'custom'>): WriteResult {
  const list = readJSON<Place[]>(KEYS.customPlaces, EMPTY_PLACES);
  const id = `custom-${Date.now().toString(36)}`;
  return writeJSON(KEYS.customPlaces, [...list, { ...place, id, custom: true }]);
}

export function deleteCustomPlace(id: string) {
  const list = readJSON<Place[]>(KEYS.customPlaces, EMPTY_PLACES);
  writeJSON(
    KEYS.customPlaces,
    list.filter((p) => p.id !== id),
  );
}

/* ---------------- Экологиялық хабарламалар ---------------- */

export function useReports(): EcoReport[] {
  return useStoredJSON<EcoReport[]>(KEYS.reports, EMPTY_REPORTS);
}

export function addReport(report: Omit<EcoReport, 'id' | 'createdAt' | 'status'>): WriteResult {
  const list = readJSON<EcoReport[]>(KEYS.reports, EMPTY_REPORTS);
  const item: EcoReport = {
    ...report,
    id: `r-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  return writeJSON(KEYS.reports, [item, ...list]);
}

export function setReportStatus(id: string, status: ReportStatus) {
  const list = readJSON<EcoReport[]>(KEYS.reports, EMPTY_REPORTS);
  writeJSON(
    KEYS.reports,
    list.map((r) => (r.id === id ? { ...r, status } : r)),
  );
}

export function deleteReport(id: string) {
  const list = readJSON<EcoReport[]>(KEYS.reports, EMPTY_REPORTS);
  writeJSON(
    KEYS.reports,
    list.filter((r) => r.id !== id),
  );
}

export function clearDemoData() {
  removeKey(KEYS.reports);
  removeKey(KEYS.customPlaces);
}

/* ---------------- Көмекші функциялар ---------------- */

export function hasCoords(p: Place): p is Place & { latitude: number; longitude: number } {
  return typeof p.latitude === 'number' && typeof p.longitude === 'number';
}

export function formatCoords(p: Place): string | null {
  if (!hasCoords(p)) return null;
  return `${p.latitude.toFixed(5)}, ${p.longitude.toFixed(5)}`;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('kk-KZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}
