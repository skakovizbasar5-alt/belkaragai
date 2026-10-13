import { Landmark, Leaf, Route, TentTree, TriangleAlert, type LucideIcon } from 'lucide-react';
import type { CategoryId } from '../types';

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  short: string;
  color: string;
  icon: LucideIcon;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'nature', label: 'Табиғи нысандар', short: 'Табиғи нысан', color: '#2f6b45', icon: Leaf },
  { id: 'history', label: 'Тарихи орындар', short: 'Тарихи орын', color: '#7a5535', icon: Landmark },
  { id: 'recreation', label: 'Демалыс орындары', short: 'Демалыс орны', color: '#b8892f', icon: TentTree },
  { id: 'route', label: 'Туристік бағыттар', short: 'Туристік бағыт', color: '#2c6e7f', icon: Route },
  { id: 'eco', label: 'Экологиялық мәселелер', short: 'Экологиялық мәселе', color: '#b54a32', icon: TriangleAlert },
];

export const CATEGORY_BY_ID: Record<CategoryId, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, CategoryMeta>;
