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
  HelpCircle,
  Info
} from 'lucide-react';
import { PageRoute } from './types';
import { constructionCategories, interiorCategories } from './data';
import { Logo } from './components/Logo';

export default function App() {
  const whatsappNumber = "+41 78 241 89 13";
  const cleanNumber = "41782418913";
  
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    phone: '',
    email: '',
    message: '',
    interests: [] as string[]
  });

  const getProductWhatsAppLink = (productName: string) => {
    const message = `Guten Tag, ich interessiere mich für ${productName}. Können Sie mir bitte weitere Informationen und eine Angebot senden?`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };
  
  const getWhatsAppLink = (type: string) => {
    let message = "Guten Tag, ich brauche Material für meine Baustelle. Können Sie mir helfen?";
    
    switch(type) {
      case "general_ask":
        message = "Guten Tag, ich möchte gerne eine Anfrage für Baumaterial machen. Können Sie mir bitte weiterhelfen?";
        break;
      case "project_quote":
        message = "Guten Tag, ich möchte Material für ein Projekt anfragen. Bitte erstellen Sie mir ein Angebot.";
        break;
      case "special_bulk":
        message = "Guten Tag, ich brauche eine Offerte für eine grössere Menge Baumaterial.";
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

  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.email) {
      alert("Bitte füllen Sie mindestens Name und E-Mail aus.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/rodrigo@ra-bau-lieferung.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: "Neue Materialanfrage von der Website!",
            Firmenname: formData.company,
            Ansprechpartner: formData.contactName,
            Telefon: formData.phone,
            Email: formData.email,
            Interessen: formData.interests.join(", "),
            Nachricht: formData.message
        })
      });
      
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert("Fehler beim Senden. Bitte versuchen Sie es später erneut.");
      }
    } catch (error) {
      alert("Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.");
    } finally {
      setIsSubmitting(false);
    }
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
    { icon: <ShieldCheck className="w-5 h-5 text-yellow-500" />, title: "SIA-Normen" },
    { icon: <Truck className="w-5 h-5 text-yellow-500" />, title: "Express-Logistik" },
    { icon: <Globe className="w-5 h-5 text-yellow-500" />, title: "Materialberatung" },
    { icon: <CheckCircle2 className="w-5 h-5 text-yellow-500" />, title: "Geprüfte Qualität" }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-yellow-500 selection:text-black scroll-smooth">
      
      {/* Top Warning/Trust Bar */}
      <div className="bg-[#004b87] text-white text-xs sm:text-sm py-2.5 px-4 font-bold text-center relative z-40 border-b border-[#003b6b]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap text-zinc-100 mt-0.5">
          <Truck className="w-4.5 h-4.5 text-yellow-500 animate-bounce" />
          <span>Zuverlässige Materiallieferung für Schweizer Projekte <span className="text-yellow-500 mx-1.5">•</span> Rascher Versand von Baustellenzubehör</span>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="bg-white border-b-2 border-yellow-500 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer select-none" onClick={() => handleNavigation('home')}>
              <Logo />
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
                Innenausbau
              </button>
              <button 
                onClick={() => handleNavigation('porcelain')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'porcelain' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Feinsteinzeug
              </button>
              <button 
                onClick={() => handleNavigation('mosaics')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'mosaics' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Premium Mosaike
              </button>
              <button 
                onClick={() => handleNavigation('spc')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'spc' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                SPC-Vinylböden
              </button>
              <button 
                onClick={() => handleNavigation('bathroom')}
                className={`px-3 py-2 rounded-md transition-all ${currentPage === 'bathroom' ? 'bg-[#004b87] text-white' : 'hover:bg-zinc-100 hover:text-zinc-900'}`}
              >
                Sanitärlösungen
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
                className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-white px-4 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Preis anfragen</span>
                <span className="sm:hidden">Anfragen</span>
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
          <div className="lg:hidden bg-white border-t border-zinc-200 py-3 px-4 shadow-xl space-y-1 animate-fadeIn max-h-[calc(100vh-5rem)] overflow-y-auto">
            <button 
              onClick={() => handleNavigation('home')}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentPage === 'home' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Home (Startseite)
            </button>
            <button 
              onClick={() => handleNavigation('baustellenzubehoor')}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentPage === 'baustellenzubehoor' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Baustellenzubehör
            </button>
            <button 
              onClick={() => handleNavigation('interior')}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentPage === 'interior' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Innenausbau (Übersicht)
            </button>
            <button 
              onClick={() => handleNavigation('porcelain')}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentPage === 'porcelain' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Feinsteinzeug (Fliesen)
            </button>
            <button 
              onClick={() => handleNavigation('mosaics')}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentPage === 'mosaics' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Premium Mosaike
            </button>
            <button 
              onClick={() => handleNavigation('spc')}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentPage === 'spc' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              SPC-Vinylböden
            </button>
            <button 
              onClick={() => handleNavigation('bathroom')}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentPage === 'bathroom' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Sanitärlösungen
            </button>
            <div className="h-px bg-zinc-150 my-1"></div>
            <button 
              onClick={() => handleNavigation('contact')}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentPage === 'contact' ? 'bg-[#004b87] text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
            >
              Kontakt & Preisanfrage
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
                <span>Material für Bauunternehmen, Gipser & Plattenleger 🇨🇭</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-6xl mb-6 uppercase leading-tight text-white font-display">
                Baumaterial direkt auf Ihre <br />
                <span className="text-yellow-500">Baustelle</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mb-8 leading-relaxed font-normal font-sans">
                Heute bestellt – morgen auf der Baustelle. Schnell und zuverlässig. Ihr Partner für <strong className="text-white font-semibold">Baustellenzubehör</strong> und hochwertiges <strong className="text-white font-semibold">Ausbaumaterial</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="w-full sm:w-auto bg-yellow-500 text-zinc-950 px-8 py-4 rounded-full font-black text-base hover:bg-yellow-400 transition-all text-center uppercase tracking-wide shadow-lg"
                >
                  Jetzt anfragen
                </button>
                <a 
                  href={getWhatsAppLink("general_ask")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-4 rounded-full font-black text-base transition-all text-center uppercase tracking-wide shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Direkt per WhatsApp
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
                <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#004b87] bg-yellow-400 px-2.5 py-1 rounded-md shadow-sm mb-2 inline-block">
                  Unser Sortiment
                </span>
                <h2 className="text-3xl md:text-4xl font-black uppercase text-[#004b87] tracking-tight mt-3">
                  Material für Profis
                </h2>
                <p className="text-zinc-600 mt-2 font-medium">
                  Alles für Ihre Baustelle. Von Zubehör für den Rohbau bis hin zu hochwertigen Platten für den Innenausbau.
                </p>
              </div>

              {/* Grid of separate category links */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                
                {/* 1. Baustellenzubehör */}
                <div 
                  onClick={() => handleNavigation('baustellenzubehoor')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img 
                      src="/images/01_BAUSTELLENZUBEHOER.png" 
                      alt="Baustellenzubehör" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[10px] bg-[#004b87] text-white font-black uppercase px-2 py-0.5 rounded tracking-wide">Sparte 01</span>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-black uppercase text-[#004b87] text-base sm:text-lg leading-tight font-display">Baustellenzubehör</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-sans">
                        Nivelliersysteme, Keile, Clips und Schutzkappen. Direkt ab Lager für Ihre Baustelle.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-4 group-hover:translate-x-1 transition-transform mt-auto">
                      <span>Zum Sortiment</span>
                      <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
                    </div>
                  </div>
                </div>

                {/* 2. Porcelain Tiles */}
                <div 
                  onClick={() => handleNavigation('porcelain')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img 
                      src="/images/02_MOSAIKE.png" 
                      alt="Feinsteinzeug" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[10px] bg-[#004b87] text-white font-black uppercase px-2 py-0.5 rounded tracking-wide">Sparte 02</span>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-black uppercase text-[#004b87] text-base sm:text-lg leading-tight font-display">Feinsteinzeug</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-sans">
                        Boden- und Wandplatten für Profis. Robust, präzise und massgenau rektifiziert.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-4 group-hover:translate-x-1 transition-transform mt-auto">
                      <span>Zum Sortiment</span>
                      <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
                    </div>
                  </div>
                </div>

                {/* 3. Premium Mosaics */}
                <div 
                  onClick={() => handleNavigation('mosaics')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img 
                      src="/images/03_PREMIUM_MOSAIKE.png" 
                      alt="Premium Mosaike" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[10px] bg-[#004b87] text-white font-black uppercase px-2 py-0.5 rounded tracking-wide">Sparte 03</span>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-black uppercase text-[#004b87] text-base sm:text-lg leading-tight font-display">Premium Mosaike</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-sans">
                        Mosaike für Duschen und Badezimmer. Einfach verlegbar und sofort lieferbar.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-4 group-hover:translate-x-1 transition-transform mt-auto">
                      <span>Zum Sortiment</span>
                      <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
                    </div>
                  </div>
                </div>

                {/* 4. SPC / Vinyl Flooring */}
                <div 
                  onClick={() => handleNavigation('spc')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img 
                      src="/images/04_SPC_VINYLBOEDEN.png" 
                      alt="SPC-Vinylböden" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[10px] bg-[#004b87] text-white font-black uppercase px-2 py-0.5 rounded tracking-wide">Sparte 04</span>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-black uppercase text-[#004b87] text-base sm:text-lg leading-tight font-display">SPC-Vinylböden</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-sans">
                        Zäh, massstabil und 100 % wasserfest. SPC-Klickböden für schnelles Verlegen.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-4 group-hover:translate-x-1 transition-transform mt-auto">
                      <span>Zum Sortiment</span>
                      <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
                    </div>
                  </div>
                </div>

                {/* 5. Bathroom Solutions */}
                <div 
                  onClick={() => handleNavigation('bathroom')}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#004b87] hover:shadow-lg transition-all group hover:-translate-y-1 duration-300"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img 
                      src="/images/05_SANITAERLOESUNGEN.png" 
                      alt="Sanitärlösungen" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[10px] bg-[#004b87] text-white font-black uppercase px-2 py-0.5 rounded tracking-wide">Sparte 05</span>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-black uppercase text-[#004b87] text-base sm:text-lg leading-tight font-display">Sanitärlösungen</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-sans">
                        Keramik, Duschtassen und Armaturen. Alles aus einer Hand für Ihr Badprojekt.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] pt-4 group-hover:translate-x-1 transition-transform mt-auto">
                      <span>Zum Sortiment</span>
                      <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Main Call to Actions for Home Catalog */}
              <div className="flex flex-wrap justify-center items-center gap-4 mt-12 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm max-w-2xl mx-auto">
                <span className="text-sm font-bold text-zinc-700">Haben Sie ein konkretes Projekt? Holen Sie sich jetzt ein Angebot:</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleNavigation('contact')}
                    className="bg-[#004b87] text-white hover:bg-[#003b6b] px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Preis anfragen
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
          <section className="py-20 bg-zinc-50 border-y border-zinc-200 text-zinc-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
                <div className="text-left space-y-4 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 text-[#004b87] rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm">
                    <Globe className="w-3.5 h-3.5 text-[#004b87]" />
                    <span>Direktlieferung</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-[#004b87] font-display">
                    Schnell. Direkt. Zuverlässig
                  </h3>
                  <p className="text-zinc-600 font-medium text-sm sm:text-base leading-relaxed">
                    Wir liefern Feinsteinzeug, Mosaike und SPC-Böden pünktlich und ohne Umwege. Verzollt und direkt an Ihr Zentrallager oder auf Ihre Baustelle in der Schweiz.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-zinc-700 uppercase tracking-wider pt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                      <span>Faire Preise für Profis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                      <span>SIA-konformes Material</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                      <span>Sonderkonditionen für Grossprojekte</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                      <span>Inklusive Verzollung & Lieferung</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto flex-shrink-0">
                  <button 
                    onClick={() => handleNavigation('contact')}
                    className="flex items-center justify-center bg-[#004b87] hover:bg-[#003b6b] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-colors shadow-md whitespace-nowrap"
                  >
                    Preis anfragen
                  </button>
                  <a 
                    href={getWhatsAppLink("general_ask")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-colors whitespace-nowrap shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <span>Direkter Kontakt</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Workflow */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-xs font-black uppercase text-[#004b87] tracking-widest">Schnell und unkompliziert</p>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#004b87] mt-3">
                  Einfach zum Material
                </h2>
                <div className="w-20 h-1 bg-yellow-500 mx-auto mt-3"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-zinc-300 border-t border-dashed border-zinc-400"></div>
                
                <div className="relative flex flex-col items-center text-center p-6 bg-zinc-50 rounded-2xl">
                  <div className="w-16 h-16 bg-[#004b87] rounded-full flex items-center justify-center text-xl font-black text-yellow-500 mb-6 relative z-10 shadow-md">
                    1
                  </div>
                  <h3 className="text-lg font-bold mb-2 uppercase">Material auswählen</h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    Wählen Sie das passende Material für Ihre Baustelle – von Zubehör bis zu Platten.
                  </p>
                </div>

                <div className="relative flex flex-col items-center text-center p-6 bg-zinc-50 rounded-2xl">
                  <div className="w-16 h-16 bg-[#004b87] rounded-full flex items-center justify-center text-xl font-black text-yellow-500 mb-6 relative z-10 shadow-md">
                    2
                  </div>
                  <h3 className="text-lg font-bold mb-2 uppercase">Anfrage senden</h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    Senden Sie Ihre Anfrage einfach via Formular oder schreiben Sie uns direkt per WhatsApp.
                  </p>
                </div>

                <div className="relative flex flex-col items-center text-center p-6 bg-zinc-50 rounded-2xl">
                  <div className="w-16 h-16 bg-[#004b87] rounded-full flex items-center justify-center text-xl font-black text-yellow-500 mb-6 relative z-10 shadow-md">
                    3
                  </div>
                  <h3 className="text-lg font-bold mb-2 uppercase">Direkt auf die Baustelle</h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    Wir liefern pünktlich und zuverlässig. Direkt an Ihr Lager oder verzollt auf Ihre Schweizer Baustelle.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Symmetrical Bulk Panel */}
          <section className="py-12 bg-zinc-50 border-t border-zinc-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl p-8 md:p-10 text-center flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-200 shadow-sm">
                <div className="text-left flex items-start gap-4">
                  <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 text-[#004b87]">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 uppercase tracking-tight mb-1 font-display">Grossprojekte & Sonderkonditionen</h3>
                    <p className="text-zinc-650 text-sm font-medium">
                      Planen Sie ein größeres Neubau- oder Renovationsvorhaben in der Schweiz? Wir kalkulieren kundenindividuelle Rahmenvereinbarungen für Ihren spezifischen Projektbedarf.
                    </p>
                  </div>
                </div>
                <a 
                  href={getWhatsAppLink("special_bulk")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#004b87] hover:bg-[#003b6b] text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors whitespace-nowrap shadow-md"
                >
                  Objektpreis anfragen <ArrowRight className="w-4 h-4 text-yellow-500" />
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
            
            {/* Page Header with Premium Showroom Visual */}
            <div className="bg-[#FAF9F5] border border-stone-200/60 rounded-3xl overflow-hidden p-6 sm:p-10 mb-16 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#004b87] bg-yellow-400 px-2.5 py-1 rounded-md shadow-sm mb-2">
                    Sparte 01 / Konstruktion & Nivellierung
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#004b87] leading-none font-display mb-4">
                    Baustellenzubehör
                  </h1>
                  <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl font-sans">
                    Zubehör für den Betonbau, Schalungen und für Plattenleger. Immer verfügbar, schnell auf die Baustelle geliefert. Für Profis gemacht.
                  </p>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-sans">
                    Präzisions-Komponenten • Hochfeste Materialien • Schweizer Qualitätsprüfung
                  </p>
                </div>
                <div className="lg:col-span-12 xl:col-span-5 h-[220px] rounded-2xl overflow-hidden shadow-inner border border-zinc-200/40">
                  <img 
                    src="/images/01_BAUSTELLENZUBEHOER.png" 
                    alt="Baustellenzubehör Premium Visual" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Warning Alarm Panel for prompt builders */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl mb-12 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
              <div className="p-2.5 bg-[#004b87] rounded-full text-yellow-500 shadow-sm">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
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
                className="bg-[#004b87] hover:bg-[#003b6b] text-white text-xs font-black py-2.5 px-4 rounded-lg uppercase tracking-wider shrink-0 transition-colors shadow-sm"
              >
                Sofort bestellen
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

                  {category.bannerImage && (
                    <div className="mb-10 rounded-2xl overflow-hidden h-[180px] sm:h-[260px] md:h-[320px] relative border border-zinc-200/60 shadow-sm bg-zinc-100">
                      {category.title === "Bewehrung & Betonbau" ? (
                        <div className="absolute inset-0 flex">
                          <img src="/images/distanzhalter-turm.jpg" className="w-1/4 object-cover object-center opacity-60 mix-blend-multiply" alt="Turm" referrerPolicy="no-referrer" />
                          <img src="/images/distanzhalter-stern.jpg" className="w-1/4 object-cover object-center opacity-60 mix-blend-multiply border-l border-white/20" alt="Stern" referrerPolicy="no-referrer" />
                          <img src="/images/Distanzleiste.jpg" className="w-1/4 object-cover object-center opacity-60 mix-blend-multiply border-l border-white/20" alt="Leiste" referrerPolicy="no-referrer" />
                          <img src="/images/Schutzkappen.jpg" className="w-1/4 object-cover object-center opacity-60 mix-blend-multiply border-l border-white/20" alt="Kappen" referrerPolicy="no-referrer" />
                        </div>
                      ) : category.title === "Fliesen-Nivelliersysteme" ? (
                        <div className="absolute inset-0 flex">
                          <img src="/images/fliesen-clips.png" className="w-1/4 object-cover object-center opacity-60 mix-blend-multiply" alt="Clips" referrerPolicy="no-referrer" />
                          <img src="/images/nivellier-keile-real.jpg.png" className="w-1/4 object-cover object-center opacity-60 mix-blend-multiply border-l border-white/20" alt="Keile" referrerPolicy="no-referrer" />
                          <img src="/images/fugenkreuze.jpg" className="w-1/4 object-cover object-center opacity-60 mix-blend-multiply border-l border-white/20" alt="Fugenkreuze" referrerPolicy="no-referrer" />
                          <img src="/images/fliesen-schraubsystem-real.jpg.png" className="w-1/4 object-cover object-center opacity-60 mix-blend-multiply border-l border-white/20" alt="Schraubsystem" referrerPolicy="no-referrer" />
                        </div>
                      ) : (
                        <img 
                          src={category.bannerImage} 
                          alt={category.title} 
                          className="w-full h-full object-cover select-none"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 flex flex-col justify-end p-5 sm:p-8 text-left">
                        <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#004b87] bg-yellow-400 px-2.5 py-1 rounded-md w-fit mb-2 select-none shadow-sm">
                          {catIdx === 0 ? "Plattenleger-Bedarf" : "Betonbau & Schalung"}
                        </span>
                        <p className="text-white text-xs sm:text-sm md:text-base font-bold max-w-2xl leading-relaxed drop-shadow-md">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  )}

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
                            className="flex items-center justify-center gap-2 w-full bg-[#004b87] hover:bg-[#003b6b] text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                          >
                            <ArrowRight className="w-4 h-4 text-yellow-500" />
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
            <div className="mt-20 bg-white border border-zinc-250/70 rounded-3xl p-8 md:p-12 text-zinc-900 shadow-sm max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left flex items-start gap-4">
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-[#004b87]">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-1 font-display">Sonderkonditionen für Grossprojekte</h3>
                  <p className="text-zinc-650 text-sm font-normal">
                    Bei größeren Bestellvolumen oder fortlaufendem Zubehörbedarf kalkulieren wir kaufmännisch optimierte Preisstrukturen für Sie.
                  </p>
                </div>
              </div>
              <a 
                href={getWhatsAppLink("special_bulk")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#004b87] hover:bg-[#003b6b] text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors whitespace-nowrap shadow-md"
              >
                Objektpreis anfragen <ArrowRight className="w-4 h-4 text-yellow-500" />
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
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#004b87] leading-none font-display mb-4">
                Innenausbau
              </h1>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4 mb-4"></div>
              <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed">
                Wir liefern erstklassige, architektonische Systembeläge und Sanitärausstattungen für anspruchsvolle Boden-, Wand- und Badkonzepte. Wir übernehmen für Schweizer Baupartner die vollständige Importabwicklung, Verzollung und koordinierte Lieferung direkt an Ihr Zentrallager oder Ihr Bauobjekt.
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
                    src="/images/02_MOSAIKE.png" 
                    alt="Porcelain Tiles Category" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500">Sparte 02</span>
                    <h3 className="font-bold uppercase text-xl sm:text-2xl tracking-tight font-display">Feinsteinzeug</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-stone-500 text-xs sm:text-sm font-normal leading-relaxed mb-6 font-sans">
                    Rektifizierte Boden- und Wandplatten in Naturstein- oder Betonoptik. Perfekt für schnelles und exaktes Verlegen.
                  </p>
                  <button className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] transition-colors group-hover:translate-x-1 transition-transform">
                    <span>Zum Sortiment</span>
                    <ArrowRight className="w-4 h-4 text-yellow-500" />
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
                    src="/images/03_PREMIUM_MOSAIKE.png" 
                    alt="Premium Mosaics Category" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500">Sparte 03</span>
                    <h3 className="font-bold uppercase text-xl sm:text-2xl tracking-tight font-display">Premium Mosaike</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-stone-500 text-xs sm:text-sm font-normal leading-relaxed mb-6 font-sans">
                    Netzgeklebte Mosaike für Duschen und Spa-Bereiche. Einfach zu verlegen, robust und in diversen Formaten sofort verfügbar.
                  </p>
                  <button className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] transition-colors group-hover:translate-x-1 transition-transform">
                    <span>Zum Sortiment</span>
                    <ArrowRight className="w-4 h-4 text-yellow-500" />
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
                    src="/images/04_SPC_VINYLBOEDEN.png" 
                    alt="SPC Category" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500">Sparte 04</span>
                    <h3 className="font-bold uppercase text-xl sm:text-2xl tracking-tight font-display">SPC-Vinylböden</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-stone-500 text-xs sm:text-sm font-normal leading-relaxed mb-6 font-sans">
                    Zäh, massstabil und 100 % wasserfest. SPC-Klickböden mit integrierter Trittschalldämmung. Schnell und unkompliziert verlegt.
                  </p>
                  <button className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] transition-colors group-hover:translate-x-1 transition-transform">
                    <span>Zum Sortiment</span>
                    <ArrowRight className="w-4 h-4 text-yellow-500" />
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
                    src="/images/05_SANITAERLOESUNGEN.png" 
                    alt="Bathroom Solutions Category" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500">Sparte 05</span>
                    <h3 className="font-bold uppercase text-xl sm:text-2xl tracking-tight font-display">Sanitärlösungen</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-[#555] text-xs sm:text-sm font-normal leading-relaxed mb-6 font-sans">
                    Waschtische, Duschtassen und moderne Armaturen. Bad-Lösungen direkt für Ihr Projekt. Alles für den professionellen Einbau.
                  </p>
                  <button className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider text-[#004b87] transition-colors group-hover:translate-x-1 transition-transform">
                    <span>Zum Sortiment</span>
                    <ArrowRight className="w-4 h-4 text-yellow-500" />
                  </button>
                </div>
              </div>

            </div>

            {/* General Sourcing Call to Action with no prices */}
            <div className="mt-20 bg-white border border-stone-200/85 rounded-3xl p-8 md:p-14 text-zinc-900 transition-all shadow-sm max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-left space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 text-[#004b87] rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm">
                  <Globe className="w-3.5 h-3.5 text-[#004b87]" />
                  <span>SIA Schweizer Standard</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-zinc-900 mb-1 font-display">
                  Projektanfrage konfigurieren
                </h3>
                <p className="text-stone-600 text-sm font-normal leading-relaxed font-sans">
                  Übermitteln Sie uns Ihre Mengen- und Spezifikationswünsche. Wir organisieren die schlüsselfertige Verzollung, sichern die logistische Abwicklung und liefern die Materialien termintreu an Ihre Schweizer Destination.
                </p>
              </div>
              <button 
                onClick={() => handleNavigation('contact')}
                className="bg-[#004b87] hover:bg-[#003b6b] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-md"
              >
                Objektpreis anfragen
              </button>
            </div>

          </div>
        </section>
      )}


      {/* -------------------- PORCELAIN TILES PAGE -------------------- */}
      {currentPage === 'porcelain' && (
        <section className="bg-[#FAF9F5] py-16 text-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header with Premium Showroom Visual */}
            <div className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden p-6 sm:p-10 mb-16 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#004b87] bg-yellow-400 px-2.5 py-1 rounded-md shadow-sm mb-2">
                    Sparte 02 / Feinsteinzeug
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#004b87] leading-none font-display mb-4">
                    Feinsteinzeug
                  </h1>
                  <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl font-sans">
                    Robuste Feinsteinzeugplatten für Wand und Boden. Massgenau rektifiziert, ideal für schnelles, sauberes Verlegen auf der Baustelle.
                  </p>
                  <p className="text-xs font-semibold text-zinc-450 uppercase tracking-wider font-sans">
                    SIA-Geprüft • Kalibrierte Schnittkanten • Naturstein-Haptik
                  </p>
                </div>
                <div className="lg:col-span-5 h-[220px] rounded-2xl overflow-hidden shadow-inner border border-stone-200/40">
                  <img 
                    src="/images/02_MOSAIKE.png" 
                    alt="Porcelain Tiles Showroom Picture" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Elegant Illustration & Sortiment Notice Banner */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 mb-8 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 text-left shadow-sm">
              <div className="p-2.5 bg-[#004b87] rounded-xl shrink-0 shadow-sm">
                <Info className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex-grow">
                <p className="text-[#004b87] font-black text-xs uppercase tracking-widest mb-0.5">
                  Visualisierung & Modellschnittstellen
                </p>
                <p className="text-stone-600 text-xs leading-relaxed font-medium">
                  Unsere Abbildungen dienen als **visuelle Orientierungshilfe (Symbolbilder)** für das gewünschte Design und Materialkonzept. Da wir über ein weitaus größeres Partnernetzwerk mit Hunderten anderer Formate, Schattierungen und Zusatzprodukte verfügen, passen wir das Sortiment flexibel an Ihre Schweizer Pläne an. Fragen Sie Ihr Wunschdekor einfach bei uns an!
                </p>
              </div>
              <a 
                href={getWhatsAppLink("general_ask")}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#004b87] hover:bg-[#003b6b] text-white text-[11px] font-bold py-2.5 px-4 rounded-xl uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Mehr Varianten anfragen</span>
                <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
              </a>
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
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[9px] font-bold text-stone-800 tracking-wider uppercase border border-stone-100/60">
                      SIA Geprüft
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-black/55 backdrop-blur-xs text-[8px] sm:text-[9px] text-stone-200 px-2 py-0.5 rounded font-bold select-none tracking-wider uppercase">
                      Symbolbild
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-bold text-zinc-900 uppercase leading-snug tracking-tight mb-2 font-display">
                      {product.name}
                    </h4>
                    
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-grow font-medium font-sans">
                      {product.details}
                    </p>
                    
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-stone-800 mb-5 mt-auto">
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
                      className="flex items-center justify-center gap-2 w-full bg-[#004b87] hover:bg-[#003b6b] text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-[#004b87] shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span>Jetzt anfragen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* General contact card */}
            <div className="mt-16 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm max-w-3xl mx-auto text-center space-y-4">
              <HelpCircle className="w-10 h-10 text-[#004b87] mx-auto" />
              <h3 className="text-xl font-black uppercase tracking-tight text-[#004b87]">Bestimmte Oberfläche gesucht?</h3>
              <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed font-normal">
                Unsere europäischen Partnerwerke produzieren zahlreiche weitere Ausführungen und Formate. Senden Sie uns einfach Ihre Spezifikationen oder Planungsunterlagen direkt per WhatsApp zu.
              </p>
              <div className="pt-2 flex justify-center gap-4">
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="bg-[#004b87] hover:bg-[#003b6b] text-white text-xs font-bold py-3 px-6 rounded-full uppercase"
                >
                  Jetzt anfragen
                </button>
              </div>
            </div>

          </div>
        </section>
      )}


      {/* -------------------- PREMIUM MOSAICS PAGE -------------------- */}
      {currentPage === 'mosaics' && (
        <section className="bg-[#FAF9F5] py-16 text-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header with Premium Showroom Visual */}
            <div className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden p-6 sm:p-10 mb-16 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#004b87] bg-yellow-400 px-2.5 py-1 rounded-md shadow-sm mb-2">
                    Sparte 03 / Premium Mosaike
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#004b87] leading-none font-display mb-4">
                    Premium Mosaike
                  </h1>
                  <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl font-sans">
                    Mosaike für Badezimmer, Duschen und Spa-Bereiche. Netzgeklebt und direkt ab Lager verfügbar.
                  </p>
                  <p className="text-xs font-semibold text-zinc-450 uppercase tracking-wider font-sans">
                    Premium Haptik • Kalibrierte Trägernetze • Edle Steinauswahl
                  </p>
                </div>
                <div className="lg:col-span-5 h-[220px] rounded-2xl overflow-hidden shadow-inner border border-stone-200/40">
                  <img 
                    src="/images/03_PREMIUM_MOSAIKE.png" 
                    alt="Premium Mosaics Showroom Landscape" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Elegant Illustration & Sortiment Notice Banner */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 mb-8 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 text-left shadow-sm">
              <div className="p-2.5 bg-[#004b87] rounded-xl shrink-0 shadow-sm">
                <Info className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex-grow">
                <p className="text-[#004b87] font-black text-xs uppercase tracking-widest mb-0.5">
                  Visualisierung & Modellschnittstellen
                </p>
                <p className="text-stone-600 text-xs leading-relaxed font-medium">
                  Unsere Abbildungen dienen als **visuelle Orientierungshilfe (Symbolbilder)** für das gewünschte Design und Materialkonzept. Da wir über ein weitaus größeres Partnernetzwerk mit Hunderten anderer Formate, Schattierungen und Zusatzprodukte verfügen, passen wir das Sortiment flexibel an Ihre Schweizer Pläne an. Fragen Sie Ihr Wunschdekor einfach bei uns an!
                </p>
              </div>
              <a 
                href={getWhatsAppLink("general_ask")}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#004b87] hover:bg-[#003b6b] text-white text-[11px] font-bold py-2.5 px-4 rounded-xl uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Mehr Varianten anfragen</span>
                <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
              </a>
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
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[9px] font-bold text-stone-800 tracking-wider uppercase border border-stone-100/60">
                      Top Haptik
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-black/55 backdrop-blur-xs text-[8px] sm:text-[9px] text-stone-200 px-2 py-0.5 rounded font-bold select-none tracking-wider uppercase">
                      Symbolbild
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-bold text-zinc-900 uppercase leading-snug tracking-tight mb-2 font-display">
                      {product.name}
                    </h4>
                    
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-grow font-medium font-sans">
                      {product.details}
                    </p>
                    
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-stone-800 mb-5 mt-auto">
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
                      className="flex items-center justify-center gap-2 w-full bg-[#004b87] hover:bg-[#003b6b] text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-[#004b87] shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span>Jetzt anfragen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium hotel spa mood block */}
            <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 text-zinc-900 border border-stone-200/60 shadow-sm max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-8 justify-between">
              <div className="text-left max-w-xl space-y-2">
                <span className="text-xs font-bold tracking-widest text-[#004b87] uppercase">Premium-Badarchitektur</span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#004b87] font-display">Präzision & Haptik für Nasszonen</h3>
                <p className="text-stone-600 text-sm font-normal">
                  Die verarbeiteten Premium-Mosaike zeichnen sich durch hohe Maßhaltigkeit aus und erleichtern das präzise Fugen-Ausrichten auch an Rundungen oder Winkeln.
                </p>
              </div>
              <button 
                onClick={() => handleNavigation('contact')}
                className="bg-[#004b87] hover:bg-[#003b6b] text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-sm"
              >
                Muster bestellen
              </button>
            </div>

          </div>
        </section>
      )}


      {/* -------------------- SPC / VINYL FLOORING PAGE -------------------- */}
      {currentPage === 'spc' && (
        <section className="bg-[#FAF9F5] py-16 text-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header with Premium Showroom Visual */}
            <div className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden p-6 sm:p-10 mb-16 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#004b87] bg-yellow-400 px-2.5 py-1 rounded-md shadow-sm mb-2">
                    Sparte 04 / Wasserfester Klick-Designbelag
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#004b87] leading-none font-display mb-4">
                    SPC-Vinylböden
                  </h1>
                  <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl font-sans">
                    100 % wasserfeste SPC-Böden mit Trittschalldämmung. Massstabil, einfach zu verlegen und extrem robust für starke Beanspruchung.
                  </p>
                  <p className="text-xs font-semibold text-zinc-450 uppercase tracking-wider font-sans">
                    Fester Steinkern (SPC) • Trittschall-Dämmung • Kratzfest
                  </p>
                </div>
                <div className="lg:col-span-5 h-[220px] rounded-2xl overflow-hidden shadow-inner border border-stone-200/40">
                  <img 
                    src="/images/04_SPC_VINYLBOEDEN.png" 
                    alt="SPC/Vinyl Flooring Showroom Picture" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Elegant Illustration & Sortiment Notice Banner */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 mb-8 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 text-left shadow-sm">
              <div className="p-2.5 bg-[#004b87] rounded-xl shrink-0 shadow-sm">
                <Info className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex-grow">
                <p className="text-[#004b87] font-black text-xs uppercase tracking-widest mb-0.5">
                  Visualisierung & Modellschnittstellen
                </p>
                <p className="text-stone-600 text-xs leading-relaxed font-medium">
                  Unsere Abbildungen dienen als **visuelle Orientierungshilfe (Symbolbilder)** für das gewünschte Design und Materialkonzept. Da wir über ein weitaus größeres Partnernetzwerk mit Hunderten anderer Formate, Schattierungen und Zusatzprodukte verfügen, passen wir das Sortiment flexibel an Ihre Schweizer Pläne an. Fragen Sie Ihr Wunschdekor einfach bei uns an!
                </p>
              </div>
              <a 
                href={getWhatsAppLink("general_ask")}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#004b87] hover:bg-[#003b6b] text-white text-[11px] font-bold py-2.5 px-4 rounded-xl uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Mehr Varianten anfragen</span>
                <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
              </a>
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
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[9px] font-bold text-stone-800 tracking-wider uppercase border border-stone-100/60">
                      Wasserfest
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-black/55 backdrop-blur-xs text-[8px] sm:text-[9px] text-stone-200 px-2 py-0.5 rounded font-bold select-none tracking-wider uppercase">
                      Symbolbild
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-bold text-zinc-900 uppercase leading-snug tracking-tight mb-2 font-display">
                      {product.name}
                    </h4>
                    
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-grow font-medium font-sans">
                      {product.details}
                    </p>
                    
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-stone-800 mb-5 mt-auto">
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
                      className="flex items-center justify-center gap-2 w-full bg-[#004b87] hover:bg-[#003b6b] text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-[#004b87] shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span>Jetzt anfragen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Robust flooring quality text */}
            <div className="mt-16 bg-white p-8 rounded-2xl border border-stone-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
              <div className="bg-[#004b87]/10 p-4 rounded-xl text-[#004b87] shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black uppercase text-[#004b87] text-lg">Vorteil des SPC-Klickbodens</h4>
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
        <section className="bg-[#FAF9F5] py-16 text-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header with Premium Showroom Visual */}
            <div className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden p-6 sm:p-10 mb-16 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#004b87] bg-yellow-400 px-2.5 py-1 rounded-md shadow-sm mb-2">
                    Sparte 05 / Sanitär-Keramik & Badmöbel
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#004b87] leading-none font-display mb-4">
                    Bathroom Solutions
                  </h1>
                  <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl font-sans">
                    Keramik, Duschtassen und mattschwarze Armaturen für moderne Badezimmer. Alles aus einer Hand für Ihr nächstes Bauprojekt.
                  </p>
                  <p className="text-xs font-semibold text-zinc-450 uppercase tracking-wider font-sans">
                    Nano-Beschichtung • Mineralguss-Duschwannen • SIA-Zertifiziertes Design
                  </p>
                </div>
                <div className="lg:col-span-5 h-[220px] rounded-2xl overflow-hidden shadow-inner border border-stone-200/40">
                  <img 
                    src="/images/05_SANITAERLOESUNGEN.png" 
                    alt="Bathroom Solutions Showroom Picture" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Elegant Illustration & Sortiment Notice Banner */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 mb-8 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 text-left shadow-sm">
              <div className="p-2.5 bg-[#004b87] rounded-xl shrink-0 shadow-sm">
                <Info className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex-grow">
                <p className="text-[#004b87] font-black text-xs uppercase tracking-widest mb-0.5">
                  Visualisierung & Modellschnittstellen
                </p>
                <p className="text-stone-600 text-xs leading-relaxed font-medium">
                  Unsere Abbildungen dienen als **visuelle Orientierungshilfe (Symbolbilder)** für das gewünschte Design und Materialkonzept. Da wir über ein weitaus größeres Partnernetzwerk mit Hunderten anderer Formate, Schattierungen und Zusatzprodukte verfügen, passen wir das Sortiment flexibel an Ihre Schweizer Pläne an. Fragen Sie Ihr Wunschdekor einfach bei uns an!
                </p>
              </div>
              <a 
                href={getWhatsAppLink("general_ask")}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#004b87] hover:bg-[#003b6b] text-white text-[11px] font-bold py-2.5 px-4 rounded-xl uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Mehr Varianten anfragen</span>
                <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
              </a>
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
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[9px] font-bold text-stone-800 tracking-wider uppercase border border-stone-100/60">
                      Minimal Design
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-black/55 backdrop-blur-xs text-[8px] sm:text-[9px] text-stone-200 px-2 py-0.5 rounded font-bold select-none tracking-wider uppercase">
                      Symbolbild
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-bold text-zinc-900 uppercase leading-snug tracking-tight mb-2 font-display">
                      {product.name}
                    </h4>
                    
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-grow font-medium font-sans">
                      {product.details}
                    </p>
                    
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-stone-800 mb-5 mt-auto">
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
                      className="flex items-center justify-center gap-2 w-full bg-[#004b87] hover:bg-[#003b6b] text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-[#004b87] shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span>Jetzt anfragen</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom bathroom design sourcing panel */}
            <div className="mt-16 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm max-w-3xl mx-auto text-center space-y-4">
              <Compass className="w-10 h-10 text-[#004b87] mx-auto" />
              <h3 className="text-xl font-black uppercase tracking-tight text-[#004b87]">Bad komplett ausstatten?</h3>
              <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
                Wir rüsten komplette Überbauungen und Sanierungen aus. Gerne planen wir maßgeschneiderte Sanitärobjekte nach Ihren gewünschten SIA-Schnittstellen.
              </p>
              <div className="pt-2 flex justify-center gap-4">
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="bg-[#004b87] hover:bg-[#003b6b] text-white text-xs font-bold py-3 px-6 rounded-full uppercase"
                >
                  Jetzt anfragen
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
              <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#004b87] bg-yellow-400 px-2.5 py-1 rounded-md shadow-sm mb-2">
                Lieferung für Bau & Handwerk
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#004b87] leading-none font-display mb-4">
                Kontakt & Projektanfrage
              </h1>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-4"></div>
              <p className="text-zinc-500 text-sm sm:text-base font-normal leading-relaxed">
                Direkter Kontakt, ohne Umwege. Ob eiliges Baustellenzubehör ab Lager oder eine Projektanfrage für Platten. Wir helfen Profis schnell weiter.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
              
              {/* Left Column: Fast Action contact buttons */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Positioning text card */}
                <div className="bg-[#004b87] text-white p-8 rounded-2xl shadow-md border border-blue-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  <h3 className="font-black uppercase text-xl sm:text-2xl mb-3 tracking-tight font-display">Ihr Partner für Baustellenmaterial.</h3>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
                    Als zuverlässiger Partner für Bau und Handwerk beliefern wir Bauunternehmungen, Plattenleger und Generalunternehmer mit erstklassigen Materialien. Durch optimierte logistische Abläufe und den Fokus auf Direktbelieferung gewährleisten wir Ihnen hervorragende Wirtschaftlichkeit bei maximaler Planbarkeit.
                  </p>
                  
                  <div className="mt-6 flex flex-col gap-2 text-xs uppercase font-semibold text-white/90 tracking-wider">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-yellow-500" />
                      <span>SIA-konforme Ausführungen</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <CheckCircle2 className="w-4.5 h-4.5 text-yellow-500" />
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
                      className="flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-950 rounded-xl transition-all border border-zinc-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#004b87] text-white rounded-lg">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold block text-zinc-500 tracking-wider uppercase leading-none">WhatsApp Chat</span>
                          <span className="text-base font-black tracking-tight">{whatsappNumber}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform" />
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
                      <ChevronRight className="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Email Link */}
                    <a 
                      href="mailto:rodrigo@ra-bau-lieferung.com"
                      className="flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-950 rounded-xl transition-all border border-zinc-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#004b87] text-white rounded-lg">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold block text-zinc-500 tracking-wider uppercase leading-none">E-Mail schicken</span>
                          <span className="text-base font-black tracking-tight text-zinc-800">rodrigo@ra-bau-lieferung.com</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <div className="text-center pt-2 text-zinc-500 text-xs font-medium flex items-center justify-center gap-1.5 leading-relaxed">
                    <MapPin className="w-4 h-4 text-yellow-500" />
                    <span>Lieferungen in die gesamte Schweiz 🇨🇭</span>
                  </div>
                </div>

              </div>

              {/* Right Column: HTML Contact Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#004b87] mb-6 tracking-tight">Material anfragen</h3>
                
                {formSubmitted ? (
                  <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-2xl text-center space-y-4">
                    <div className="w-16 h-16 bg-[#004b87] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h4 className="text-2xl font-black text-[#004b87] uppercase">Anfrage gesendet.</h4>
                    <p className="text-zinc-600 text-sm max-w-md mx-auto leading-relaxed">
                      Ihre Nachricht wurde erfolgreich übermittelt. Ein RA BAU Sourcing-Spezialist wird sich innerhalb der nächsten Stunden telefonisch oder per E-Mail bei Ihnen melden.
                    </p>
                    
                    <div className="bg-white p-4 rounded-xl border border-zinc-200 inline-block text-left text-xs text-zinc-600 space-y-1.5">
                      <p><strong>Name:</strong> {formData.contactName}</p>
                      <p><strong>E-Mail:</strong> {formData.email}</p>
                      <p><strong>Zuständige Sparte(n):</strong> {formData.interests.join(", ") || "Allgemeine Anfrage"}</p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                      <button 
                        onClick={resetForm}
                        className="bg-[#004b87] hover:bg-[#003b6b] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Neue Anfrage senden
                      </button>
                      <a 
                        href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Guten Tag, ich habe das Anfrageformular ausgefüllt (Name: ${formData.contactName}). Bitte prüfen Sie meine Materialanfrage.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Direkt per WhatsApp senden</span>
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
                            className="block w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-yellow-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Contact Name */}
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Ansprechpartner <span className="text-yellow-500">*</span></label>
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
                            className="block w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-yellow-500 transition-all"
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
                            className="block w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-yellow-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* E-mail */}
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">E-Mail-Adresse <span className="text-yellow-500">*</span></label>
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
                            className="block w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-yellow-500 transition-all"
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
                            className="w-4 h-4 accent-yellow-500"
                          />
                          <span className="font-semibold text-zinc-700">Baustellenzubehör</span>
                        </label>

                        <label className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-100 select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.interests.includes('Porcelain Tiles')} 
                            onChange={() => handleInterestToggle('Porcelain Tiles')}
                            className="w-4 h-4 accent-yellow-500"
                          />
                          <span className="font-semibold text-zinc-700">Porcelain Tiles (Feinsteinzeug)</span>
                        </label>

                        <label className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-100 select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.interests.includes('Premium Mosaics')} 
                            onChange={() => handleInterestToggle('Premium Mosaics')}
                            className="w-4 h-4 accent-yellow-500"
                          />
                          <span className="font-semibold text-zinc-700">Premium Mosaics (Mosaike)</span>
                        </label>

                        <label className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-100 select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.interests.includes('SPC Vinyl Flooring')} 
                            onChange={() => handleInterestToggle('SPC Vinyl Flooring')}
                            className="w-4 h-4 accent-yellow-500"
                          />
                          <span className="font-semibold text-zinc-700">SPC Klick-vinyl</span>
                        </label>

                        <label className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-100 select-none sm:col-span-2">
                          <input 
                            type="checkbox" 
                            checked={formData.interests.includes('Bathroom Solutions')} 
                            onChange={() => handleInterestToggle('Bathroom Solutions')}
                            className="w-4 h-4 accent-yellow-500"
                          />
                          <span className="font-semibold text-zinc-700">Bathroom Solutions (Sanitärobjekte & Möbel)</span>
                        </label>

                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Ihre Anfrage / Materialliste</label>
                      <textarea 
                        rows={4} 
                        placeholder="Was brauchen Sie? (z.B. Artikel, Menge, Lieferort)" 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="block w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-yellow-500 transition-all focus:ring-1 focus:ring-yellow-500"
                      />
                    </div>

                    {/* Submission Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <Send className={`w-4 h-4 text-zinc-900 ${isSubmitting ? 'animate-pulse' : ''}`} />
                      <span>{isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'}</span>
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>
        </section>
      )}


      {/* FOOTER - SHARED ACROSS ALL PAGES */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 border-t-[3px] border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start text-center md:text-left">
            
            <div className="flex flex-col items-center md:items-start gap-4">
              <Logo invert={true} />
              <p className="text-xs text-zinc-500 max-w-sm">
                Ihr zuverlässiger Schweizer Partner für die Materiallieferung von erstklassigem Baustellenzubehör, Schalungshilfen und hochwertigen Innenausbau-Materialien.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">Ziele & Mehrwert</h4>
              <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                Durch die Bündelung von Logistikströmen und schlanke administrative Abläufe sichern wir eine kosteneffiziente Materialbereitstellung und verlässliche SIA-konforme Ausführungsqualität.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">Direktkontakt</h4>
              <a href={`tel:${cleanNumber}`} className="flex items-center gap-2 hover:text-yellow-500 transition-colors text-lg font-black text-white">
                {whatsappNumber}
              </a>
              <a href="mailto:rodrigo@ra-bau-lieferung.com" className="flex items-center gap-2 hover:text-yellow-500 transition-colors text-sm">
                rodrigo@ra-bau-lieferung.com
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
              <button onClick={() => handleNavigation('interior')} className="hover:text-zinc-400">Innenausbau</button>
              <span>•</span>
              <button onClick={() => handleNavigation('contact')} className="hover:text-zinc-400">Kontakt</button>
            </div>
            <p>© {new Date().getFullYear()} RA Bau Lieferung. Alle Rechte vorbehalten. Material für Profis. Direkt auf Ihre Schweizer Baustelle.</p>
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
          Jetzt anfragen!
        </span>
      </a>

    </div>
  );
}
