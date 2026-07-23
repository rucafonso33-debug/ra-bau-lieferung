import { ClipboardList, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation, type AppPage } from '../config/business';
import { Logo } from './Logo';

export function Header({ page, quoteCount, onNavigate }: { page: AppPage; quoteCount: number; onNavigate: (page: AppPage) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#d8e0e5] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1540px] items-center gap-3 px-4 lg:h-[78px] lg:px-8">
        <button onClick={() => onNavigate('home')} className="shrink-0" aria-label="Startseite"><Logo /></button>
        <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label="Hauptnavigation">
          {navigation.map((item) => (
            <button key={item.page} onClick={() => onNavigate(item.page)} className={`rounded-lg px-3 py-3 text-xs font-extrabold transition ${page === item.page ? 'bg-[#eef3f6] text-[#004b87]' : 'text-[#536b79] hover:bg-[#f3f6f7] hover:text-[#004b87]'}`}>{item.label}</button>
          ))}
        </nav>
        <button onClick={() => onNavigate('quote')} className="relative ml-auto inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#d7aa57] px-4 text-xs font-extrabold text-[#10293e] xl:ml-3">
          <ClipboardList size={16} /><span className="hidden sm:inline">Anfrage</span>{quoteCount > 0 && <span className="rounded-full bg-[#10293e] px-2 py-0.5 text-white">{quoteCount}</span>}
        </button>
        <button aria-label="Menü" onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#d5dee3] xl:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="border-t border-[#e1e7ea] bg-white px-4 py-3 xl:hidden" aria-label="Mobile Navigation">
          {navigation.map((item) => (
            <button key={item.page} onClick={() => { onNavigate(item.page); setOpen(false); }} className="flex min-h-12 w-full items-center border-b border-[#edf1f3] text-left text-sm font-bold text-[#10293e]">{item.label}</button>
          ))}
        </nav>
      )}
    </header>
  );
}
