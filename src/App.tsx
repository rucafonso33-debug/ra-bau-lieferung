import React, { useState } from 'react';
import { 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Package, 
  ChevronRight, 
  AlertTriangle, 
  Layers, 
  Sparkles, 
  Globe, 
  Compass, 
  Workflow, 
  Award,
  Maximize2,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Building,
  User,
  Send,
  HelpCircle
} from 'lucide-react';
import { PageRoute } from './types';
import { constructionCategories, interiorCategories } from './data';

export default function App() {
  const whatsappNumber = "+41 78 241 89 13";
  const cleanNumber = "41782418913";
  
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    phone: '',
    email: '',
    message: '',
    interests: [] as string[]
  });

  const getProductWhatsAppLink = (productName: string) => {
    const message = `Guten Tag, ich interessiere mich für ${productName}. Können Sie mir bitte weitere Informationen und eine unverbindliche Offerte senden?`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };
  
  const getWhatsAppLink = (type: string) => {
    let message = "Guten Tag, ich möchte gerne eine Anfrage für Baumaterial senden. Können Sie mir bitte weiterhelfen?";
    
    switch(type) {
      case "general_ask":
        message = "Guten Tag, ich möchte gerne eine allgemeine Anfrage für Baumaterial senden. Können Sie mir bitte weiterhelfen?";
        break;
      case "project_quote":
        message = "Guten Tag, ich möchte ein Projekt anfragen. Können Sie uns bitte eine Offerte für das Projekt erstellen?";
        break;
      case "special_bulk":
        message = "Guten Tag, ich interessiere mich für größere Mengen auf unserer Baustelle. Können Sie mir bitte eine unverbindliche Spezialofferte senden?";
        break;
    }
    
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const current = [...prev.interests];
      const idx = current.indexOf(interest);
      if (idx > -1) {
        current.splice(idx, 1);
      } else {
        current.push(interest);
      }
      return { ...prev, interests: current };
    });
  };

  const submitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.email) {
      alert("Bitte füllen Sie mindestens Name und E-Mail aus.");
      return;
    }
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      company: '',
      contactName: '',
      phone: '',
      email: '',
      message: '',
      interests: []
    });
    setFormSubmitted(false);
  };

  const handleNavigation = (page: PageRoute) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const usps = [
    { icon: <ShieldCheck className="w-5 h-5 text-yellow-500" />, title: "SIA-Konform" },
    { icon: <Truck className="w-5 h-5 text-yellow-500" />, title: "24h Blitz-Express" },
    { icon: <Globe className="w-5 h-5 text-yellow-500" />, title: "Direktimport" },
    { icon: <CheckCircle2 className="w-5 h-5 text-yellow-500" />, title: "Bestpreis ab Werk" }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-yellow-500 selection:text-black scroll-smooth">
      
      {/* Top Warning/Trust Bar */}
      <div className="bg-yellow-500 text-zinc-950 text-xs sm:text-sm py-2.5 px-4 font-bold text-center sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <Truck className="w-4 h-4 animate-bounce" />
          <span>Direktimporteur für die Schweiz | ⚡ 24h Express für Baustellen-Zubehör | 🚢 Direktbezug ab Werk</span>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="bg-white border-b border-zinc-200 sticky top-[38px] sm:top-[44px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('home')}>
              <div className="flex flex-col leading-none">
                <span className="font-black text-xl sm:text-2xl tracking-tighter text-[#004b87]">RA BAU</span>
                <span className="font-bold text-[9px] sm:text-[11px] tracking-[0.25em] text-zinc-500 uppercase">Lieferung</span>
              </div>
              <div className="w-px h-8 bg-zinc-200 mx-1 hidden sm:block"></div>
              <Truck className="w-6 h-6 text-[#004b87] hidden sm:block" />
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold text-zinc-700">
              <button 
                onClick={() => handleNavigation('home')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'home' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('baustellenzubehoor')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'baustellenzubehoor' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Baustellenzubehör
              </button>
              <button 
                onClick={() => handleNavigation('interior')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'interior' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Interior Finishing
              </button>
              <button 
                onClick={() => handleNavigation('porcelain')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'porcelain' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Porcelain Tiles
              </button>
              <button 
                onClick={() => handleNavigation('mosaics')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'mosaics' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Premium Mosaics
              </button>
              <button 
                onClick={() => handleNavigation('spc')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'spc' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                SPC Flooring
              </button>
              <button 
                onClick={() => handleNavigation('bathroom')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'bathroom' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Bathroom Solutions
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'contact' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Kontakt
              </button>
            </div>

            {/* Offerte CTA Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <a 
                href={getWhatsAppLink("general_ask")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-white px-3 sm:px-4 py-2 rounded-full font-bold transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Offerte</span>
                <span className="sm:hidden">Offerte</span>
              </a>

              {/* Mobile Menu Icon */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-zinc-200 py-3 px-4 shadow-inner space-y-1">
            <button 
              onClick={() => handleNavigation('home')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${currentPage === 'home' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Home (Startseite)
            </button>
            <button 
              onClick={() => handleNavigation('baustellenzubehoor')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${currentPage === 'baustellenzubehoor' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Baustellenzubehör
            </button>
            <button 
              onClick={() => handleNavigation('interior')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${currentPage === 'interior' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Interior Finishing Overview
            </button>
            <button 
              onClick={() => handleNavigation('porcelain')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${currentPage === 'porcelain' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Porcelain Tiles (Feinsteinzeug)
            </button>
            <button 
              onClick={() => handleNavigation('mosaics')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${currentPage === 'mosaics' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Premium Mosaics (Mosaike)
            </button>
            <button 
              onClick={() => handleNavigation('spc')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${currentPage === 'spc' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              SPC / Vinyl Flooring
            </button>
            <button 
              onClick={() => handleNavigation('bathroom')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${currentPage === 'bathroom' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Bathroom Solutions (Sanitär)
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${currentPage === 'contact' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Kontakt & Sourcing
            </button>
          </div>
        )}
      </nav>

      {/* RENDER PAGES BASED ON NAVIGATION STATE */}
      
      {/* -------------------- HOME PAGE -------------------- */}
      {currentPage === 'home' && (
        <>
          {/* Header Hero */}
          <header className="relative bg-zinc-950 text-white overflow-hidden py-20 lg:py-28">
            <div className="absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 via-zinc-950/80 to-zinc-950"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 text-zinc-300 font-semibold text-xs sm:text-sm mb-6 border border-zinc-800 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-yellow-500" />
                <span>Schweizer Lieferant für Bauunternehmungen & Plattenleger 🇨🇭</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-6xl mb-6 uppercase leading-tight">
                Baumaterial & Innenausbau <br />
                <span className="text-yellow-500">Direkt ab Werk in die Schweiz</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mb-8 leading-relaxed font-normal">
                Express-Logistik für <strong className="text-white font-semibold">Baustellenzubehör & Nivelliersysteme</strong> (24h Express) gepaart mit Direktimport feinster <strong className="text-white font-semibold">Innenausbau-Veredelungen</strong> direkt aus Portugal & Spanien.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="w-full sm:w-auto bg-yellow-500 text-zinc-950 px-8 py-4 rounded-full font-black text-base hover:bg-yellow-400 transition-all text-center uppercase tracking-wide shadow-lg"
                >
                  Unverbindliche Offerte
                </button>
                <a 
                  href={getWhatsAppLink("general_ask")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-4 rounded-full font-black text-base transition-all text-center uppercase tracking-wide shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Kontakt
                </a>
              </div>
            </div>

            {/* USPs Bar */}
            <div className="relative border-t border-zinc-900 mt-16 bg-zinc-950/75 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  {usps.map((usp, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2.5">
                      <div className="bg-zinc-900 p-1.5 rounded-md border border-zinc-800">
                        {usp.icon}
                      </div>
                      <span className="font-bold text-xs sm:text-sm tracking-widest uppercase text-zinc-200">{usp.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Core Categories Navigation Link Cards */}
          <section className="py-20 bg-zinc-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs uppercase font-black tracking-widest text-[#004b87] bg-blue-50 px-3 py-1 rounded">
                  Sortiments-Katalog
                </span>
                <h2 className="text-3xl md:text-4xl font-black uppercase text-zinc-900 tracking-tight mt-3">
                  Unsere Produktbereiche entdecken
                </h2>
                <p className="text-zinc-600 mt-2 font-medium">
                  Richten Sie Ihre Baustelle zweckerfüllend ein oder veredeln Sie Wohnflächen mit unseren SIA-konformen Importmaterialien.
                </p>
              </div>

              {/* Grid of separate category links */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                
                {/* 1. Baustellenzubehör */}
                <div 
                  onClick={() => handleNavigation('baustellenzubehoor')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between p-6 cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl w-12 h-12 flex items-center justify-center">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase text-zinc-900 text-lg leading-tight">Baustellen- Zubehör</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
                        Fliesen Clips, Keile, Schraubsysteme, Schutzkappen, Abstandshalter & Bindedraht.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-6 group-hover:translate-x-1 transition-transform">
                    <span>Produkte sehen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2. Porcelain Tiles */}
                <div 
                  onClick={() => handleNavigation('porcelain')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between p-6 cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-stone-100 text-amber-800 rounded-xl w-12 h-12 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#af9131]" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase text-zinc-900 text-lg leading-tight">Porcelain Tiles (Feinsteinzeug)</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
                        Feinsteinzeug in Travertin-, Stein- und Holzoptiken für Boden und Wandflächen.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-6 group-hover:translate-x-1 transition-transform">
                    <span>Fliesen sehen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3. Premium Mosaics */}
                <div 
                  onClick={() => handleNavigation('mosaics')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between p-6 cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-stone-100 text-zinc-800 rounded-xl w-12 h-12 flex items-center justify-center">
                      <Layers className="w-6 h-6 text-[#004b87]" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase text-zinc-900 text-lg leading-tight">Premium Mosaike</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
                        Riegelmosaike, KitKat-Design und Naturstein-Optiken für Duschen und Akzentbahnen.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-6 group-hover:translate-x-1 transition-transform">
                    <span>Mosaike sehen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 4. SPC / Vinyl Flooring */}
                <div 
                  onClick={() => handleNavigation('spc')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between p-6 cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-teal-50 text-teal-700 rounded-xl w-12 h-12 flex items-center justify-center">
                      <Award className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase text-zinc-900 text-lg leading-tight">SPC/Vinyl Klickböden</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
                        Extrem robuste, kratzfeste und vollkommen wasserfeste Vinyl-Platten mit Trittschalldämmung.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-6 group-hover:translate-x-1 transition-transform">
                    <span>Böden sehen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 5. Bathroom Solutions */}
                <div 
                  onClick={() => handleNavigation('bathroom')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between p-6 cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl w-12 h-12 flex items-center justify-center">
                      <Compass className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase text-zinc-900 text-lg leading-tight">Bathroom Solutions</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
                        Flache Mineralguss-Duschwannen, schwebende Waschtische und schwarze Armaturen.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-6 group-hover:translate-x-1 transition-transform">
                    <span>Sanitär sehen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>

              {/* Main Call to Actions for Home Catalog */}
              <div className="flex flex-wrap justify-center items-center gap-4 mt-12 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm max-w-2xl mx-auto">
                <span className="text-sm font-bold text-zinc-700">Wir erstellen Ihnen ein exaktes Projekt-Angebot ab Werk:</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleNavigation('contact')}
                    className="bg-[#004b87] text-white hover:bg-[#003b6b] px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Offerte anfordern
                  </button>
                  <a 
                    href={getWhatsAppLink("general_ask")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white hover:bg-[#1ebe57] px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* Sourcing Section Block */}
          <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
                <div className="text-left space-y-4 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-yellow-500 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Direktbezug aus Portugal & Spanien</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
                    Bauen Sie mit Direktimport-Vorteil
                  </h3>
                  <p className="text-stone-300 font-medium text-base leading-relaxed">
                    Als Direktvertreter beschaffen wir Feinsteinzeug-Platten, Premium-Mosaike und widerstandsfähige Vinylböden direkt von unseren Partner-Produktionsstätten in Portugal und Spanien. Ohne Umwege, direkt auf Ihr Projekt beziehungsweise Ihr Zentrallager verzollt und geliefert.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-stone-200 uppercase tracking-wider pt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                      <span>Keine teuren Margen von Zwischenhändlern</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                      <span>SIA-zertifizierte Qualitäts-Schlüssel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                      <span>Maßgeschneiderte Grossmengen-Preise</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                      <span>Komplette Fracht & Zollabwicklung</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto flex-shrink-0">
                  <button 
                    onClick={() => handleNavigation('contact')}
                    className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-[#1C1A16] px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-colors shadow-lg whitespace-nowrap"
                  >
                    Offerte anfordern
                  </button>
                  <a 
                    href={getWhatsAppLink("general_ask")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white border border-stone-700 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-5 h-5 text-yellow-500" />
                    <span>Sourcing-Support</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Workflow */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-xs font-black uppercase text-[#004b87] tracking-widest">Unkomplizierte Projektabwicklung</p>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-2">In 3 Schritten zum Baumaterial</h2>
                <div className="w-20 h-1 bg-[#004b87] mx-auto mt-3"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-zinc-300 border-t border-dashed border-zinc-400"></div>
                
                <div className="relative flex flex-col items-center text-center p-6 bg-zinc-50 rounded-2xl">
                  <div className="w-16 h-16 bg-[#004b87] rounded-full flex items-center justify-center text-xl font-black text-white mb-6 relative z-10 shadow-md">
                    1
                  </div>
                  <h3 className="text-lg font-bold mb-2 uppercase">Material auswählen</h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    Wählen Sie die gewünschten Artikel aus dem Katalog – von Baustellenzubehör bis hin zu feinsten Belagsplatten.
                  </p>
                </div>

                <div className="relative flex flex-col items-center text-center p-6 bg-zinc-50 rounded-2xl">
                  <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-xl font-black text-yellow-500 mb-6 relative z-10 shadow-md">
                    2
                  </div>
                  <h3 className="text-lg font-bold mb-2 uppercase">Kontakt absenden</h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    Senden Sie uns eine Anfrage per Kontaktformular oder starten Sie direkt den Chat über den grünen Button.
                  </p>
                </div>

                <div className="relative flex flex-col items-center text-center p-6 bg-zinc-50 rounded-2xl">
                  <div className="w-16 h-16 bg-[#004b87] rounded-full flex items-center justify-center text-xl font-black text-yellow-500 mb-6 relative z-10 shadow-md">
                    3
                  </div>
                  <h3 className="text-lg font-bold mb-2 uppercase">Direktlieferung erhalten</h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    Wir disponieren die Lieferung SIA-konform bis zu Ihrem Lager oder direkt verzollt auf die jeweilige Schweizer Baustelle.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Symmetrical Bulk Panel */}
          <section className="py-12 bg-zinc-50 border-t border-zinc-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-zinc-900 rounded-2xl p-8 md:p-10 text-center flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-800 shadow-xl">
                <div className="text-left flex items-start gap-4">
                  <Package className="w-10 h-10 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">Großmengen & Spezialpreise?</h3>
                    <p className="text-zinc-400 text-sm font-medium">
                      Planen Sie ein größeres Neubau-Projekt in der Schweiz? Wir führen kundenindividuelle Kalkulationen durch und reduzieren Ihre Einstandspreise ab Werk substanziell.
                    </p>
                  </div>
                </div>
                <a 
                  href={getWhatsAppLink("special_bulk")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider transition-colors whitespace-nowrap shadow-md"
                >
                  Spezialpreis anfordern <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        </>
      )}


      {/* -------------------- BAUSTELLENZUBEHÖR PAGE -------------------- */}
      {currentPage === 'baustellenzubehoor' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-black tracking-widest text-[#004b87] bg-blue-50 px-3.5 py-1.5 rounded-md">
                Bausparten-Konstruktion & Nivellierung
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 mt-4 mb-2">
                Baustellenzubehör
              </h1>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-4"></div>
              <p className="text-zinc-500 text-base sm:text-lg font-medium">
                Sofort lieferbares Schalungs- und Fliesenzubehör direkt zur Weiterverarbeitung. Beständige Werkzeuge für den professionellen Bauleiter und Handwerker.
              </p>
            </div>

            {/* Warning Alarm Panel for prompt builders */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-12 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-zinc-900 uppercase text-sm">Baustellensupport & Blitzversand</h4>
                <p className="text-xs text-zinc-600 mt-1">
                  Verzögerungen auf der Baustelle führen zu ungeplanten Ausfallkosten. Unser Zubehör liefern wir Ihnen via 24-48h Express-Logistik aus unserem schweizerischen Umschlagplatz!
                </p>
              </div>
              <a 
                href={getWhatsAppLink("general_ask")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-black py-2.5 px-4 rounded-lg uppercase tracking-wider shrink-0 transition-colors"
              >
                Express anfordern
              </a>
            </div>

            {/* List Construction Categories with all 11 pieces */}
            <div className="space-y-20">
              {constructionCategories.map((category, catIdx) => (
                <div key={catIdx} className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#004b87] border-l-4 border-yellow-500 pl-4 py-0.5">
                      {category.title}
                    </h3>
                    <div className="flex-1 h-px bg-zinc-200"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {category.products.map((product, idx) => (
                      <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-zinc-200/80 flex flex-col group hover:shadow-[0_8px_30px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 h-full">
                        
                        {/* Image Frame */}
                        <div className="aspect-square bg-zinc-50 border-b border-zinc-150 p-6 flex items-center justify-center relative overflow-hidden group-hover:bg-[#f4f4f5] transition-all duration-300">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 max-h-[190px] mix-blend-multiply rounded"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // Fallback display
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement?.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'text-zinc-400');
                              if (e.currentTarget.parentElement && !e.currentTarget.parentElement.querySelector('.fallback-icon')) {
                                const container = e.currentTarget.parentElement;
                                const fallback = document.createElement('div');
                                fallback.className = 'fallback-icon flex flex-col items-center text-zinc-400 text-xs text-center font-bold';
                                fallback.innerHTML = `
                                  <svg class="w-12 h-12 mb-2 text-[#004b87]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                  <span>${product.name} Image</span>
                                `;
                                container.appendChild(fallback);
                              }
                            }}
                          />
                        </div>

                        {/* Product Detail Info */}
                        <div className="p-5 flex flex-col flex-grow bg-white">
                          <h4 className="text-base sm:text-lg font-black mb-1.5 uppercase tracking-tight text-zinc-900 leading-tight">
                            {product.name}
                          </h4>
                          
                          <p className="text-zinc-500 mb-5 flex-grow text-xs leading-normal font-medium">
                            {product.description}
                          </p>
                          
                          <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100 mb-5 mt-auto">
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                              Anwendung & Dimensionen
                            </span>
                            <span className="text-xs font-bold text-zinc-700 flex items-start gap-1.5 leading-tight">
                              <CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                              <span>{product.application}</span>
                            </span>
                          </div>
                          
                          <a 
                            href={getProductWhatsAppLink(product.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-zinc-900"
                          >
                            <MessageCircle className="w-4 h-4 text-yellow-400" />
                            <span>Jetzt anfragen</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Symmetrical Bulk Sourcing Footer */}
            <div className="mt-20 bg-zinc-900 rounded-3xl p-8 md:p-12 text-center flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-800 shadow-xl max-w-6xl mx-auto">
              <div className="text-left flex items-start gap-4">
                <div className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 text-yellow-400">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">Spezialpreise für Bauunternehmungen?</h3>
                  <p className="text-zinc-400 text-sm font-medium">
                    Bei Bestellung von Paletten oder Großkartons stellen wir individuelle Stückpreise zusammen und sichern Ihnen attraktive Mengenrabatte ab Werk.
                  </p>
                </div>
              </div>
              <a 
                href={getWhatsAppLink("special_bulk")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider transition-colors whitespace-nowrap shadow-md"
              >
                Spezialofferte anfordern <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>
      )}


      {/* -------------------- INTERIOR FINISHING OVERVIEW PAGE -------------------- */}
      {currentPage === 'interior' && (
        <section className="bg-[#FAF9F5] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 text-stone-800 font-bold text-xs uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5 text-stone-600" />
                <span>Premium Swiss Selection</span>
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase text-stone-900 tracking-tight leading-none">
                Interior Finishing
              </h1>
              <div className="w-20 h-1 bg-amber-600 mx-auto mt-4 mb-4"></div>
              <p className="text-stone-600 text-base sm:text-lg font-medium leading-relaxed">
                Als Exklusiv-Vertreter beschaffen wir architektonische Meistergüter für Boden, Wand und Badgestaltung direkt ab Werk in Spanien und Portugal. Ohne teuren Zwischenhandel, vollständig verzollt und frachtkoordiniert frei Baustelle geliefert.
              </p>
            </div>

            {/* Portal grid displaying the 4 major inner categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Category 1: Porcelain Tiles */}
              <div 
                onClick={() => handleNavigation('porcelain')}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                  <img 
                    src="/images/travertino-60x120.png" 
                    alt="Porcelain Tiles Category" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-400">Sparte 01</span>
                    <h3 className="font-black uppercase text-xl sm:text-2xl tracking-tight">Porcelain Tiles (Feinsteinzeug)</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-stone-500 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                    Kuratierte, extrem langlebige Boden- und Wandplatten mit naturgetreuen Travertin- und Sichtbetonstrukturen. Perfekt rektifizierte Kanten für moderne Plattenleger.
                  </p>
                  <button className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-amber-800">
                    <span>Auswahl & Formate ansehen</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category 2: Premium Mosaics */}
              <div 
                onClick={() => handleNavigation('mosaics')}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                  <img 
                    src="/images/beige-stone-mosaic.png" 
                    alt="Premium Mosaics Category" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-400">Sparte 02</span>
                    <h3 className="font-black uppercase text-xl sm:text-2xl tracking-tight">Premium Mosaics (Mosaike)</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-stone-500 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                    Anspruchsvolle, netzgeklebte Mosaikstrukturen, Stein-Schliffe und KitKat-Riegel für ansprechende Nischen, Spa-Anlagen, Duschböden und Hotels.
                  </p>
                  <button className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-amber-800">
                    <span>Mosaik-Varianten ansehen</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category 3: SPC / Vinyl Flooring */}
              <div 
                onClick={() => handleNavigation('spc')}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                  <img 
                    src="/images/light-oak-spc.png" 
                    alt="SPC Category" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-400">Sparte 03</span>
                    <h3 className="font-black uppercase text-xl sm:text-2xl tracking-tight">SPC / Vinyl Flooring (Böden)</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-stone-500 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                    100 % wasserfeste Klickböden mit integrierter Trittschalldämmung und robuster Verschleißschicht. Extrem maßstabil und verformungsresistent.
                  </p>
                  <button className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-amber-800">
                    <span>Dekore & Stärken ansehen</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category 4: Bathroom Solutions */}
              <div 
                onClick={() => handleNavigation('bathroom')}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                  <img 
                    src="/images/minimalist-bathroom.png" 
                    alt="Bathroom Solutions Category" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-400">Sparte 04</span>
                    <h3 className="font-black uppercase text-xl sm:text-2xl tracking-tight">Bathroom Solutions</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-stone-500 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                    Formschöne, schwebende Waschtische, flache Duschwannen und exklusive, mattschwarze Armatur-Details für vollkommen zeitgemäße Badezimmer.
                  </p>
                  <button className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-amber-800">
                    <span>Sanitärobjekte ansehen</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* General Sourcing Call to Action with no prices */}
            <div className="mt-20 bg-[#1C1A16] rounded-3xl p-8 md:p-14 text-white border border-stone-800/80 transition-all shadow-xl max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-left space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-850 text-yellow-400 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  <Globe className="w-3.5 h-3.5" />
                  <span>SIA Schweizer Standard</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-1">
                  Werksanfrage konfigurieren
                </h3>
                <p className="text-stone-300 text-sm font-medium leading-relaxed">
                  Übermitteln Sie uns Ihre Mengen- und Spezifikationswünsche. Wir organisieren den Direktbezug, kümmern uns um die schlüsselfertige Verzollung und koordinieren die Fracht bis vor Ihre Tür.
                </p>
              </div>
              <button 
                onClick={() => handleNavigation('contact')}
                className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider whitespace-nowrap shadow-md"
              >
                Projekt-Angebot anfordern
              </button>
            </div>

          </div>
        </section>
      )}


      {/* -------------------- PORCELAIN TILES PAGE -------------------- */}
      {currentPage === 'porcelain' && (
        <section className="bg-[#FAF9F5] py-16 text-stone-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black tracking-widest uppercase text-stone-400">
                Sparte 01 / Feinsteinzeug
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-stone-900 mt-2 mb-2">
                Porcelain Tiles
              </h1>
              <div className="w-20 h-1 bg-amber-800 mx-auto mb-4"></div>
              <p className="text-stone-600 text-base sm:text-lg font-medium">
                Edles, stark beanspruchbares Feinsteinzeug für anspruchsvolle Wand- und Bodenlandschaften im Innen- und Außenbereich. Rektifizierte Platten mit fantastischen Strukturtiefen.
              </p>
            </div>

            {/* List category products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {interiorCategories[0].products.map((product, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 flex flex-col group hover:shadow-[0_12px_40px_rgba(40,30,10,0.06)] hover:-translate-y-1.5 transition-all duration-300 h-full">
                  
                  {/* Photo with hover scale */}
                  <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative border-b border-stone-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[9px] font-bold text-stone-800 tracking-wider uppercase border border-stone-100/60">
                      SIA Geprüft
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-black text-stone-900 uppercase leading-snug tracking-tight mb-2">
                      {product.name}
                    </h4>
                    
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-grow font-medium">
                      {product.details}
                    </p>
                    
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-stone-800 mb-5">
                      <span className="text-[9px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                        Spezifikation & Dimension
                      </span>
                      <span className="text-xs font-bold leading-normal text-stone-700">
                        {product.spec}
                      </span>
                    </div>
                    
                    <a 
                      href={getProductWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-stone-900 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-yellow-400" />
                      <span>Projekt-Offerte anfragen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* General contact card */}
            <div className="mt-16 bg-white p-8 rounded-2xl border border-stone-200 max-w-3xl mx-auto text-center space-y-4">
              <HelpCircle className="w-10 h-10 text-amber-700 mx-auto" />
              <h3 className="text-xl font-black uppercase">Sie suchen eine bestimmte Oberflächenoptik?</h3>
              <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
                Unsere Partnerwerke in Portugal und Spanien produzieren hunderte weitere Abgüsse und Dekors. Senden Sie uns einfach Ihr Wunschdesign als Foto per WhatsApp.
              </p>
              <div className="pt-2 flex justify-center gap-4">
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-3 px-6 rounded-full uppercase"
                >
                  Individuelles Sourcing
                </button>
              </div>
            </div>

          </div>
        </section>
      )}


      {/* -------------------- PREMIUM MOSAICS PAGE -------------------- */}
      {currentPage === 'mosaics' && (
        <section className="bg-[#FAF9F5] py-16 text-stone-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black tracking-widest uppercase text-stone-400">
                Sparte 02 / Premium Mosaike
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-stone-900 mt-2 mb-2">
                Premium Mosaics
              </h1>
              <div className="w-20 h-1 bg-amber-800 mx-auto mb-4"></div>
              <p className="text-stone-600 text-base sm:text-lg font-medium">
                Charakterstarke Verzierungen und formschöne Riegelmosaike für anspruchsvolle Hotelprojekte, Spa-Einrichtungen und stilvolle Duschlandschaften.
              </p>
            </div>

            {/* List Mosaics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {interiorCategories[1].products.map((product, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 flex flex-col group hover:shadow-[0_12px_40px_rgba(40,30,10,0.06)] hover:-translate-y-1.5 transition-all duration-300 h-full">
                  
                  {/* Photo with hover scale */}
                  <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative border-b border-stone-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[9px] font-bold text-stone-800 tracking-wider uppercase border border-stone-100/60">
                      Top Haptik
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-black text-stone-900 uppercase leading-snug tracking-tight mb-2">
                      {product.name}
                    </h4>
                    
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-grow font-medium">
                      {product.details}
                    </p>
                    
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-stone-800 mb-5">
                      <span className="text-[9px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                        Spezifikation & Dimension
                      </span>
                      <span className="text-xs font-bold leading-normal text-stone-700">
                        {product.spec}
                      </span>
                    </div>
                    
                    <a 
                      href={getProductWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-stone-900 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-yellow-400" />
                      <span>Projekt-Offerte anfragen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium hotel spa mood block */}
            <div className="mt-16 bg-[#1C1A16] rounded-3xl p-8 md:p-12 text-white border border-stone-800 max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-8 justify-between">
              <div className="text-left max-w-xl space-y-2">
                <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Premium-Badarchitektur</span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white">Präzision & Haptik für Nasszonen</h3>
                <p className="text-stone-300 text-sm">
                  Unsere Luxusmosaike zeichnen sich durch absolute Maßhaltigkeit aus und erleichtern das präzise Fugen-Ausrichten auch an Rundungen oder Winkeln.
                </p>
              </div>
              <button 
                onClick={() => handleNavigation('contact')}
                className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
              >
                Muster anfragen
              </button>
            </div>

          </div>
        </section>
      )}


      {/* -------------------- SPC / VINYL FLOORING PAGE -------------------- */}
      {currentPage === 'spc' && (
        <section className="bg-[#FAF9F5] py-16 text-stone-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black tracking-widest uppercase text-stone-400">
                Sparte 03 / Wasserfester Klick-Designbelag
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-stone-900 mt-2 mb-2">
                SPC / Vinyl Flooring
              </h1>
              <div className="w-20 h-1 bg-amber-800 mx-auto mb-4"></div>
              <p className="text-stone-600 text-base sm:text-lg font-medium">
                Premium-Designböden mit mineralischem Kern für herausragende Formstabilität und Trittschalldämmung. 100 % feuchtigkeitsresistent – traumhaft verlegbar in Küche und Nassbereichen.
              </p>
            </div>

            {/* List SPC */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {interiorCategories[2].products.map((product, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 flex flex-col group hover:shadow-[0_12px_40px_rgba(40,30,10,0.06)] hover:-translate-y-1.5 transition-all duration-300 h-full">
                  
                  {/* Photo with hover scale */}
                  <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative border-b border-stone-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[9px] font-bold text-stone-800 tracking-wider uppercase border border-stone-100/60">
                      Wasserfest
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-black text-stone-900 uppercase leading-snug tracking-tight mb-2">
                      {product.name}
                    </h4>
                    
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-grow font-medium">
                      {product.details}
                    </p>
                    
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-stone-800 mb-5">
                      <span className="text-[9px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                        Spezifikation & Dimension
                      </span>
                      <span className="text-xs font-bold leading-normal text-stone-700">
                        {product.spec}
                      </span>
                    </div>
                    
                    <a 
                      href={getProductWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-stone-900 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-yellow-400" />
                      <span>Projekt-Offerte anfragen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Robust flooring quality text */}
            <div className="mt-16 bg-white p-8 rounded-2xl border border-stone-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
              <div className="bg-amber-100 p-4 rounded-xl text-amber-800 shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black uppercase text-lg text-stone-900">Vorteil des SPC-Klickbodens</h4>
                <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                  Stone Plastic Composite (SPC) besitzt im Gegensatz zu regulärem Laminat oder älterem Vinyl einen festen Stein-Polyester-Kern. Das minimiert jegliche Dehn- und Schrumpfbewegung bei Temperaturschwankungen und verzeiht stehendes Wasser ohne jegliches Aufquellen.
                </p>
              </div>
            </div>

          </div>
        </section>
      )}


      {/* -------------------- BATHROOM SOLUTIONS PAGE -------------------- */}
      {currentPage === 'bathroom' && (
        <section className="bg-[#FAF9F5] py-16 text-stone-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black tracking-widest uppercase text-stone-400">
                Sparte 04 / Sanitär-Keramik & Badmöbel
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-stone-900 mt-2 mb-2">
                Bathroom Solutions
              </h1>
              <div className="w-20 h-1 bg-amber-800 mx-auto mb-4"></div>
              <p className="text-stone-600 text-base sm:text-lg font-medium">
                Kompromisslos moderne Sanitär-Keramik, pflegeleichte Nano-Glasuren, flache Duschwannen und exklusive mattschwarze Armatur-Lösungen für Ihr Renovationsprojekt.
              </p>
            </div>

            {/* List Sanitär */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {interiorCategories[3].products.map((product, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 flex flex-col group hover:shadow-[0_12px_40px_rgba(40,30,10,0.06)] hover:-translate-y-1.5 transition-all duration-300 h-full">
                  
                  {/* Photo with hover scale */}
                  <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative border-b border-stone-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[9px] font-bold text-stone-800 tracking-wider uppercase border border-stone-100/60">
                      Minimal Design
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-black text-stone-900 uppercase leading-snug tracking-tight mb-2">
                      {product.name}
                    </h4>
                    
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-grow font-medium">
                      {product.details}
                    </p>
                    
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-stone-800 mb-5">
                      <span className="text-[9px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                        Spezifikation & Dimension
                      </span>
                      <span className="text-xs font-bold leading-normal text-stone-700">
                        {product.spec}
                      </span>
                    </div>
                    
                    <a 
                      href={getProductWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-stone-900 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-yellow-400" />
                      <span>Projekt-Offerte anfragen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom bathroom design sourcing panel */}
            <div className="mt-16 bg-white p-8 rounded-2xl border border-stone-200 max-w-3xl mx-auto text-center space-y-4">
              <Compass className="w-10 h-10 text-amber-700 mx-auto" />
              <h3 className="text-xl font-black uppercase">Sie suchen komplette Badezimmer-Sets?</h3>
              <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
                Wir rüsten komplette Überbauungen und Sanierungen aus. Gerne planen wir maßgeschneiderte Sanitärobjekte nach Ihren gewünschten SIA-Schnittstellen.
              </p>
              <div className="pt-2 flex justify-center gap-4">
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-3 px-6 rounded-full uppercase"
                >
                  Sanitäranfrage senden
                </button>
              </div>
            </div>

          </div>
        </section>
      )}


      {/* -------------------- CONTACT PAGE -------------------- */}
      {currentPage === 'contact' && (
        <section className="py-16 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-black tracking-widest text-[#004b87] bg-blue-50 px-3 py-1 rounded">
                Schweizer Großhandels-Sourcing
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 mt-3 mb-2">
                Kontakt & Anfrage
              </h1>
              <div className="w-20 h-1 bg-[#004b87] mx-auto mb-4"></div>
              <p className="text-zinc-500 text-base sm:text-lg font-medium leading-relaxed">
                Kontaktieren Sie uns unkompliziert. Ob eiliges Baustellenzubehör, dringende Nivellier-Clips (24h Express) oder detaillierte Offerten für keramische Plattenimporte. Wir beraten Sie kompetent.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
              
              {/* Left Column: Fast Action contact buttons */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Positioning text card */}
                <div className="bg-[#004b87] text-white p-8 rounded-2xl shadow-md border border-blue-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  <h3 className="font-black uppercase text-xl sm:text-2xl mb-3 tracking-tight">RA BAU Sourcing</h3>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
                    Als Schweizer Direktimporteur verzollen und liefern wir erstklassige Fabrikate direkt ab Werk. Durch den Wegfall des stationären Fachhandels und Lager-Margen garantieren wir Ihnen extrem konkurrenzfähige Konditionen bei konstant hoher Lieferzuverlässigkeit.
                  </p>
                  
                  <div className="mt-6 flex flex-col gap-2 text-xs uppercase font-semibold text-white/90 tracking-wider">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-yellow-400" />
                      <span>SIA-konforme Ausführungen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-yellow-400" />
                      <span>Verzollung & Fracht übernommen</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Quick Contacts */}
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
                  <h4 className="font-black uppercase text-zinc-800 text-sm tracking-widest border-b border-zinc-100 pb-2">
                    Schnell-Kontakt
                  </h4>
                  
                  <div className="space-y-4">
                    {/* WhatsApp Action */}
                    <a 
                      href={getWhatsAppLink("general_ask")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 rounded-xl transition-all border border-emerald-150 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#25D366] text-white rounded-lg">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold block text-emerald-800 tracking-wider uppercase leading-none">WhatsApp Chat</span>
                          <span className="text-base font-black tracking-tight">{whatsappNumber}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Phone Call Link */}
                    <a 
                      href={`tel:${cleanNumber}`}
                      className="flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-950 rounded-xl transition-all border border-zinc-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#004b87] text-white rounded-lg">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold block text-zinc-500 tracking-wider uppercase leading-none">Direkt anrufen</span>
                          <span className="text-base font-black tracking-tight">{whatsappNumber}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Email Link */}
                    <a 
                      href="mailto:rucafonso33@gmail.com"
                      className="flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-950 rounded-xl transition-all border border-zinc-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-zinc-800 text-white rounded-lg">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold block text-zinc-500 tracking-wider uppercase leading-none">E-Mail schicken</span>
                          <span className="text-base font-black tracking-tight text-zinc-800">rucafonso33@gmail.com</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <div className="text-center pt-2 text-zinc-500 text-xs font-medium flex items-center justify-center gap-1.5 leading-relaxed">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>Lieferungen in die gesamte Schweiz 🇨🇭</span>
                  </div>
                </div>

              </div>

              {/* Right Column: HTML Contact Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-zinc-900 mb-6 tracking-tight">Projekt-Anfrage Formular</h3>
                
                {formSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-emerald-950 uppercase">Vielen Dank für Ihre Anfrage!</h4>
                    <p className="text-emerald-800 text-sm max-w-md mx-auto leading-relaxed">
                      Ihre Nachricht wurde erfolgreich übermittelt. Ein RA BAU Sourcing-Spezialist wird sich innerhalb der nächsten Stunden telefonisch oder per E-Mail bei Ihnen melden.
                    </p>
                    
                    <div className="bg-white p-4 rounded-xl border border-emerald-150 inline-block text-left text-xs text-zinc-600 space-y-1.5">
                      <p><strong>Name:</strong> {formData.contactName}</p>
                      <p><strong>E-Mail:</strong> {formData.email}</p>
                      <p><strong>Zuständige Sparte(n):</strong> {formData.interests.join(", ") || "Allgemeine Anfrage"}</p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                      <button 
                        onClick={resetForm}
                        className="bg-zinc-800 hover:bg-zinc-900 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-colors"
                      >
                        Neues Formular senden
                      </button>
                      <a 
                        href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Guten Tag, ich habe das Anfrageformular ausgefüllt (Name: ${formData.contactName}). Bitte prüfen Sie meine Offertenanfrage.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Sofort per WhatsApp pushen</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submitContactForm} className="space-y-5 text-left">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Firmenname (optional)</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                            <Building className="w-4 h-4" />
                          </span>
                          <input 
                            type="text" 
                            placeholder="Z.B. Muster AG" 
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="block w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#004b87] transition-all"
                          />
                        </div>
                      </div>

                      {/* Contact Name */}
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Ansprechpartner <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                            <User className="w-4 h-4" />
                          </span>
                          <input 
                            type="text" 
                            required 
                            placeholder="Ihr vollständiger Name" 
                            value={formData.contactName}
                            onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                            className="block w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#004b87] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Telefonnummer (für Rückfragen)</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input 
                            type="tel" 
                            placeholder="+41 79 123 45 67" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="block w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#004b87] transition-all"
                          />
                        </div>
                      </div>

                      {/* E-mail */}
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">E-Mail-Adresse <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input 
                            type="email" 
                            required 
                            placeholder="name@firma.ch" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="block w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#004b87] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sparte Checklist Selection */}
                    <div>
                      <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Interessante Produktsparten</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        
                        <label className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-100 select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.interests.includes('Baustellenzubehör')} 
                            onChange={() => handleInterestToggle('Baustellenzubehör')}
                            className="w-4 h-4 accent-[#004b87]"
                          />
                          <span className="font-semibold text-zinc-700">Baustellenzubehör</span>
                        </label>

                        <label className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-100 select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.interests.includes('Porcelain Tiles')} 
                            onChange={() => handleInterestToggle('Porcelain Tiles')}
                            className="w-4 h-4 accent-[#004b87]"
                          />
                          <span className="font-semibold text-zinc-700">Porcelain Tiles (Feinsteinzeug)</span>
                        </label>

                        <label className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-100 select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.interests.includes('Premium Mosaics')} 
                            onChange={() => handleInterestToggle('Premium Mosaics')}
                            className="w-4 h-4 accent-[#004b87]"
                          />
                          <span className="font-semibold text-zinc-700">Premium Mosaics (Mosaike)</span>
                        </label>

                        <label className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-100 select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.interests.includes('SPC Vinyl Flooring')} 
                            onChange={() => handleInterestToggle('SPC Vinyl Flooring')}
                            className="w-4 h-4 accent-[#004b87]"
                          />
                          <span className="font-semibold text-zinc-700">SPC Klick-vinyl</span>
                        </label>

                        <label className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-100 select-none sm:col-span-2">
                          <input 
                            type="checkbox" 
                            checked={formData.interests.includes('Bathroom Solutions')} 
                            onChange={() => handleInterestToggle('Bathroom Solutions')}
                            className="w-4 h-4 accent-[#004b87]"
                          />
                          <span className="font-semibold text-zinc-700">Bathroom Solutions (Sanitärobjekte & Möbel)</span>
                        </label>

                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Mitteilung / Projekt-Beschreibung</label>
                      <textarea 
                        rows={4} 
                        placeholder="Wie können wir Ihnen weiterhelfen? Bitte nennen Sie uns gewünschte Quadratmeter / Stückzahlen." 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="block w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#004b87] transition-all focus:ring-1 focus:ring-[#004b87]"
                      />
                    </div>

                    {/* Submission Button */}
                    <button 
                      type="submit" 
                      className="w-full flex items-center justify-center gap-2 bg-[#004b87] hover:bg-[#003b6b] text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-colors shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Unverbindliche Anfrage absenden</span>
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>
        </section>
      )}


      {/* FOOTER - SHARED ACROSS ALL PAGES */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start text-center md:text-left">
            
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2 grayscale brightness-200">
                <div className="font-black text-3xl tracking-tighter text-white">
                  RA <span className="text-zinc-300">BAU</span><br/>
                  <span className="text-zinc-300 text-xl leading-none">LIEFERUNG</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500 max-w-sm">
                Ihr zuverlässiger Schweizer Partner für Direktimport von erstklassigem Baustellenzubehör, Schalungshilfen und hochwertigen Innenausbau-Materialien.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">Direktbezug</h4>
              <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                Dank direkter Vertretung führender Werke in Portugal und Spanien umgehen wir den teuren Zwischenhandel. Sie profitieren von unschlagbaren Einstandskonditionen.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">Direktkontakt</h4>
              <a href={`tel:${cleanNumber}`} className="flex items-center gap-2 hover:text-yellow-500 transition-colors text-lg font-black text-white">
                {whatsappNumber}
              </a>
              <a href="mailto:rucafonso33@gmail.com" className="flex items-center gap-2 hover:text-yellow-500 transition-colors text-sm">
                rucafonso33@gmail.com
              </a>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">Logistik & Versand</h4>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-yellow-500"/> Zubehör: Lieferung binnen 24-48h</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-yellow-500"/> Innenausbau: Projektbezogen geliefert</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-yellow-500"/> Komplette Zoll- und Frachtabwicklung</li>
              </ul>
            </div>

          </div>
          
          <div className="mt-16 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-600 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
              <button onClick={() => handleNavigation('home')} className="hover:text-zinc-400">Home</button>
              <span>•</span>
              <button onClick={() => handleNavigation('baustellenzubehoor')} className="hover:text-zinc-400">Baustellenzubehör</button>
              <span>•</span>
              <button onClick={() => handleNavigation('interior')} className="hover:text-zinc-400">Interior Finishing</button>
              <span>•</span>
              <button onClick={() => handleNavigation('contact')} className="hover:text-zinc-400">Kontakt</button>
            </div>
            <p>© {new Date().getFullYear()} RA Bau Lieferung. Alle Rechte vorbehalten. Direktimport-Sourcing für die Schweiz.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={getWhatsAppLink("general_ask")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4.5 rounded-full shadow-2xl hover:bg-[#1ebe57] hover:scale-110 transition-all flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-zinc-900 text-white text-xs font-bold px-3.5 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Sofort-Offerte anfragen!
        </span>
      </a>

    </div>
  );
}
