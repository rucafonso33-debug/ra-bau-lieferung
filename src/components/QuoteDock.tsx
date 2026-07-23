import { ArrowRight } from 'lucide-react';
import type { AppPage } from '../config/business';

export function QuoteDock({ count, page, onNavigate }: { count: number; page: AppPage; onNavigate: (page: AppPage) => void }) {
  if (!count || page === 'quote') return null;
  return (
    <>
      <div aria-hidden="true" className="h-24 md:hidden" />
      <div className="fixed inset-x-3 z-[60] md:hidden" style={{ bottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
        <button onClick={() => onNavigate('quote')} className="flex min-h-14 w-full items-center justify-between rounded-xl bg-[#10293e] px-4 text-left text-white shadow-[0_18px_45px_rgba(7,25,39,.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7aa57]">
          <span className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d7aa57] font-black text-[#10293e]">{count}</span><span><span className="block text-xs font-extrabold">Projektanfrage öffnen</span><span className="block text-[10px] text-white/58">Mengen, Komponenten und Notizen prüfen</span></span></span><ArrowRight size={18} />
        </button>
      </div>
    </>
  );
}
