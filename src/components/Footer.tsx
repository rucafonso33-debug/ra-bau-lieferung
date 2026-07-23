import { business, navigation, type AppPage } from '../config/business';
import { Logo } from './Logo';

export function Footer({ onNavigate }: { onNavigate: (page: AppPage) => void }) {
  return (
    <footer className="border-t border-[#d8e1e6] bg-[#0c2233] text-white">
      <div className="mx-auto grid max-w-[1540px] gap-9 px-5 py-12 md:grid-cols-[1.2fr_.8fr_.8fr] lg:px-10">
        <div><Logo invert /><p className="mt-4 max-w-md text-sm leading-6 text-white/58">Projektbezogene Materialien und persönliche Auswahlhilfe für Bau und Renovation in der Schweiz.</p></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold text-white/68">{navigation.map((item) => <button key={item.page} onClick={() => onNavigate(item.page)} className="text-left hover:text-white">{item.label}</button>)}<button onClick={() => onNavigate('quote')} className="text-left hover:text-white">Projektanfrage</button></div>
        <div className="text-sm text-white/68"><p>{business.contact}</p><p className="mt-2">{business.country}</p><p className="mt-2"><a href={`tel:+${business.phoneDigits}`}>{business.phoneDisplay}</a></p><p className="mt-2 break-all"><a href={`mailto:${business.email}`}>{business.email}</a></p><p className="mt-5 text-[11px] leading-5 text-white/45">Nicht im Handelsregister eingetragen · Nicht MWST-pflichtig</p></div>
      </div>
    </footer>
  );
}
