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
  Info,
  Trash2,
  Plus,
  Minus,
  Calendar,
  ClipboardList,
  Check,
  FileText,
  AlertCircle
} from 'lucide-react';
import { PageRoute, QuoteItem } from './types';
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

  // Quote State
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quoteFormData, setQuoteFormData] = useState({
    company: '',
    contactName: '',
    phone: '',
    email: '',
    deliveryAddress: '',
    deliveryTimeframe: '1-month', // 'asap', '1-month', '2-3-months', 'flexible'
    generalNotes: ''
  });

  // Validation & Error States
  const [contactError, setContactError] = useState<string | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  // Custom Item Adding State (Internal to the planner view)
  const [customItemName, setCustomItemName] = useState('');
  const [customItemQty, setCustomItemQty] = useState('10');
  const [customItemUnit, setCustomItemUnit] = useState('m²');
  const [customItemNotes, setCustomItemNotes] = useState('');
  const [catalogMode, setCatalogMode] = useState<'zubehoor' | 'innenausbau'>('zubehoor');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToQuote = (product: { name: string; spec: string; brand?: string; image: string }) => {
    setQuoteItems(prev => {
      const existingIdx = prev.findIndex(item => item.name === product.name);
      if (existingIdx > -1) {
        const currentItem = prev[existingIdx];
        const numQty = parseFloat(currentItem.quantity);
        const addedQty = currentItem.unit === 'Stk.' ? 5 : 25;
        const newQty = isNaN(numQty) ? "50" : (numQty + addedQty).toString();
        const updated = [...prev];
        updated[existingIdx] = { ...currentItem, quantity: newQty };
        showToast(`Menge für "${product.name}" im Planer erhöht!`);
        return updated;
      }
      
      let defaultUnit = 'm²';
      const lowercaseName = product.name.toLowerCase();
      const lowercaseSpec = product.spec.toLowerCase();
      
      if (
        lowercaseName.includes('wc') || 
        lowercaseName.includes('armatur') || 
        lowercaseName.includes('duschset') || 
        lowercaseName.includes('waschtisch') || 
        lowercaseName.includes('waschbecken') || 
        lowercaseName.includes('duschwanne') ||
        lowercaseName.includes('clips') ||
        lowercaseName.includes('keile') ||
        lowercaseName.includes('set') ||
        lowercaseName.includes('schraubsystem') ||
        lowercaseName.includes('haken') ||
        lowercaseName.includes('stern') ||
        lowercaseName.includes('turm') ||
        lowercaseName.includes('kappe')
      ) {
        defaultUnit = 'Stk.';
      } else if (lowercaseName.includes('leiste') || lowercaseName.includes('draht') || lowercaseSpec.includes('m-') || lowercaseName.includes('haken') || lowercaseName.includes('bindehaken')) {
        defaultUnit = 'Stk.';
      }
      
      const defaultFormat = defaultUnit === 'm²' ? '' : undefined;
      
      const newItem: QuoteItem = {
        id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 6),
        name: product.name,
        spec: product.spec,
        brand: product.brand,
        image: product.image,
        quantity: defaultUnit === 'Stk.' ? '5' : '50',
        unit: defaultUnit,
        format: defaultFormat,
        customNote: ''
      };
      showToast(`"${product.name}" zum Offerten-Planer hinzugefügt!`);
      return [...prev, newItem];
    });
  };

  const changeQuoteQty = (productName: string, delta: number) => {
    setQuoteItems(prev => {
      const idx = prev.findIndex(item => item.name === productName);
      if (idx > -1) {
        const item = prev[idx];
        const currentQty = parseFloat(item.quantity) || 0;
        const step = item.unit === 'Stk.' ? 1 : 10;
        const newQty = currentQty + (delta * step);
        if (newQty <= 0) {
          showToast(`"${item.name}" aus der Zusammenstellung entfernt.`);
          return prev.filter((_, i) => i !== idx);
        } else {
          const updated = [...prev];
          updated[idx] = { ...item, quantity: newQty.toString() };
          return updated;
        }
      }
      return prev;
    });
  };

  const removeFromQuote = (id: string) => {
    setQuoteItems(prev => prev.filter(item => item.id !== id));
    showToast('Produkt aus der Zusammenstellung entfernt.');
  };

  const updateQuoteItem = (id: string, fields: Partial<QuoteItem>) => {
    setQuoteItems(prev => prev.map(item => item.id === id ? { ...item, ...fields } : item));
  };

  const addCustomQuoteItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemName.trim()) return;

    const newItem: QuoteItem = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 6),
      name: customItemName,
      spec: 'Benutzerdefinierte Anfrage',
      image: '/images/baustellenzubehoor_premium.png', // fallback
      quantity: customItemQty || '10',
      unit: customItemUnit,
      customNote: customItemNotes,
      isCustom: true
    };

    setQuoteItems(prev => [...prev, newItem]);
    setCustomItemName('');
    setCustomItemQty('10');
    setCustomItemNotes('');
    showToast('Benutzerdefiniertes Material hinzugefügt!');
  };

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
    setContactError(null);
    if (!formData.contactName || !formData.email) {
      setContactError("Bitte füllen Sie mindestens Name und E-Mail aus.");
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
            _template: "table",
            _replyto: formData.email,
            email: formData.email,
            Firmenname: formData.company,
            Ansprechpartner: formData.contactName,
            Telefon: formData.phone,
            "Kunden-Email": formData.email,
            Interessen: formData.interests.join(", "),
            Nachricht: formData.message
        })
      });
      
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        setContactError("Fehler beim Senden. Bitte versuchen Sie es später erneut.");
      }
    } catch (error) {
      setContactError("Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitQuoteForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteError(null);
    if (!quoteFormData.contactName || !quoteFormData.email) {
      setQuoteError("Bitte füllen Sie mindestens Ihren Namen und Ihre E-Mail-Adresse aus.");
      return;
    }
    if (quoteItems.length === 0) {
      setQuoteError("Ihr Offerten-Planer ist leer. Bitte fügen Sie mindestens ein Produkt hinzu.");
      return;
    }

    setIsSubmittingQuote(true);
    try {
      const itemsString = quoteItems.map((item, idx) => {
        const brandStr = item.brand ? ` [Marke: ${item.brand}]` : '';
        const noteStr = item.customNote ? ` (Anmerkung: ${item.customNote})` : '';
        const customTypeStr = item.isCustom ? ' [EIGENES MATERIAL]' : '';
        return `${idx + 1}. ${item.name}${brandStr}${customTypeStr} - Spezifikation: ${item.spec} - Menge: ${item.quantity} ${item.unit}${noteStr}`;
      }).join('\n\n');

      const requestData: any = {
        _subject: "Neue detaillierte Offertenanfrage / Zusammenstellung!",
        _template: "table",
        _replyto: quoteFormData.email,
        "Kunden-Name": quoteFormData.contactName,
        "Firmenname": quoteFormData.company,
        "Telefon": quoteFormData.phone,
        "E-Mail": quoteFormData.email,
        "Lieferadresse / Baustelle": quoteFormData.deliveryAddress,
        "Wunsch-Liefertermin": quoteFormData.deliveryTimeframe === 'asap' ? 'Schnellstmöglich (ASAP)' :
                             quoteFormData.deliveryTimeframe === '1-month' ? 'In ca. 1 Monat' :
                             quoteFormData.deliveryTimeframe === '2-3-months' ? 'In 2-3 Monaten' : 'Flexibel / Später',
        "Allgemeine Anmerkungen": quoteFormData.generalNotes || 'Keine zusätzlichen Kommentare',
        "Detaillierte Materialaufstellung": itemsString
      };

      quoteItems.forEach((item, idx) => {
        const label = item.isCustom ? `Benutzerdefiniert ${idx + 1}` : `Produkt ${idx + 1}`;
        requestData[label] = `${item.name} (${item.brand || 'Keine Marke'})`;
        requestData[`Spezifikation ${idx + 1}`] = item.spec;
        requestData[`Menge ${idx + 1}`] = `${item.quantity} ${item.unit}`;
        if (item.customNote) {
          requestData[`Anmerkung ${idx + 1}`] = item.customNote;
        }
      });

      const response = await fetch("https://formsubmit.co/ajax/rodrigo@ra-bau-lieferung.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (response.ok) {
        setQuoteSubmitted(true);
      } else {
        setQuoteError("Fehler beim Senden. Bitte versuchen Sie es später erneut.");
      }
    } catch (error) {
      setQuoteError("Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.");
    } finally {
      setIsSubmittingQuote(false);
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
    setContactError(null);
    setFormSubmitted(false);
  };

  const resetQuoteForm = () => {
    setQuoteItems([]);
    setQuoteFormData({
      company: '',
      contactName: '',
      phone: '',
      email: '',
      deliveryAddress: '',
      deliveryTimeframe: '1-month',
      generalNotes: ''
    });
    setQuoteError(null);
    setQuoteSubmitted(false);
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
    <div className="min-h-screen w-full overflow-x-hidden bg-zinc-50 font-sans text-zinc-900 selection:bg-yellow-500 selection:text-black scroll-smooth">
      
      {/* Top Warning/Trust Bar */}
      <div className="bg-[#004b87] text-white text-[11px] sm:text-xs md:text-sm py-2 px-3 sm:py-2.5 sm:px-4 font-bold text-center relative z-40 border-b border-[#003b6b]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-zinc-100 mt-0.5">
          <Truck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-yellow-500 animate-bounce" />
          <span>Zuverlässige Materiallieferung für Schweizer Projekte <span className="text-yellow-500 mx-1">•</span> Rascher Versand von Baustellenzubehör</span>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="bg-white border-b-2 border-yellow-500 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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

            {/* Offerte CTA Button & Offerten-Planer Badge */}
            <div className="flex items-center gap-1.5 sm:gap-4">
              <button
                onClick={() => handleNavigation('quote-planner')}
                className={`relative flex items-center gap-1.5 px-2 py-1.5 sm:px-4.5 sm:py-2.5 rounded-full font-bold text-[11px] sm:text-xs md:text-sm transition-all shadow-md border ${currentPage === 'quote-planner' ? 'bg-yellow-500 text-[#004b87] border-yellow-500 font-black' : 'bg-yellow-400 hover:bg-yellow-500 text-[#004b87] border-yellow-400'}`}
              >
                <Package className="w-4 h-4 text-[#004b87]" />
                <span className="hidden md:inline">Offerten-Planer</span>
                <span className="hidden sm:inline md:hidden">Planer</span>
                {quoteItems.length > 0 && (
                  <span className="bg-[#004b87] text-white text-[9px] sm:text-xs font-black min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] px-1 rounded-full flex items-center justify-center animate-pulse">
                    {quoteItems.length}
                  </span>
                )}
              </button>

              <a 
                href={getWhatsAppLink("general_ask")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-white px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg text-[11px] sm:text-xs md:text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Preis anfragen</span>
              </a>

              {/* Mobile Menu Icon */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
              onClick={() => handleNavigation('quote-planner')}
              className={`flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${currentPage === 'quote-planner' ? 'bg-yellow-500 text-black' : 'bg-yellow-400 text-[#004b87]'}`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>Offerten-Planer</span>
              </span>
              {quoteItems.length > 0 && (
                <span className="bg-[#004b87] text-white text-xs font-black px-2 py-0.5 rounded-full">
                  {quoteItems.length}
                </span>
              )}
            </button>
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
                      src="/images/travertino-60x120.png" 
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
                      src="/images/beige-stone-mosaic.png" 
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
                      <h3 className="font-black uppercase text-[#004b87] text-base sm:text-lg leading-tight font-display">Mosaike & Marmor XL</h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-sans">
                        Mosaike, Statuario- und Calacatta-Optiken bis zum Grossformat. Verfügbarkeit wird projektbezogen bestätigt.
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
                      src="/images/beige-oak-matte-spc.png" 
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
                          
                          {/* Quote Planner Add Button or Counter */}
                          {(() => {
                            const existing = quoteItems.find(item => item.name === product.name);
                            return (
                              <div className="space-y-2 mt-auto">
                                {existing ? (
                                  <div className="flex flex-col gap-1.5 bg-yellow-50 border border-yellow-200 rounded-xl p-2.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-black uppercase text-yellow-800 flex items-center gap-1">
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Im Planer</span>
                                      </span>
                                      <div className="flex items-center gap-1.5">
                                        <button
                                          type="button"
                                          onClick={() => changeQuoteQty(product.name, -1)}
                                          className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                        >
                                          <Minus className="w-2.5 h-2.5 text-stone-700" />
                                        </button>
                                        <span className="text-xs font-black text-[#004b87] min-w-[20px] text-center">
                                          {existing.quantity}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => changeQuoteQty(product.name, 1)}
                                          className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                        >
                                          <Plus className="w-2.5 h-2.5 text-stone-700" />
                                        </button>
                                        <span className="text-[10px] font-bold text-stone-500">Stk.</span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => addToQuote({ name: product.name, spec: product.application, image: product.image })}
                                    className="flex items-center justify-center gap-1.5 w-full bg-yellow-400 hover:bg-yellow-500 text-[#004b87] px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-xs border border-yellow-400"
                                  >
                                    <Plus className="w-3.5 h-3.5 text-[#004b87]" />
                                    <span>In den Planer legen</span>
                                  </button>
                                )}
                                
                                <a 
                                  href={getProductWhatsAppLink(product.name)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-1.5 w-full bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 text-stone-500" />
                                  <span>Direkt fragen</span>
                                </a>
                              </div>
                            );
                          })()}
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
                    src="/images/travertino-60x120.png" 
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
                    src="/images/beige-stone-mosaic.png" 
                    alt="Premium Mosaics Category" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500">Sparte 03</span>
                    <h3 className="font-bold uppercase text-xl sm:text-2xl tracking-tight font-display">Mosaike & Marmor XL</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-stone-500 text-xs sm:text-sm font-normal leading-relaxed mb-6 font-sans">
                    Netzgeklebte Mosaike sowie luxuriöse Marmoroptiken und Grossformate bis ca. 200×200 cm. Referenz und Verfügbarkeit werden je Projekt bestätigt.
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
                    src="/images/beige-oak-matte-spc.png" 
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
                  <span>Für Schweizer Bauprojekte</span>
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
                    Werkdaten projektbezogen geprüft • Rektifizierte Formate • Naturstein-Haptik
                  </p>
                </div>
                <div className="lg:col-span-5 h-[240px] lg:h-[350px] rounded-2xl overflow-hidden shadow-inner border border-stone-200/40">
                  <img 
                    src="/images/travertino-60x120.png" 
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
                  Die Abbildungen sind Symbolbilder und zeigen die gewünschte Material- und Designrichtung. Marken dienen als mögliche Referenzbasis, nicht als Zusage einer offiziellen Vertretung. Exakte Referenz, Format, Verpackung, Palettierung, m² pro Palette und Verfügbarkeit bestätigen wir schriftlich im Projektangebot.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
                      Projektreferenz
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-black/55 backdrop-blur-xs text-[8px] sm:text-[9px] text-stone-200 px-2 py-0.5 rounded font-bold select-none tracking-wider uppercase">
                      Symbolbild
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {product.brand && (
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#004b87] mb-1 inline-block">
                        Referenzbasis: {product.brand}
                      </span>
                    )}
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
                    
                    {/* Quote Planner Add Button or Counter */}
                    {(() => {
                      const existing = quoteItems.find(item => item.name === product.name);
                      return (
                        <div className="space-y-2 mt-auto">
                          {existing ? (
                            <div className="flex flex-col gap-1.5 bg-yellow-50 border border-yellow-200 rounded-xl p-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-yellow-800 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Im Planer</span>
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => changeQuoteQty(product.name, -1)}
                                    className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                  >
                                    <Minus className="w-2.5 h-2.5 text-stone-700" />
                                  </button>
                                  <span className="text-xs font-black text-[#004b87] min-w-[20px] text-center">
                                    {existing.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => changeQuoteQty(product.name, 1)}
                                    className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                  >
                                    <Plus className="w-2.5 h-2.5 text-stone-700" />
                                  </button>
                                  <span className="text-[10px] font-bold text-stone-500">m²</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToQuote({ name: product.name, spec: product.spec, brand: product.brand, image: product.image })}
                              className="flex items-center justify-center gap-1.5 w-full bg-yellow-400 hover:bg-yellow-500 text-[#004b87] px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-xs border border-yellow-400"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#004b87]" />
                              <span>In den Planer legen</span>
                            </button>
                          )}
                          
                          <a 
                            href={getProductWhatsAppLink(product.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 w-full bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-stone-500" />
                            <span>Direkt fragen</span>
                          </a>
                        </div>
                      );
                    })()}
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
                    Sparte 03 / Mosaike & Marmor-Grossformate
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#004b87] leading-none font-display mb-4">
                    Mosaike & Marmor XL
                  </h1>
                  <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl font-sans">
                    Premium-Mosaike, Statuario- und Calacatta-Optiken für Bad, Spa und repräsentative Innenräume – von Mosaikmatten bis zu Grossformaten um 200×200 cm.
                  </p>
                  <p className="text-xs font-semibold text-zinc-450 uppercase tracking-wider font-sans">
                    Premium-Haptik • Marmoroptik • Grossformatige Projektlösungen
                  </p>
                </div>
                <div className="lg:col-span-5 h-[240px] lg:h-[350px] rounded-2xl overflow-hidden shadow-inner border border-stone-200/40">
                  <img 
                    src="/images/marble-look-soft-matte.png"
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
                  Die Abbildungen sind Symbolbilder und zeigen die gewünschte Material- und Designrichtung. Marken dienen als mögliche Referenzbasis, nicht als Zusage einer offiziellen Vertretung. Exakte Referenz, Format, Verpackung, Palettierung, m² pro Palette und Verfügbarkeit bestätigen wir schriftlich im Projektangebot.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
                    {product.brand && (
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#004b87] mb-1 inline-block">
                        Referenzbasis: {product.brand}
                      </span>
                    )}
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
                    
                    {/* Quote Planner Add Button or Counter */}
                    {(() => {
                      const existing = quoteItems.find(item => item.name === product.name);
                      return (
                        <div className="space-y-2 mt-auto">
                          {existing ? (
                            <div className="flex flex-col gap-1.5 bg-yellow-50 border border-yellow-200 rounded-xl p-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-yellow-800 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Im Planer</span>
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => changeQuoteQty(product.name, -1)}
                                    className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                  >
                                    <Minus className="w-2.5 h-2.5 text-stone-700" />
                                  </button>
                                  <span className="text-xs font-black text-[#004b87] min-w-[20px] text-center">
                                    {existing.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => changeQuoteQty(product.name, 1)}
                                    className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                  >
                                    <Plus className="w-2.5 h-2.5 text-stone-700" />
                                  </button>
                                  <span className="text-[10px] font-bold text-stone-500">m²</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToQuote({ name: product.name, spec: product.spec, brand: product.brand, image: product.image })}
                              className="flex items-center justify-center gap-1.5 w-full bg-yellow-400 hover:bg-yellow-500 text-[#004b87] px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-xs border border-yellow-400"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#004b87]" />
                              <span>In den Planer legen</span>
                            </button>
                          )}
                          
                          <a 
                            href={getProductWhatsAppLink(product.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 w-full bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-stone-500" />
                            <span>Direkt fragen</span>
                          </a>
                        </div>
                      );
                    })()}
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
                <div className="lg:col-span-5 h-[240px] lg:h-[350px] rounded-2xl overflow-hidden shadow-inner border border-stone-200/40">
                  <img 
                    src="/images/beige-oak-matte-spc.png" 
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
                  Die Abbildungen sind Symbolbilder und zeigen die gewünschte Material- und Designrichtung. Marken dienen als mögliche Referenzbasis, nicht als Zusage einer offiziellen Vertretung. Exakte Referenz, Format, Verpackung, Palettierung, m² pro Palette und Verfügbarkeit bestätigen wir schriftlich im Projektangebot.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
                    {product.brand && (
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#004b87] mb-1 inline-block">
                        Referenzbasis: {product.brand}
                      </span>
                    )}
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
                    
                    {/* Quote Planner Add Button or Counter */}
                    {(() => {
                      const existing = quoteItems.find(item => item.name === product.name);
                      return (
                        <div className="space-y-2 mt-auto">
                          {existing ? (
                            <div className="flex flex-col gap-1.5 bg-yellow-50 border border-yellow-200 rounded-xl p-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-yellow-800 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Im Planer</span>
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => changeQuoteQty(product.name, -1)}
                                    className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                  >
                                    <Minus className="w-2.5 h-2.5 text-stone-700" />
                                  </button>
                                  <span className="text-xs font-black text-[#004b87] min-w-[20px] text-center">
                                    {existing.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => changeQuoteQty(product.name, 1)}
                                    className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                  >
                                    <Plus className="w-2.5 h-2.5 text-stone-700" />
                                  </button>
                                  <span className="text-[10px] font-bold text-stone-500">m²</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToQuote({ name: product.name, spec: product.spec, brand: product.brand, image: product.image })}
                              className="flex items-center justify-center gap-1.5 w-full bg-yellow-400 hover:bg-yellow-500 text-[#004b87] px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-xs border border-yellow-400"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#004b87]" />
                              <span>In den Planer legen</span>
                            </button>
                          )}
                          
                          <a 
                            href={getProductWhatsAppLink(product.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 w-full bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-stone-500" />
                            <span>Direkt fragen</span>
                          </a>
                        </div>
                      );
                    })()}
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
                    Keramik • Mineralguss-Duschwannen • Projektbezogener Lieferumfang
                  </p>
                </div>
                <div className="lg:col-span-5 h-[240px] lg:h-[350px] rounded-2xl overflow-hidden shadow-inner border border-stone-200/40">
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
                  Die Abbildungen sind Symbolbilder und zeigen die gewünschte Material- und Designrichtung. Marken dienen als mögliche Referenzbasis, nicht als Zusage einer offiziellen Vertretung. Exakte Referenz, Abmessungen, Lieferumfang, Verpackung, Palettierung und Verfügbarkeit bestätigen wir schriftlich im Projektangebot.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
                    {product.brand && (
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#004b87] mb-1 inline-block">
                        Referenzbasis: {product.brand}
                      </span>
                    )}
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
                    
                    {/* Quote Planner Add Button or Counter */}
                    {(() => {
                      const existing = quoteItems.find(item => item.name === product.name);
                      return (
                        <div className="space-y-2 mt-auto">
                          {existing ? (
                            <div className="flex flex-col gap-1.5 bg-yellow-50 border border-yellow-200 rounded-xl p-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-yellow-800 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Im Planer</span>
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => changeQuoteQty(product.name, -1)}
                                    className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                  >
                                    <Minus className="w-2.5 h-2.5 text-stone-700" />
                                  </button>
                                  <span className="text-xs font-black text-[#004b87] min-w-[20px] text-center">
                                    {existing.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => changeQuoteQty(product.name, 1)}
                                    className="w-6 h-6 bg-white hover:bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center font-black"
                                  >
                                    <Plus className="w-2.5 h-2.5 text-stone-700" />
                                  </button>
                                  <span className="text-[10px] font-bold text-stone-500">Stk.</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToQuote({ name: product.name, spec: product.spec, brand: product.brand, image: product.image })}
                              className="flex items-center justify-center gap-1.5 w-full bg-yellow-400 hover:bg-yellow-500 text-[#004b87] px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-xs border border-yellow-400"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#004b87]" />
                              <span>In den Planer legen</span>
                            </button>
                          )}
                          
                          <a 
                            href={getProductWhatsAppLink(product.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 w-full bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-stone-500" />
                            <span>Direkt fragen</span>
                          </a>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom bathroom design sourcing panel */}
            <div className="mt-16 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm max-w-3xl mx-auto text-center space-y-4">
              <Compass className="w-10 h-10 text-[#004b87] mx-auto" />
              <h3 className="text-xl font-black uppercase tracking-tight text-[#004b87]">Bad komplett ausstatten?</h3>
              <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
                Wir stellen komplette Projektpakete für Überbauungen und Sanierungen zusammen. Sanitärobjekte und Einbaukomponenten gleichen wir mit Ihren technischen Schnittstellen und Planungsunterlagen ab.
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


      {/* -------------------- QUOTE PLANNER PAGE -------------------- */}
      {currentPage === 'quote-planner' && (
        <section className="py-16 bg-zinc-50 min-h-[70vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#004b87] bg-yellow-400 px-3 py-1.5 rounded-md shadow-sm mb-3 inline-block">
                Offerten-Planer & Zusammenstellung
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#004b87] leading-none font-display mb-4">
                Ihre Materialausstellung
              </h1>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-4"></div>
              <p className="text-zinc-500 text-sm sm:text-base font-normal leading-relaxed">
                Fügen Sie Produkte hinzu, passen Sie Mengen und Dimensionen an, tragen Sie Ihre Wunschtermine ein und fordern Sie direkt Ihre schlüsselfertige, schweizerische Projekt-Offerte an.
              </p>
            </div>

            {quoteSubmitted ? (
              /* Success Screen */
              <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-14 border border-stone-200 shadow-xl text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#004b87] font-display animate-fadeIn">
                  Offertenanfrage erfolgreich gesendet!
                </h2>
                <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                  Vielen Dank für Ihre Anfrage. Die Daten wurden erfolgreich an **rodrigo@ra-bau-lieferung.com** übermittelt. Wir prüfen Ihre Zusammenstellung direkt mit unseren europäischen Partnerwerken und senden Ihnen ein massgeschneidertes, zoll- und lieferfertiges Angebot für Ihre Schweizer Destination.
                </p>
                
                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 text-left space-y-4 text-stone-700 text-sm max-w-md mx-auto">
                  <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold uppercase tracking-wider text-xs">Wie es jetzt weitergeht:</span>
                  </div>
                  <ul className="space-y-2 text-xs text-stone-600 list-decimal list-inside leading-relaxed">
                    <li>Wir kalkulieren Ihren individuellen Projekt-Sonderpreis.</li>
                    <li>Sie erhalten die Offerte (inkl. Zoll & Lieferung) via E-Mail.</li>
                    <li>Spezifikationen werden genau mit Ihren SIA-Schnittstellen abgeglichen.</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={resetQuoteForm}
                    className="bg-[#004b87] hover:bg-[#003b6b] text-white text-xs font-bold py-3.5 px-8 rounded-full uppercase tracking-wider transition-all"
                  >
                    Neue Zusammenstellung starten
                  </button>
                </div>
              </div>
            ) : (
              /* Core Planner Screen */
              <div className="space-y-8 text-left">
                {/* 1-Click Express-Katalogauswahl */}
                <div className="bg-white rounded-3xl border-2 border-dashed border-yellow-400 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="text-left max-w-3xl">
                    <span className="text-[10px] font-black uppercase text-yellow-600 bg-yellow-100 px-2.5 py-1 rounded-md tracking-wider inline-block mb-2 select-none shadow-xs">
                      ⚡ Blitz-Auswahl (Kein Hin- & Herwechseln nötig!)
                    </span>
                    <h3 className="font-black uppercase text-xl md:text-2xl text-[#004b87] tracking-tight font-display">
                      Express-Produktkatalog
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm font-normal">
                      Wählen Sie unten eine Sparte aus. Fügen Sie per Klick Produkte direkt Ihrer Zusammenstellung hinzu, passen Sie Mengen an oder wählen Sie Fliesenmasse – alles auf einer Seite.
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                    <button
                      onClick={() => setCatalogMode('zubehoor')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${catalogMode === 'zubehoor' ? 'bg-[#004b87] border-[#004b87] text-white shadow-md' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}`}
                    >
                      <Package className="w-4 h-4 shrink-0" />
                      <span>Sparte 01: Baustellenzubehör</span>
                    </button>
                    <button
                      onClick={() => setCatalogMode('innenausbau')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${catalogMode === 'innenausbau' ? 'bg-[#004b87] border-[#004b87] text-white shadow-md' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}`}
                    >
                      <Layers className="w-4 h-4 shrink-0" />
                      <span>Sparte 02-05: Innenausbau</span>
                    </button>
                  </div>

                  {/* Catalog list container */}
                  <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-6 max-h-[460px] overflow-y-auto space-y-3">
                    {catalogMode === 'zubehoor' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {constructionCategories.flatMap(cat => cat.products.map(prod => {
                          const existing = quoteItems.find(item => item.name === prod.name);
                          return (
                            <div key={prod.name} className={`bg-white p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${existing ? 'border-yellow-500 ring-2 ring-yellow-400/20 shadow-xs' : 'border-stone-200 hover:border-stone-300'}`}>
                              <div className="flex items-center gap-3 min-w-0">
                                <img 
                                  src={prod.image} 
                                  alt={prod.name} 
                                  className="w-12 h-12 rounded bg-stone-50 object-contain p-1 border border-stone-150 shrink-0" 
                                  referrerPolicy="no-referrer"
                                />
                                <div className="text-left min-w-0">
                                  <span className="text-[9px] font-bold text-[#004b87] uppercase tracking-wider block leading-none mb-1">
                                    Zubehör
                                  </span>
                                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight truncate uppercase">
                                    {prod.name}
                                  </h4>
                                  <p className="text-[10px] text-stone-500 truncate font-medium">
                                    {prod.application}
                                  </p>
                                </div>
                              </div>

                              <div className="shrink-0">
                                {existing ? (
                                  <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg">
                                    <button
                                      type="button"
                                      onClick={() => changeQuoteQty(prod.name, -1)}
                                      className="w-5 h-5 bg-white rounded border border-stone-200 flex items-center justify-center font-black hover:bg-stone-100"
                                    >
                                      <Minus className="w-2.5 h-2.5" />
                                    </button>
                                    <span className="text-xs font-black text-stone-850 min-w-[20px] text-center">
                                      {existing.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => changeQuoteQty(prod.name, 1)}
                                      className="w-5 h-5 bg-white rounded border border-stone-200 flex items-center justify-center font-black hover:bg-stone-100"
                                    >
                                      <Plus className="w-2.5 h-2.5" />
                                    </button>
                                    <span className="text-[10px] font-bold text-stone-500">Stk.</span>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => addToQuote({ name: prod.name, spec: prod.application, image: prod.image })}
                                    className="bg-zinc-100 hover:bg-[#004b87] hover:text-white text-[#004b87] font-black text-[10px] uppercase py-1.5 px-3 rounded-lg border border-stone-200 transition-all"
                                  >
                                    + Auswählen
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        }))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {interiorCategories.flatMap(cat => cat.products.map(prod => {
                          const existing = quoteItems.find(item => item.name === prod.name);
                          const isM2 = !prod.name.toLowerCase().includes('wc') && 
                                       !prod.name.toLowerCase().includes('armatur') && 
                                       !prod.name.toLowerCase().includes('duschset') && 
                                       !prod.name.toLowerCase().includes('waschtisch') && 
                                       !prod.name.toLowerCase().includes('waschbecken') && 
                                       !prod.name.toLowerCase().includes('duschwanne');
                          return (
                            <div key={prod.name} className={`bg-white p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 ${existing ? 'border-yellow-500 ring-2 ring-yellow-400/20 shadow-xs' : 'border-stone-200 hover:border-stone-300'}`}>
                              <div className="flex items-center justify-between gap-3 w-full">
                                <div className="flex items-center gap-3 min-w-0">
                                  <img 
                                    src={prod.image} 
                                    alt={prod.name} 
                                    className="w-12 h-12 rounded bg-stone-50 object-contain p-1 border border-stone-150 shrink-0" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="text-left min-w-0">
                                    <span className="text-[9px] font-bold text-[#004b87] uppercase tracking-wider block leading-none mb-1">
                                      {prod.brand || 'Innenausbau'}
                                    </span>
                                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight truncate uppercase">
                                      {prod.name}
                                    </h4>
                                    <p className="text-[10px] text-stone-500 truncate font-medium">
                                      {prod.spec}
                                    </p>
                                  </div>
                                </div>

                                <div className="shrink-0">
                                  {existing ? (
                                    <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg">
                                      <button
                                        type="button"
                                        onClick={() => changeQuoteQty(prod.name, -1)}
                                        className="w-5 h-5 bg-white rounded border border-stone-200 flex items-center justify-center font-black hover:bg-stone-100"
                                      >
                                        <Minus className="w-2.5 h-2.5" />
                                      </button>
                                      <span className="text-xs font-black text-stone-850 min-w-[20px] text-center">
                                        {existing.quantity}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => changeQuoteQty(prod.name, 1)}
                                        className="w-5 h-5 bg-white rounded border border-stone-200 flex items-center justify-center font-black hover:bg-stone-100"
                                      >
                                        <Plus className="w-2.5 h-2.5" />
                                      </button>
                                      <span className="text-[10px] font-bold text-stone-500">{existing.unit}</span>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => addToQuote({ name: prod.name, spec: prod.spec, brand: prod.brand, image: prod.image })}
                                      className="bg-zinc-100 hover:bg-[#004b87] hover:text-white text-[#004b87] font-black text-[10px] uppercase py-1.5 px-3 rounded-lg border border-stone-200 transition-all"
                                    >
                                      + Auswählen
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Formats Selection directly on quick catalog item if selected and unit is m² */}
                              {existing && existing.unit === 'm²' && (
                                <div className="border-t border-dashed border-stone-200 pt-2 flex flex-col gap-1 w-full">
                                  <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Wunschgrösse / Masse:</span>
                                  <input 
                                    type="text"
                                    placeholder="z.B. 60x60 cm, eigene Masse eintragen..."
                                    value={existing.format || ''}
                                    onChange={(e) => updateQuoteItem(existing.id, { format: e.target.value })}
                                    className="w-full text-[10px] font-semibold text-stone-800 placeholder-stone-400 border border-stone-200 rounded px-2 py-1 outline-none focus:border-[#004b87] bg-white shadow-inner"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Left and Right column split for selected items & submission form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Items list */}
                  <div className="lg:col-span-7 space-y-6">
                  
                  {/* Warning disclaimer inside items area */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left flex items-start gap-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                    <div className="space-y-1">
                      <span className="font-black text-xs uppercase tracking-wider text-amber-800 block">
                        Wichtiger Hinweis zu Produktabbildungen
                      </span>
                      <p className="text-amber-700 text-xs leading-relaxed font-normal">
                        Die im Katalog gezeigten Bilder dienen ausschliesslich zur visuellen Veranschaulichung (Symbolbilder). In Ihrer offiziellen Offerte erhalten Sie stets die exakten Produkt-Kurzreferenzen, Markenbezeichnungen und spezifischen SIA-Zertifizierungsdokumente passend zu Ihren exakten Massvorgaben.
                      </p>
                    </div>
                  </div>

                  {/* Quote items block */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                      <div className="flex items-center gap-2 text-[#004b87]">
                        <ClipboardList className="w-5 h-5" />
                        <h3 className="font-bold uppercase text-lg tracking-tight">Gewählte Positionen</h3>
                      </div>
                      <span className="text-xs font-black uppercase text-stone-400 bg-stone-100 px-2.5 py-1 rounded-md">
                        {quoteItems.length} {quoteItems.length === 1 ? 'Position' : 'Positionen'}
                      </span>
                    </div>

                    {quoteItems.length === 0 ? (
                      /* Empty state */
                      <div className="py-12 text-center space-y-4">
                        <Package className="w-12 h-12 text-stone-300 mx-auto animate-bounce" />
                        <h4 className="font-bold uppercase text-stone-600 text-sm">Noch keine Produkte im Planer</h4>
                        <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
                          Durchstöbern Sie unser Sortiment an hochwertigem Baustellenzubehör, Feinsteinzeug, SPC-Vinyl, Mosaiken und Sanitärprodukten und fügen Sie Ihre Wunschartikel mit einem Klick hinzu.
                        </p>
                        <div className="pt-2 flex justify-center gap-3">
                          <button 
                            onClick={() => handleNavigation('baustellenzubehoor')}
                            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[10px] font-black uppercase py-2.5 px-4 rounded-lg tracking-wider"
                          >
                            Baustellenzubehör
                          </button>
                          <button 
                            onClick={() => handleNavigation('porcelain')}
                            className="bg-[#004b87] hover:bg-[#003b6b] text-white text-[10px] font-black uppercase py-2.5 px-4 rounded-lg tracking-wider"
                          >
                            Innenausbau / Fliesen
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Items Table / Cards list */
                      <div className="space-y-6 divide-y divide-stone-100">
                        {quoteItems.map((item, idx) => (
                          <div key={item.id} className={`pt-6 ${idx === 0 ? 'pt-0' : ''} space-y-4`}>
                            <div className="flex items-start gap-4 justify-between">
                              <div className="flex items-start gap-3.5">
                                <div className="w-16 h-16 rounded-xl border border-stone-200 overflow-hidden bg-stone-50 flex items-center justify-center shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-contain p-1"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                      e.currentTarget.src = '/images/baustellenzubehoor_premium.png';
                                    }}
                                  />
                                </div>
                                <div className="space-y-1">
                                  {item.brand && (
                                    <span className="text-[9px] uppercase font-black tracking-widest text-[#004b87] bg-blue-50 px-1.5 py-0.5 rounded">
                                      {item.brand}
                                    </span>
                                  )}
                                  <h4 className="font-bold text-sm sm:text-base text-stone-900 leading-tight uppercase">
                                    {item.name}
                                  </h4>
                                  <p className="text-[10px] text-stone-450 leading-none">
                                    Referenz/Spezifikation: <span className="font-semibold text-stone-600">{item.spec}</span>
                                  </p>
                                </div>
                              </div>

                              <button 
                                onClick={() => removeFromQuote(item.id)}
                                className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all shrink-0"
                                title="Position entfernen"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Inputs Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                              {/* Quantity field */}
                              <div className="sm:col-span-5 flex items-center gap-2">
                                <label className="text-[10px] font-bold uppercase text-stone-400 tracking-wider w-14 sm:w-auto shrink-0">
                                  Menge:
                                </label>
                                <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden flex-grow bg-white">
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      const val = parseFloat(item.quantity) || 0;
                                      const step = item.unit === 'Stk.' ? 1 : 10;
                                      if (val > step) {
                                        updateQuoteItem(item.id, { quantity: (val - step).toString() });
                                      }
                                    }}
                                    className="p-2 text-stone-500 hover:bg-stone-100"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <input 
                                    type="text" 
                                    value={item.quantity}
                                    onChange={(e) => updateQuoteItem(item.id, { quantity: e.target.value })}
                                    className="w-full text-center text-xs font-bold text-stone-800 border-none outline-none focus:ring-0 focus:outline-none p-1 bg-transparent"
                                  />
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      const val = parseFloat(item.quantity) || 0;
                                      const step = item.unit === 'Stk.' ? 1 : 10;
                                      updateQuoteItem(item.id, { quantity: (val + step).toString() });
                                    }}
                                    className="p-2 text-stone-500 hover:bg-stone-100"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Unit Selector */}
                              <div className="sm:col-span-3 flex items-center gap-2">
                                <label className="text-[10px] font-bold uppercase text-stone-400 tracking-wider sm:hidden">
                                  Einheit:
                                </label>
                                <select 
                                  value={item.unit}
                                  onChange={(e) => updateQuoteItem(item.id, { unit: e.target.value })}
                                  className="w-full text-xs font-bold text-stone-700 border border-stone-200 rounded-lg p-2.5 outline-none focus:border-[#004b87] bg-white"
                                >
                                  <option value="m²">m² (Quadratmeter)</option>
                                  <option value="Stk.">Stk. (Stücke)</option>
                                  <option value="m">m (Laufmeter)</option>
                                  <option value="Kartons">Kartons</option>
                                  <option value="Paletten">Paletten</option>
                                </select>
                              </div>

                              {/* Note Field */}
                              <div className="sm:col-span-4">
                                <input 
                                  type="text"
                                  placeholder="Zusatzwunsch / Farbe..."
                                  value={item.customNote || ''}
                                  onChange={(e) => updateQuoteItem(item.id, { customNote: e.target.value })}
                                  className="w-full text-xs text-stone-700 border border-stone-200 rounded-lg p-2.5 placeholder-stone-400 focus:border-[#004b87] bg-stone-50 focus:bg-white transition-all outline-none"
                                />
                              </div>
                            </div>

                            {/* Ergonomic Quick Quantity Panel */}
                            <div className="bg-stone-50/50 p-3 rounded-xl border border-stone-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-black uppercase text-[#004b87] tracking-wider block">
                                  Ergonomische Mengenanpassung:
                                </span>
                                <span className="text-[11px] text-stone-500 font-medium leading-none block">
                                  Wählen Sie Schnellschritte oder typische Projektgrössen.
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                {/* Decrements */}
                                <div className="flex gap-1">
                                  {(item.unit === 'Stk.' ? ['-50', '-10', '-5'] : ['-100', '-50', '-25', '-5']).map(adj => {
                                    const diff = parseInt(adj);
                                    return (
                                      <button
                                        key={adj}
                                        type="button"
                                        onClick={() => {
                                          const current = parseFloat(item.quantity) || 0;
                                          const next = Math.max(1, current + diff);
                                          updateQuoteItem(item.id, { quantity: next.toString() });
                                        }}
                                        className="px-2 py-1 text-[10px] font-bold rounded bg-zinc-100 border border-zinc-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all select-none"
                                        title={`${adj} ${item.unit}`}
                                      >
                                        {adj}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Increments */}
                                <div className="flex gap-1">
                                  {(item.unit === 'Stk.' ? ['+5', '+10', '+50'] : ['+5', '+25', '+50', '+100', '+500']).map(adj => {
                                    const diff = parseInt(adj);
                                    return (
                                      <button
                                        key={adj}
                                        type="button"
                                        onClick={() => {
                                          const current = parseFloat(item.quantity) || 0;
                                          const next = current + diff;
                                          updateQuoteItem(item.id, { quantity: next.toString() });
                                        }}
                                        className="px-2 py-1 text-[10px] font-bold rounded bg-zinc-100 border border-zinc-200 hover:bg-[#004b87] hover:text-white hover:border-[#004b87] transition-all select-none"
                                        title={`${adj} ${item.unit}`}
                                      >
                                        {adj}
                                      </button>
                                    );
                                  })}
                                </div>

                                <span className="text-stone-300 hidden sm:inline">|</span>

                                {/* Presets */}
                                <div className="flex flex-wrap gap-1 items-center">
                                  <span className="text-[9px] font-black uppercase text-stone-400 tracking-wider mr-1">Presets:</span>
                                  {(item.unit === 'm²' 
                                    ? ['15', '30', '50', '80', '120', '250', '500'] 
                                    : item.unit === 'Stk.' 
                                      ? ['1', '5', '10', '25', '50', '100', '250'] 
                                      : ['5', '10', '25', '50', '100', '250']
                                  ).map(preset => (
                                    <button
                                      key={preset}
                                      type="button"
                                      onClick={() => updateQuoteItem(item.id, { quantity: preset })}
                                      className={`px-2 py-1 text-[9px] font-bold rounded border transition-all ${item.quantity === preset ? 'bg-[#004b87] border-[#004b87] text-white font-black shadow-xs' : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700'}`}
                                    >
                                      {preset} {item.unit}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Format & Specification Open Text Field */}
                            {item.unit === 'm²' && (
                              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-left">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                  <span className="text-[10px] font-black uppercase text-[#004b87] tracking-wider block">
                                    Gewünschte Masse, Format & spezifische Werk-Details:
                                  </span>
                                  <span className="text-[9px] bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded-full select-none">
                                    Freie Eingabe (Werk-Prüfung)
                                  </span>
                                </div>
                                <p className="text-stone-500 text-[11px] leading-relaxed font-normal">
                                  Da die Werksverfügbarkeiten für Mosaike und Fliesenformate (z.B. ob das Werk Ihr gewünschtes Modell aktuell in 60x60 cm, 120x20 cm, 10x10 cm etc. vorrätig hat) stetig variieren, haben wir die vordefinierten Vorschläge entfernt. Bitte tragen Sie hier einfach Ihre gewünschten Masse, Fugen-Details, Oberflächen (matt/poliert) oder andere Pormenores ein. Wir klären die exakte Machbarkeit umgehend tagesaktuell für Sie ab.
                                </p>
                                <div className="relative">
                                  <input 
                                    type="text"
                                    placeholder="z.B. Format 120x20 cm gewünscht / Mosaikstein 5x5 cm / matte Ausführung / Dicke 10mm..."
                                    value={item.format || ''}
                                    onChange={(e) => updateQuoteItem(item.id, { format: e.target.value })}
                                    className="w-full text-xs font-semibold text-stone-800 placeholder-stone-400 border border-stone-200 rounded-lg p-3 outline-none focus:border-[#004b87] bg-white shadow-inner transition-all focus:ring-1 focus:ring-[#004b87]/30"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add completely Custom position form */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-2 text-stone-700 border-b border-stone-100 pb-4 mb-5">
                      <Plus className="w-4.5 h-4.5 text-[#004b87]" />
                      <h4 className="font-bold uppercase text-sm tracking-tight">Eigenes Produkt / Wunsch hinzufügen</h4>
                    </div>

                    <form onSubmit={addCustomQuoteItem} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="sm:col-span-6">
                          <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                            Produktbezeichnung *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="z.B. Mosaik Premium Grau, alternatives Format..."
                            value={customItemName}
                            onChange={(e) => setCustomItemName(e.target.value)}
                            className="w-full border border-stone-200 rounded-xl p-3 text-xs focus:border-[#004b87] outline-none"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                            Gewünschte Menge
                          </label>
                          <input 
                            type="text" 
                            placeholder="z.B. 100"
                            value={customItemQty}
                            onChange={(e) => setCustomItemQty(e.target.value)}
                            className="w-full border border-stone-200 rounded-xl p-3 text-xs focus:border-[#004b87] outline-none"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                            Einheit
                          </label>
                          <select 
                            value={customItemUnit}
                            onChange={(e) => setCustomItemUnit(e.target.value)}
                            className="w-full border border-stone-200 rounded-xl p-3 text-xs bg-white focus:border-[#004b87] outline-none font-bold text-stone-700"
                          >
                            <option value="m²">m²</option>
                            <option value="Stk.">Stk.</option>
                            <option value="m">m</option>
                            <option value="Kartons">Kartons</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                          Beschreibung / Besonderheiten / Ähnliche Referenz
                        </label>
                        <textarea 
                          placeholder="z.B. Ich suche ein graues Marmormosaik, ähnlich wie Sparte 03, aber mit glänzendem Finish und einer maximalen Fugengrösse von 2mm..."
                          value={customItemNotes}
                          onChange={(e) => setCustomItemNotes(e.target.value)}
                          rows={2}
                          className="w-full border border-stone-200 rounded-xl p-3 text-xs focus:border-[#004b87] outline-none"
                        ></textarea>
                      </div>

                      <div className="flex justify-end">
                        <button 
                          type="submit"
                          className="bg-zinc-50 hover:bg-[#004b87] hover:text-white text-[#004b87] border border-stone-200 font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all"
                        >
                          Position hinzufügen
                        </button>
                      </div>
                    </form>
                  </div>

                </div>

                {/* Right Column: Contact Request Form */}
                <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-yellow-500 p-6 sm:p-8 shadow-md space-y-6">
                  
                  <div className="space-y-2 border-b border-stone-100 pb-4">
                    <span className="text-[9px] uppercase font-black text-yellow-500 tracking-widest block">
                      Express-Preisanfrage
                    </span>
                    <h3 className="font-black uppercase text-xl text-[#004b87] tracking-tight font-display">
                      Offertenanfrage senden
                    </h3>
                    <p className="text-stone-500 text-xs font-normal leading-relaxed">
                      Tragen Sie Ihre Daten ein. Unser Logistik-Team berechnet die Verzollung, schlüsselfertige Schweizer Lieferung und Sonderkonditionen für Ihre Mengen.
                    </p>
                  </div>

                  <form onSubmit={submitQuoteForm} className="space-y-4">
                    
                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                        Ansprechpartner *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                        <input 
                          type="text" 
                          required
                          placeholder="Ihr vollständiger Name"
                          value={quoteFormData.contactName}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, contactName: e.target.value }))}
                          className="w-full border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-xs focus:border-[#004b87] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                        Firmenname
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                        <input 
                          type="text" 
                          placeholder="z.B. Muster AG Plattenleger"
                          value={quoteFormData.company}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-xs focus:border-[#004b87] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                          Telefonnummer *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                          <input 
                            type="tel" 
                            required
                            placeholder="z.B. +41 78..."
                            value={quoteFormData.phone}
                            onChange={(e) => setQuoteFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-xs focus:border-[#004b87] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                          E-Mail-Adresse *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                          <input 
                            type="email" 
                            required
                            placeholder="rodrigo@ra-bau..."
                            value={quoteFormData.email}
                            onChange={(e) => setQuoteFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-xs focus:border-[#004b87] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                        Lieferadresse / Bestimmungsort in der Schweiz
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                        <input 
                          type="text" 
                          placeholder="PLZ, Ort, Strasse oder Baustelle"
                          value={quoteFormData.deliveryAddress}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                          className="w-full border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-xs focus:border-[#004b87] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-2">
                        Geschätzter Liefertermin (Wunschzeitraum) *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { val: 'urgent_yesterday', label: 'Sehr dringend!', sub: 'Am besten gestern! 💥' },
                          { val: '1-week', label: 'In 1 Woche', sub: 'Nächste Woche' },
                          { val: '2-weeks', label: 'In 2 Wochen', sub: 'KW' },
                          { val: '3-weeks', label: 'In 3 Wochen', sub: 'KW' },
                          { val: '4-weeks', label: 'In ca. 4 Wochen', sub: '1 Monat' },
                          { val: '1-month-plus', label: '1 Monat +', sub: 'Langfristig' },
                          { val: 'flexible', label: 'Flexibel', sub: 'Auf Abruf / Später' }
                        ].map((tf) => (
                          <button
                            key={tf.val}
                            type="button"
                            onClick={() => setQuoteFormData(prev => ({ ...prev, deliveryTimeframe: tf.val }))}
                            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${quoteFormData.deliveryTimeframe === tf.val ? 'border-yellow-500 bg-yellow-50/70 text-[#004b87] shadow-sm ring-1 ring-yellow-500' : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'}`}
                          >
                            <span className="text-xs font-black uppercase tracking-tight leading-none mb-1 block">
                              {tf.label}
                            </span>
                            <span className="text-[9px] text-stone-450 font-bold tracking-normal block leading-none">
                              {tf.sub}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1">
                        Allgemeine Anmerkungen zum Projekt
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="Ergänzen Sie Details zu Kran-Abladung, speziellen SIA-Schnittstellen oder anderen Wünschen..."
                        value={quoteFormData.generalNotes}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, generalNotes: e.target.value }))}
                        className="w-full border border-stone-200 rounded-xl p-3 text-xs focus:border-[#004b87] outline-none"
                      ></textarea>
                    </div>

                    <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-2">
                      <div className="flex items-center gap-1.5 text-[#004b87] font-black text-[10px] uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4 text-yellow-500 shrink-0" />
                        <span>SIA-Konforme Abwicklung</span>
                      </div>
                      <p className="text-[10px] text-zinc-600 leading-normal font-normal font-sans">
                        Jedes Angebot wird technisch verifiziert. Mit dem Absenden erhalten Sie die schlüsselfertigen Dokumente und exakten Spezifikationen direkt in Ihr Postfach.
                      </p>
                    </div>

                    {quoteError && (
                      <div className="bg-red-50 text-red-700 border border-red-200 p-3.5 rounded-xl text-xs font-bold leading-normal flex items-start gap-2">
                        <span className="text-red-500 font-black shrink-0">⚠️</span>
                        <span>{quoteError}</span>
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmittingQuote}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-stone-300 text-[#004b87] font-black py-4 rounded-xl uppercase tracking-wider transition-all text-sm shadow-md border border-yellow-400 flex flex-col items-center justify-center gap-1.5"
                    >
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4 text-[#004b87]" />
                        <span>
                          {isSubmittingQuote ? 'Anfrage wird gesendet...' : 'Anfrage senden'}
                        </span>
                      </span>
                      <span className="text-[10px] font-bold text-[#004b87]/80 normal-case block">
                        Direkt per E-Mail an rodrigo@ra-bau-lieferung.com
                      </span>
                    </button>

                  </form>
                </div>

              </div>
              </div>
            )}

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

                    {/* Validation Error Message */}
                    {contactError && (
                      <div className="bg-red-50 text-red-700 border border-red-200 p-3.5 rounded-xl text-xs font-bold leading-normal flex items-start gap-2">
                        <span className="text-red-500 font-black shrink-0">⚠️</span>
                        <span>{contactError}</span>
                      </div>
                    )}

                    {/* Submission Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full flex flex-col items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-zinc-950 py-4 rounded-xl font-black transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed gap-1"
                    >
                      <div className="flex items-center gap-2">
                        <Send className={`w-4 h-4 text-zinc-900 ${isSubmitting ? 'animate-pulse' : ''}`} />
                        <span className="text-sm uppercase tracking-wider">{isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'}</span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-800 normal-case block">
                        Direkt per E-Mail an rodrigo@ra-bau-lieferung.com
                      </span>
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
              <button onClick={() => handleNavigation('quote-planner')} className="hover:text-yellow-500 text-yellow-400 font-bold">Offerten-Planer</button>
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

      {/* Elegant Toast Notification for Quote Additions */}
      {toastMessage && (
        <div className="fixed bottom-24 left-6 z-50 bg-[#004b87] text-white py-3.5 px-5 rounded-2xl shadow-2xl border border-blue-800 animate-slideUp flex items-center gap-3 max-w-sm">
          <Sparkles className="w-5 h-5 text-yellow-500 shrink-0" />
          <span className="text-xs font-bold font-sans tracking-wide leading-normal">
            {toastMessage}
          </span>
          <button 
            onClick={() => handleNavigation('quote-planner')}
            className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-[#004b87] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all shadow-sm shrink-0"
          >
            Ansehen
          </button>
        </div>
      )}

    </div>
  );
}
