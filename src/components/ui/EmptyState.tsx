import type { ReactNode } from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({ title, children, icon }: { title: string; children?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-forest-900/20 bg-cream-50 px-6 py-10 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-forest-100 text-forest-700">
        {icon ?? <SearchX className="h-6 w-6" />}
      </div>
      <p className="mt-3 font-semibold text-forest-900">{title}</p>
      {children && <div className="mt-1 max-w-sm text-sm text-forest-900/60">{children}</div>}
    </div>
  );
}
