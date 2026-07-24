import React, { useEffect } from 'react';
import { ArrowRight, Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { Logo } from './components/Logo';
import { storefront, whatsappUrl } from './storefrontConfig';

const paths = [
  {
    id: 'keramik',
    eyebrow: 'Keramik & Oberflächen',
    title: 'Keramik',
    copy: 'Feinsteinzeug, Mosaike und ausgewählte Oberflächen für Renovation, Bad, Küche und Objektbau.',
    image: '/images/catalog/recer-mastery.png',
    alt: 'Hochwertige Recer Keramik in Marmoroptik',
    message: 'Guten Tag, ich interessiere mich für Keramik, Feinsteinzeug oder Mosaike. Bitte kontaktieren Sie mich für eine projektbezogene Anfrage.',
  },
  {
    id: 'baustelle',
    eyebrow: 'Verlegen · Bewehrung · Betonbau',
    title: 'Baustellenzubehör',
    copy: 'Nivelliersysteme, Abstandhalter, Drahtbinder, Schutzteile und weiteres Zubehör für professionelle Baustellen.',
    image: '/images/Komplettset.png',
    alt: 'RA Bau Lieferung Komplettset für Fliesenarbeiten',
    message: 'Guten Tag, ich interessiere mich für Baustellenzubehör. Bitte kontaktieren Sie mich für Produkte, Mengen und eine Offerte.',
  },
];

export default function LandingApp() {
  useEffect(() => {
    document.title = 'RA Bau Lieferung | Neue Plattform in Vorbereitung';
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', 'RA Bau Lieferung bereitet eine neue Plattform für Keramik und Baustellenzubehör in der Schweiz vor. Projektanfragen sind weiterhin per WhatsApp, Telefon und E-Mail möglich.');
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f5f6] text-[#10293e]">
      <header className="border-b border-[#dce3e7] bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-[1400px] items-center justify-between gap-4 px-5 py-4 lg:px-10">
          <Logo className="max-w-[190px] sm:max-w-none" />
          <a
            href={whatsappUrl('Guten Tag, ich möchte mit RA Bau Lieferung sprechen.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#004b87] px-4 text-xs font-extrabold text-white"
          >
            <MessageCircle size={17} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      <main>
        <section className="bg-[#10293e] text-white">
          <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[1.02fr_.98fr]">
            <div className="flex flex-col justify-center px-5 py-16 sm:py-20 lg:px-10 lg:py-28">
              <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#d7aa57]">Neue Plattform in Vorbereitung</p>
              <h1 className="mt-5 max-w-3xl font-display text-[2.75rem] font-black leading-[.98] tracking-[-.05em] sm:text-6xl lg:text-7xl">
                Wir bauen unseren Auftritt neu auf.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                RA Bau Lieferung strukturiert aktuell das Sortiment und die Zusammenarbeit mit Herstellern neu. Projektanfragen und persönliche Beratung bleiben während dieser Phase vollständig verfügbar.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${storefront.email}`} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#d7aa57] px-5 text-sm font-extrabold text-[#10293e]">
                  <Mail size={18} /> E-Mail senden
                </a>
                <a href={`tel:+${storefront.phoneDigits}`} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/25 px-5 text-sm font-extrabold text-white">
                  <Phone size={18} /> {storefront.phoneDisplay}
                </a>
              </div>
              <div className="mt-8 flex items-start gap-3 text-sm leading-6 text-white/60">
                <ShieldCheck className="mt-0.5 shrink-0 text-[#d7aa57]" size={19} />
                <p>Keine automatische Bestellung. Jede Anfrage, Referenz und Liefermöglichkeit wird persönlich geprüft.</p>
              </div>
            </div>
            <div className="relative min-h-[360px] overflow-hidden lg:min-h-[650px]">
              <img src="/images/categories/recer-pixstone-room.webp" alt="Hochwertiger Innenraum mit grossformatiger Keramik" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10293e]/75 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#10293e]/35 lg:to-transparent" />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a6e22]">Direkter Einstieg</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-[-.04em] sm:text-5xl">Worum geht es bei Ihrer Anfrage?</h2>
              <p className="mt-4 text-base leading-7 text-[#607581]">Wählen Sie den passenden Bereich. Die Nachricht wird bereits mit dem richtigen Thema vorbereitet.</p>
            </div>

            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              {paths.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[20px] border border-[#d4dfe5] bg-[#f8fafb] shadow-[0_12px_35px_rgba(16,41,62,.07)]">
                  <div className="grid h-full sm:grid-cols-[.95fr_1.05fr]">
                    <div className="aspect-[16/10] overflow-hidden bg-[#edf1f2] sm:aspect-auto sm:min-h-[330px]">
                      <img src={item.image} alt={item.alt} className={`h-full w-full ${item.id === 'baustelle' ? 'object-contain p-6' : 'object-cover'}`} />
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-8">
                      <p className="text-[9px] font-extrabold uppercase tracking-[.18em] text-[#9a6e22]">{item.eyebrow}</p>
                      <h3 className="mt-2 font-display text-3xl font-black tracking-[-.035em]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#637884]">{item.copy}</p>
                      <div className="mt-6 grid gap-2">
                        <a href={whatsappUrl(item.message)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-between rounded-lg bg-[#004b87] px-4 text-sm font-extrabold text-white">
                          Anfrage per WhatsApp <ArrowRight size={17} />
                        </a>
                        <a href={`mailto:${storefront.email}?subject=${encodeURIComponent(`${item.title} Anfrage`)}&body=${encodeURIComponent(item.message)}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#cbd7dd] bg-white px-4 text-sm font-extrabold text-[#004b87]">
                          <Mail size={17} /> E-Mail vorbereiten
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e9eef0]">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a6e22]">Persönlicher Kontakt</p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-[-.035em]">Projektanfragen sind jederzeit willkommen.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#607581]">Senden Sie Produktart, ungefähre Menge, Lieferort und gewünschten Zeitraum. Referenz, Verfügbarkeit und Transport werden danach persönlich geprüft.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              <a href={`tel:+${storefront.phoneDigits}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-extrabold text-[#10293e]"><Phone size={17} /> Anrufen</a>
              <a href={`mailto:${storefront.email}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-extrabold text-[#10293e]"><Mail size={17} /> E-Mail</a>
              <a href={whatsappUrl('Guten Tag, ich möchte eine Projektanfrage besprechen.')} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d7aa57] px-5 text-sm font-extrabold text-[#10293e]"><MessageCircle size={17} /> WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0c2233] text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 py-9 text-sm text-white/60 sm:flex-row sm:items-end sm:justify-between lg:px-10">
          <div>
            <p className="font-display text-xl font-black text-white">RA Bau Lieferung</p>
            <p className="mt-2">Keramik und Baustellenzubehör · Projektbezogen für die Schweiz</p>
          </div>
          <div className="sm:text-right">
            <p>{storefront.phoneDisplay}</p>
            <p className="mt-1">{storefront.email}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
