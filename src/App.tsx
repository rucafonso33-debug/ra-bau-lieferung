import { MessageCircle, Truck, ShieldCheck, Clock, CheckCircle2, ArrowRight, Package, Info, ChevronRight, AlertTriangle } from 'lucide-react';

export default function App() {
  const whatsappNumber = "+41 78 241 89 13";
  const cleanNumber = "41782418913";
  
  const getWhatsAppLink = (type?: string) => {
    let message = "Guten Tag, ich möchte gerne eine Anfrage für Baumaterial senden. Können Sie mir bitte weiterhelfen?";
    
    switch(type) {
      case "Fliesen Clips":
        message = "Guten Tag, ich interessiere mich für Fliesen Clips. Können Sie mir bitte eine unverbindliche Offerte mit Größen, Preisen und Lieferzeit senden?";
        break;
      case "Nivelliersystem Keile":
        message = "Guten Tag, ich interessiere mich für Nivelliersystem Keile. Können Sie mir bitte eine unverbindliche Offerte mit Preisen und Lieferzeit senden?";
        break;
      case "Schraubsystem":
        message = "Guten Tag, ich interessiere mich für das Schraubsystem für Fliesen. Können Sie mir bitte eine unverbindliche Offerte mit Preisen und Lieferzeit senden?";
        break;
      case "Komplettset":
        message = "Guten Tag, ich interessiere mich für das Komplettset für Fliesen-Nivelliersysteme. Können Sie mir bitte Preis und Lieferzeit senden?";
        break;
      case "Fugenkreuze":
        message = "Guten Tag, ich interessiere mich für Fugenkreuze. Können Sie mir bitte verfügbare Größen, Preise und Lieferzeit senden?";
        break;
      case "Distanzhalter (Turm)":
        message = "Guten Tag, ich interessiere mich für Distanzhalter Turm. Können Sie mir bitte verfügbare Höhen, Preise und Lieferzeit senden?";
        break;
      case "Distanzhalter Stern":
        message = "Guten Tag, ich interessiere mich für Distanzhalter Stern. Können Sie mir bitte verfügbare Größen, Preise und Lieferzeit senden?";
        break;
      case "Distanzleiste":
        message = "Guten Tag, ich interessiere mich für Distanzleisten. Können Sie mir bitte verfügbare Größen, Preise und Lieferzeit senden?";
        break;
      case "Schutzkappen für Eisen":
        message = "Guten Tag, ich interessiere mich für Schutzkappen für Armierungseisen. Können Sie mir bitte verfügbare Größen, Preise und Lieferzeit senden?";
        break;
      case "Bindedraht":
        message = "Guten Tag, ich interessiere mich für Bindedraht. Können Sie mir bitte Preis, Verpackungseinheit und Lieferzeit senden?";
        break;
      case "Bindehaken":
        message = "Guten Tag, ich interessiere mich für Bindehaken / Bindewerkzeug. Können Sie mir bitte Preis und Lieferzeit senden?";
        break;
      case "bulk":
        message = "Guten Tag, ich interessiere mich für größere Mengen. Können Sie mir bitte eine unverbindliche Spezialofferte senden?";
        break;
    }
    
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  const categories = [
    {
      title: "Fliesen-Nivelliersysteme",
      products: [
        {
          name: "Fliesen Clips",
          description: "Professionelle Fliesenclips für präzise und gleichmäßige Verlegung.",
          application: "Verfügbar in 1 mm, 1.5 mm, 2 mm und 3 mm",
          image: "/images/fliesen-clips.png"
        },
        {
          name: "Nivelliersystem Keile",
          description: "Robuste und wiederverwendbare Keile für professionelle Fliesenarbeiten.",
          application: "Perfekter Druck auf Fliesen",
          image: "/images/nivellier-keile.jpg"
        },
        {
          name: "Fugenkreuze",
          description: "Für gleichmäßige Fliesenabstände.",
          application: "2-5 mm verfügbar",
          image: "/images/fugenkreuze.jpg"
        },
        {
          name: "Komplettset",
          description: "Komplettset für professionelle Fliesenarbeiten (Clips, Keile, Zange).",
          application: "Sofort einsatzbereit",
          image: "/images/Komplettset.png"
        }
      ]
    },
    {
      title: "Beton & Armierung",
      products: [
        {
          name: "Distanzhalter (Turm)",
          description: "Stabile Auflage für Bewehrung. Verschiedene Höhen.",
          application: "Höhen: 20–50 mm",
          image: "/images/distanzhalter-turm.jpg"
        },
        {
          name: "Distanzhalter Stern",
          description: "Runder Abstandshalter für Bewehrung. Sorgt für Konstanz.",
          application: "Durchmesser: 40–50 mm",
          image: "/images/distanzhalter-stern.jpg"
        },
        {
          name: "Distanzleiste",
          description: "Lineares Abstandshaltersystem für gleichmäßige Bewehrungsführung.",
          application: "Länge: 2 m",
          image: "/images/Distanzleiste.jpg"
        },
        {
          name: "Schutzkappen für Eisen",
          description: "Schutzkappen für freiliegende Bewehrungsenden.",
          application: "Für Armierungseisen",
          image: "/images/Schutzkappen.jpg"
        },
        {
          name: "Bindedraht",
          description: "Qualitätsbindedraht für Bewehrung. Flexibel, stark und einfach.",
          application: "Verpackung: 1 kg pro Rolle",
          image: "/images/Bindedraht.jpg"
        },
        {
          name: "Bindehaken",
          description: "Ergonomisches Werkzeug zum schnellen und sicheren Binden.",
          application: "Robust und langlebig",
          image: "/images/Bindehaken.jpg"
        }
      ]
    }
  ];

  const usps = [
    { icon: <ShieldCheck className="w-6 h-6 text-yellow-500" />, title: "Zuverlässig" },
    { icon: <Clock className="w-6 h-6 text-yellow-500" />, title: "Schnell" },
    { icon: <CheckCircle2 className="w-6 h-6 text-yellow-500" />, title: "Faire Preise" }
  ];

  const steps = [
    { number: "1", title: "Material wählen", description: "Suchen Sie sich das passende Zubehör aus." },
    { number: "2", title: "WhatsApp senden", description: "Klicken Sie auf Bestellen und senden Sie uns Ihre Anfrage." },
    { number: "3", title: "Schnelle Lieferung", description: "Wir liefern direkt und pünktlich auf Ihre Baustelle." }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-yellow-500 selection:text-black">
      
      {/* Top Info Bar - Urgency & Trust */}
      <div className="bg-yellow-500 text-zinc-950 text-sm sm:text-base py-2 px-4 font-bold text-center sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Truck className="w-5 h-5" />
          <span>Lieferung in der ganzen Schweiz | ⚡ Schnell & zuverlässig</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-zinc-200 sticky top-[40px] sm:top-[44px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="font-black text-xl sm:text-2xl tracking-tighter text-[#004b87]">RA BAU</span>
              <span className="font-bold text-[10px] sm:text-xs tracking-[0.2em] text-zinc-500 uppercase">Lieferung</span>
            </div>
            <div className="w-px h-8 bg-zinc-200 mx-1 hidden sm:block"></div>
            <Truck className="w-6 h-6 sm:w-7 h-7 text-[#004b87]" />
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
              Live Status: Aktiv
            </div>
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 h-5" />
              <span>Angebot</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086925-0c13d4f47c54?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/70 to-zinc-950"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 text-zinc-300 font-semibold text-sm sm:text-base mb-8 border border-zinc-700 backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-yellow-500" />
            <span>Zuverlässiger Partner in der Schweiz 🇨🇭</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl mb-6 uppercase leading-tight">
            Lieferung von Baumaterial <br className="hidden md:block" />
            <span className="text-yellow-500">heute bestellt, morgen auf der Baustelle</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-white font-bold max-w-3xl mb-10 bg-red-600/90 inline-block px-6 py-2 rounded-lg transform -rotate-1">
            24h Lieferung möglich in der ganzen Schweiz!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto mt-4">
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-5 rounded-full font-black text-xl transition-all transform hover:scale-105 w-full sm:w-auto shadow-xl shadow-[#25D366]/30 animate-pulse-slow"
            >
              <MessageCircle className="w-7 h-7" />
              Preis sofort per WhatsApp
            </a>
          </div>
        </div>

        {/* USPs Bar */}
        <div className="relative border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
              {usps.map((usp, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {usp.icon}
                  <span className="font-bold text-lg tracking-wide uppercase">{usp.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Pain Point Section */}
      <section className="py-20 bg-zinc-100 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 uppercase tracking-tight">
            Kein Material mehr auf der Baustelle?
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-700 mb-8">
            Zeitdruck im Nacken?
          </h3>
          <p className="text-xl text-zinc-600 mb-10 leading-relaxed">
            Wir kennen das Problem. Ein Baustopp kostet Geld und Nerven. Deshalb liefern wir <strong className="text-zinc-900">schnell und unkompliziert</strong> direkt zu Ihnen – damit Ihre Arbeit nicht stillsteht.
          </p>
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg"
          >
            Wir liefern sofort – Jetzt anfragen <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Products Section (Digital Catalog) */}
      <section className="py-20 bg-white" id="produkte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-zinc-900">Unser Sortiment</h2>
            <div className="w-24 h-1.5 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-zinc-600 text-xl font-medium">Bereits im Einsatz bei Profis auf der Baustelle.</p>
          </div>
          
          <div className="w-full">
            {categories.map((category, catIdx) => (
              <div key={catIdx} className="mb-24 last:mb-0">
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#004b87] border-l-4 border-yellow-500 pl-4 py-1">
                    {category.title}
                  </h3>
                  <div className="flex-1 h-px bg-zinc-200"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {category.products.map((product, idx) => (
                    <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-zinc-100 flex flex-col group hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 h-full">
                      
                      {/* Product Image Area */}
                      <div className="aspect-square bg-[#f4f4f5] border-b border-zinc-200 p-8 flex items-center justify-center relative overflow-hidden group-hover:bg-[#e4e4e7] transition-all duration-500">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 max-h-[220px] mix-blend-multiply contrast-[1.05]"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'text-zinc-400');
                            if (e.currentTarget.parentElement && !e.currentTarget.parentElement.querySelector('.fallback-icon')) {
                              const icon = document.createElement('div');
                              icon.className = 'fallback-icon text-sm font-medium';
                              icon.innerText = 'Bild hochladen';
                              e.currentTarget.parentElement.appendChild(icon);
                            }
                          }}
                        />
                      </div>

                      {/* Product Details Area */}
                      <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white">
                        <h4 className="text-lg sm:text-xl font-black mb-3 uppercase tracking-tight text-zinc-900 leading-tight">
                          {product.name}
                        </h4>
                        
                        <p className="text-zinc-600 mb-6 flex-grow text-sm leading-relaxed font-medium">
                          {product.description}
                        </p>
                        
                        <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100 mb-6 mt-auto">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                            Anwendung
                          </span>
                          <span className="text-sm font-bold text-zinc-800 flex items-start gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{product.application}</span>
                          </span>
                        </div>
                        
                        <a 
                          href={getWhatsAppLink(product.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-3.5 sm:py-4 rounded-xl font-bold text-base transition-colors shadow-md active:scale-95 border border-transparent mt-auto"
                        >
                          Jetzt bestellen
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bulk Orders Banner */}
          <div className="mt-16 bg-zinc-900 rounded-3xl p-8 md:p-12 text-center flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-zinc-800">
            <div className="text-left flex items-start gap-5">
              <Package className="w-12 h-12 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Größere Mengen?</h3>
                <p className="text-zinc-400 font-medium text-lg">Für Großprojekte bieten wir spezielle Konditionen. Mindestmenge ab 100 Stück.</p>
              </div>
            </div>
            <a 
              href={getWhatsAppLink("bulk")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-4 rounded-full font-black text-lg transition-colors whitespace-nowrap shadow-lg"
            >
              Spezialpreis anfragen <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">In 3 Schritten zum Material</h2>
            <div className="w-24 h-1.5 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-zinc-300 border-t-2 border-dashed border-zinc-400"></div>
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center bg-zinc-50 p-6">
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center text-3xl font-black text-yellow-500 mb-6 relative z-10 shadow-lg border-4 border-zinc-50">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase">{step.title}</h3>
                <p className="text-zinc-600 font-medium">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Strong CTA Section */}
      <section className="py-24 bg-yellow-500 text-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541888086925-0c13d4f47c54?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
            Material dringend benötigt?
          </h2>
          <p className="text-2xl md:text-3xl font-bold mb-12 opacity-90">
            Schnelle Lieferung. Faire Preise. Direkt auf Ihre Baustelle.
          </p>
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white px-12 py-6 rounded-full font-black text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-zinc-950/20"
          >
            <MessageCircle className="w-8 h-8" />
            Jetzt per WhatsApp bestellen
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center md:items-start text-center md:text-left">
            
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="flex items-center gap-2 grayscale brightness-200">
                <div className="font-black text-3xl tracking-tighter text-white">
                  RA <span className="text-zinc-300">BAU</span><br/>
                  <span className="text-zinc-300 text-xl leading-none">LIEFERUNG</span>
                </div>
                <Truck className="w-10 h-10 text-white ml-1" />
              </div>
              <p className="text-sm text-zinc-500 max-w-xs">
                Ihr zuverlässiger Partner für hochwertiges Schalungszubehör und Bewehrungsmaterial in der Schweiz.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-white font-bold uppercase tracking-wider mb-2">Kontakt</h4>
              <a href={`tel:${whatsappNumber.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 hover:text-yellow-500 transition-colors text-lg font-medium">
                {whatsappNumber}
              </a>
              <a href="mailto:rucafonso33@gmail.com" className="flex items-center gap-2 hover:text-yellow-500 transition-colors">
                rucafonso33@gmail.com
              </a>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-white font-bold uppercase tracking-wider mb-2">Informationen</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-yellow-500"/> Mindestmenge: ab 100 Stück</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-yellow-500"/> Größere Mengen auf Anfrage</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-yellow-500"/> Kurzfristige Lieferung möglich</li>
              </ul>
            </div>

          </div>
          
          <div className="mt-16 pt-8 border-t border-zinc-900 text-center text-sm text-zinc-600 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} RA Bau Lieferung. Alle Rechte vorbehalten.</p>
            <p>Schweiz</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:bg-[#1ebe57] hover:scale-110 transition-all flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-zinc-900 text-white text-sm font-bold px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Direkt bestellen!
        </span>
      </a>
    </div>
  );
}
