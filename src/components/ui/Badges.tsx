import { BadgeCheck } from 'lucide-react';
import { CATEGORY_BY_ID } from '../../data/categories';
import type { CategoryId } from '../../types';

export function VerifiedBadge({ verified }: { verified: boolean }) {
  // Тексерілмеген нысанда белгі көрсетілмейді
  if (!verified) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-forest-100 px-2.5 py-1 text-[0.7rem] font-bold text-forest-800">
      <BadgeCheck className="h-3.5 w-3.5" /> Тексерілген
    </span>
  );
}

export function CategoryBadge({ category }: { category: CategoryId }) {
  const c = CATEGORY_BY_ID[category];
  const Icon = c.icon;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-bold text-white"
      style={{ backgroundColor: c.color }}
    >
      <Icon className="h-3.5 w-3.5" /> {c.short}
    </span>
  );
}

/** Расталмаған мәнді «Нақтылау қажет» деп көрсету */
export function Pending({ value, text = 'Нақтылау қажет' }: { value: string | null | undefined; text?: string }) {
  if (value) return <>{value}</>;
  return <span className="font-medium text-brown-600 italic">{text}</span>;
}
