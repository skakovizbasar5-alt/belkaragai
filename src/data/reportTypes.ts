import type { ReportStatus, ReportType } from '../types';

export const REPORT_TYPES: { id: ReportType; label: string }[] = [
  { id: 'waste', label: 'Қоқыс' },
  { id: 'water', label: 'Су көздерінің ластануы' },
  { id: 'plants', label: 'Өсімдіктерге зиян келуі' },
  { id: 'territory', label: 'Табиғи аумақтың ластануы' },
  { id: 'other', label: 'Басқа мәселе' },
];

export const REPORT_TYPE_LABEL: Record<ReportType, string> = Object.fromEntries(
  REPORT_TYPES.map((t) => [t.id, t.label]),
) as Record<ReportType, string>;

export const REPORT_STATUSES: { id: ReportStatus; label: string; className: string }[] = [
  { id: 'new', label: 'Жаңа', className: 'bg-gold-100 text-brown-800' },
  { id: 'review', label: 'Қаралуда', className: 'bg-sky-100 text-sky-900' },
  { id: 'resolved', label: 'Шешілді', className: 'bg-forest-100 text-forest-800' },
];
