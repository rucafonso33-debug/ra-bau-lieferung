import fs from 'node:fs';

const file = 'src/App.tsx';
let source = fs.readFileSync(file, 'utf8');

source = source.replace(
  "import type { ConstructionProduct, InteriorProduct, ProductVisual, QuoteItem } from './types';",
  "import type { ConstructionProduct, InteriorProduct, ProductVisual, QuoteItem } from './types';\nimport { useQuote } from './hooks/useQuote';",
);

source = source.replace(/function useQuote\(\) \{[\s\S]*?\n\}\n\nfunction Header/, 'function Header');

source = source.replace(
  "useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);",
  "useEffect(() => {\n    document.body.style.overflow = 'hidden';\n    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };\n    window.addEventListener('keydown', onKeyDown);\n    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKeyDown); };\n  }, [onClose]);",
);

source = source.replace(
  "function QuotePage({ items, update, remove }: { items: QuoteItem[]; update: (id: string, patch: Partial<QuoteItem>) => void; remove: (id: string) => void }) {",
  "function QuotePage({ items, update, remove, toggleComponent, setSubstitution }: { items: QuoteItem[]; update: (id: string, patch: Partial<QuoteItem>) => void; remove: (id: string) => void; toggleComponent: (id: string, component: string) => void; setSubstitution: (id: string, key: string, value: string) => void }) {",
);

source = source.replace(
  "const lines = items.map((item, index) => `${index + 1}. ${item.brand ? `${item.brand} ` : ''}${item.name}\\n   ${item.quantity} ${item.unit}${item.reference ? ` · Ref. ${item.reference}` : ''}${item.customNote ? `\\n   Notiz: ${item.customNote}` : ''}`);",
  "const lines = items.map((item, index) => {\n      const components = item.isConcept && item.selectedComponents?.length ? `\\n   Komponenten: ${item.selectedComponents.join(', ')}` : '';\n      const substitutions = item.isConcept && item.selectedSubstitutions && Object.keys(item.selectedSubstitutions).length ? `\\n   Ausführung: ${Object.entries(item.selectedSubstitutions).map(([key, value]) => `${key}: ${value}`).join(', ')}` : '';\n      return `${index + 1}. ${item.brand ? `${item.brand} ` : ''}${item.name}\\n   ${item.quantity} ${item.unit}${item.reference ? ` · Ref. ${item.reference}` : ''}${components}${substitutions}${item.customNote ? `\\n   Notiz: ${item.customNote}` : ''}`;\n    });",
);

source = source.replace(
  "<textarea value={item.customNote ?? ''} onChange={(event) => update(item.id, { customNote: event.target.value })} placeholder=\"Notiz zu diesem Produkt\" className=\"mt-3 min-h-20 w-full border border-[#ccd7dc] p-3 text-sm\" /></div><button aria-label={`${item.name} entfernen`}",
  "<textarea value={item.customNote ?? ''} onChange={(event) => update(item.id, { customNote: event.target.value })} placeholder=\"Notiz zu diesem Produkt\" className=\"mt-3 min-h-20 w-full border border-[#ccd7dc] p-3 text-sm\" />{item.isConcept ? <div className=\"mt-4 border-t border-[#d8e1e6] pt-4\"><p className=\"text-[10px] font-extrabold uppercase tracking-[.14em] text-[#8e6725]\">Konzept konfigurieren</p><div className=\"mt-3 grid gap-2\">{[...(item.components ?? []), ...(item.optionalComponents ?? [])].map((component) => { const active = item.selectedComponents?.includes(component) ?? false; return <button key={component} type=\"button\" onClick={() => toggleComponent(item.id, component)} className={`flex min-h-11 items-center justify-between border px-3 text-left text-xs font-bold ${active ? 'border-[#004b87] bg-[#edf5fa] text-[#004b87]' : 'border-[#d8e1e6] bg-white text-[#6a7e89]'}`}><span>{component}{item.optionalComponents?.includes(component) ? ' · optional' : ''}</span><span aria-hidden=\"true\">{active ? '✓' : '+'}</span></button>; })}</div>{item.substitutions?.length ? <div className=\"mt-3 grid gap-2\">{item.substitutions.map((option) => <label key={option} className=\"grid gap-1 text-[11px] font-bold text-[#536b79]\"><span>{option}</span><select value={item.selectedSubstitutions?.[option] ?? ''} onChange={(event) => setSubstitution(item.id, option, event.target.value)} className=\"h-11 border border-[#ccd7dc] bg-white px-3 text-sm font-normal\"><option value=\"\">Nach Beratung bestätigen</option><option value=\"Standardausführung\">Standardausführung</option><option value=\"Alternative gewünscht\">Alternative gewünscht</option></select></label>)}</div> : null}</div> : null}</div><button aria-label={`${item.name} entfernen`}",
);

source = source.replace(
  "else if (page === 'quote') content = <QuotePage items={quote.items} update={quote.update} remove={quote.remove} />;",
  "else if (page === 'quote') content = <QuotePage items={quote.items} update={quote.update} remove={quote.remove} toggleComponent={quote.toggleComponent} setSubstitution={quote.setSubstitution} />;",
);

if (!source.includes("import { useQuote } from './hooks/useQuote';")) throw new Error('useQuote import patch failed');
if (source.includes('function useQuote()')) throw new Error('legacy useQuote removal failed');
if (!source.includes('Konzept konfigurieren')) throw new Error('concept configurator patch failed');
if (!source.includes('toggleComponent={quote.toggleComponent}')) throw new Error('QuotePage wiring patch failed');

fs.writeFileSync(file, source);
