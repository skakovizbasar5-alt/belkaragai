import { useSyncExternalStore } from 'react';

/**
 * localStorage-ке қауіпсіз жазу/оқу және React-пен синхрондау.
 * Жеке браузер режимінде немесе жад толып қалғанда сайт істен шықпайды.
 */

const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function notify(key: string) {
  listeners.get(key)?.forEach((fn) => fn());
}

if (typeof window !== 'undefined') {
  // Басқа қойындыда өзгерсе де жаңарту
  window.addEventListener('storage', (e) => {
    if (e.key) notify(e.key);
    else listeners.forEach((_, k) => notify(k));
  });
}

export function readJSON<T>(key: string, fallback: T): T {
  const raw = readRaw(key);
  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;
  let value: T = fallback;
  if (raw) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  cache.set(key, { raw, value });
  return value;
}

export type WriteResult = { ok: true } | { ok: false; reason: 'quota' | 'unavailable' };

export function writeJSON<T>(key: string, value: T): WriteResult {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    notify(key);
    return { ok: true };
  } catch (err) {
    const quota = err instanceof DOMException && (err.name === 'QuotaExceededError' || err.code === 22);
    return { ok: false, reason: quota ? 'quota' : 'unavailable' };
  }
}

export function removeKey(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* елемеу */
  }
  notify(key);
}

function subscribe(key: string, fn: () => void) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(fn);
  return () => listeners.get(key)!.delete(fn);
}

export function useStoredJSON<T>(key: string, fallback: T): T {
  return useSyncExternalStore(
    (fn) => subscribe(key, fn),
    () => readJSON(key, fallback),
    () => fallback,
  );
}
