(() => {
  const FAMILY_KEY = 'ra_family_selection_v1';
  const QUOTE_KEY = 'ra_quote_v1';
  const FALLBACKS = {
    'Signature Gold': '/images/catalog/rubicer-signature-gold.svg',
    'Natural Cork Floors': '/images/products/rubifloor-premium-cream.webp',
    'Duschabtrennungen': '/images/catalog/rubicer-stria.png',
    'Designarmaturen 2026': '/images/premium/ramon-soler.svg',
  };

  const readJson = (key, fallback = []) => {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
  };

  const writeJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  function normalizeCopy(root = document) {
    root.querySelectorAll('button, a, p, span').forEach((node) => {
      if (node.childElementCount) return;
      const text = node.textContent?.trim();
      if (text === 'Offerte zusammenstellen') node.textContent = 'Anfrage zusammenstellen';
      if (text === 'Zur Offerte') node.textContent = 'Zur Anfrage';
      if (text === 'Anfragen' && node.closest('article')) node.setAttribute('aria-label', 'Produkt auswählen und anfragen');
    });
  }

  function injectAdvisor() {
    if (document.querySelector('[data-ra-advisor]')) return;
    const main = document.querySelector('main');
    if (!main || !main.textContent.includes('Das Produkt steht im Mittelpunkt.')) return;
    const section = document.createElement('section');
    section.dataset.raAdvisor = 'true';
    section.className = 'border-t border-[#d9e1e5] bg-white';
    section.innerHTML = `
      <div class="mx-auto max-w-[1540px] px-5 py-14 lg:px-10">
        <div class="grid gap-8 overflow-hidden rounded-[24px] border border-[#d7e0e5] bg-[#f7f9fa] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p class="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#9a6e22]">Ihr Ansprechpartner</p>
          <h2 class="mt-3 font-display text-4xl font-bold tracking-[-.035em] text-[#10293e]">Rodrigo Afonso</h2>
          <p class="mt-4 max-w-3xl leading-7 text-[#5d7381]">Persönliche Prüfung von Produkt, Referenz, Menge, Lieferort, Transport und Verzollung. Kontakt auf Deutsch, Portugiesisch, Spanisch oder Englisch.</p></div>
          <div class="flex flex-wrap gap-3"><a href="tel:+41782418913" class="rounded-lg border border-[#cbd7de] bg-white px-5 py-3 text-sm font-extrabold text-[#004b87]">+41 78 241 89 13</a><a href="https://wa.me/41782418913" target="_blank" rel="noreferrer" class="rounded-lg bg-[#16734b] px-5 py-3 text-sm font-extrabold text-white">WhatsApp</a></div>
        </div>
      </div>`;
    main.appendChild(section);
  }

  function enhanceFooter() {
    const footer = document.querySelector('footer');
    if (!footer || footer.dataset.enhanced) return;
    footer.dataset.enhanced = 'true';
    const legal = document.createElement('div');
    legal.className = 'border-t border-[#e1e7ea]';
    legal.innerHTML = `<div class="mx-auto grid max-w-[1540px] gap-6 px-5 py-7 text-xs leading-6 text-[#607582] md:grid-cols-[1fr_auto] lg:px-10"><div><strong class="text-[#10293e]">RA Bau Lieferung · Rodrigo Afonso</strong><br>Zeughausstrasse 5 · 4702 Oensingen · Schweiz<br><a class="hover:text-[#004b87]" href="mailto:rodrigo@ra-bau-lieferung.com">rodrigo@ra-bau-lieferung.com</a> · <a class="hover:text-[#004b87]" href="tel:+41782418913">+41 78 241 89 13</a><br><span>Geschäftsbezeichnung eines nicht im Handelsregister eingetragenen Einzelangebots · nicht MWST-pflichtig.</span></div><div class="flex flex-wrap gap-2 md:justify-end"><a class="rounded-lg px-3 py-2 font-bold hover:bg-[#eef3f6]" href="/impressum.html">Impressum</a><a class="rounded-lg px-3 py-2 font-bold hover:bg-[#eef3f6]" href="/datenschutz.html">Datenschutz</a><a class="rounded-lg px-3 py-2 font-bold hover:bg-[#eef3f6]" href="/kontakt">Kontakt</a></div></div>`;
    footer.appendChild(legal);
  }

  function cardTitle(image) {
    return image.closest('article,[role="dialog"]')?.querySelector('h2,h3')?.textContent?.trim() || '';
  }

  function setFallback(image) {
    const title = cardTitle(image);
    const fallback = FALLBACKS[title];
    if (!fallback || image.dataset.raFallback === fallback) return;
    image.dataset.raFallback = fallback;
    image.src = fallback;
    image.style.objectFit = title === 'Natural Cork Floors' ? 'cover' : 'contain';
    image.style.objectPosition = 'center';
    image.removeAttribute('aria-hidden');
  }

  function enhanceImages(root = document) {
    root.querySelectorAll('img').forEach((image) => {
      if (!image.hasAttribute('decoding')) image.setAttribute('decoding', 'async');
      if (!image.hasAttribute('loading') && !image.closest('section')?.matches(':first-of-type')) image.setAttribute('loading', 'lazy');
      if (!image.dataset.raErrorBound) {
        image.dataset.raErrorBound = 'true';
        image.addEventListener('error', () => {
          setFallback(image);
          if (!FALLBACKS[cardTitle(image)]) image.setAttribute('aria-hidden', 'true');
        });
        image.addEventListener('load', () => {
          if ((image.naturalWidth < 80 || image.naturalHeight < 80) && FALLBACKS[cardTitle(image)]) setFallback(image);
        });
      }
    });
  }

  function enhanceForms(root = document) {
    root.querySelectorAll('form').forEach((form) => {
      if (form.dataset.privacyEnhanced) return;
      form.dataset.privacyEnhanced = 'true';
      form.querySelectorAll('input,textarea,select').forEach((field) => {
        if (field instanceof HTMLInputElement && ['email', 'tel'].includes(field.type)) field.autocomplete = field.type === 'email' ? 'email' : 'tel';
      });
      const submit = form.querySelector('button[type="submit"]');
      if (!submit) return;
      const note = document.createElement('p');
      note.className = 'mt-3 text-xs leading-5 text-[#607582]';
      note.innerHTML = 'Mit dem Absenden erklären Sie sich mit der Bearbeitung Ihrer Angaben zur Beantwortung der Projektanfrage einverstanden. Details finden Sie im <a class="font-bold text-[#004b87] underline" href="/datenschutz.html">Datenschutz</a>.';
      submit.insertAdjacentElement('afterend', note);
    });
  }

  function enhanceDialogs(root = document) {
    root.querySelectorAll('[role="dialog"]').forEach((dialog) => {
      if (dialog.dataset.accessible) return;
      dialog.dataset.accessible = 'true';
      dialog.setAttribute('aria-modal', 'true');
      const heading = dialog.querySelector('h2,h3');
      if (heading) {
        if (!heading.id) heading.id = `dialog-title-${Math.random().toString(36).slice(2)}`;
        dialog.setAttribute('aria-labelledby', heading.id);
      }
      const focusable = dialog.querySelector('button,a,input,select,textarea');
      if (focusable) requestAnimationFrame(() => focusable.focus());
    });
    document.body.style.overflow = document.querySelector('[role="dialog"]') ? 'hidden' : '';
  }

  function installSharing(root = document) {
    root.querySelectorAll('[role="dialog"]').forEach((dialog) => {
      if (dialog.querySelector('[data-ra-share]')) return;
      const heading = dialog.querySelector('h2,h3');
      const actions = [...dialog.querySelectorAll('button')].find((button) => /anfrage|hinzufügen/i.test(button.textContent));
      if (!heading || !actions) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.raShare = 'true';
      button.className = 'mt-3 rounded-lg border border-[#cbd7de] bg-white px-4 py-3 text-sm font-extrabold text-[#004b87] hover:bg-[#eef3f6]';
      button.textContent = 'Produkt teilen';
      button.addEventListener('click', async () => {
        const shareData = { title: `${heading.textContent} | RA Bau Lieferung`, text: `Produktreferenz: ${heading.textContent}`, url: location.href };
        try {
          if (navigator.share) await navigator.share(shareData);
          else {
            await navigator.clipboard.writeText(location.href);
            button.textContent = 'Link kopiert';
            setTimeout(() => { button.textContent = 'Produkt teilen'; }, 1800);
          }
        } catch {}
      });
      actions.insertAdjacentElement('afterend', button);
    });
  }

  function familyCards() {
    return [...document.querySelectorAll('article')].filter((article) => {
      const hasEmail = [...article.querySelectorAll('a')].some((link) => link.href.startsWith('mailto:'));
      const hasWhatsApp = [...article.querySelectorAll('a')].some((link) => link.href.includes('wa.me'));
      return hasEmail && hasWhatsApp;
    });
  }

  function familyId(article) {
    const brand = article.querySelector('p')?.textContent?.trim() || '';
    const name = article.querySelector('h3')?.textContent?.trim() || '';
    return `${brand} · ${name}`;
  }

  function updateStickySelection() {
    const quote = readJson(QUOTE_KEY);
    const families = readJson(FAMILY_KEY);
    const total = quote.length + families.length;
    let bar = document.querySelector('[data-ra-selection-bar]');
    if (!total) {
      bar?.remove();
      return;
    }
    if (!bar) {
      bar = document.createElement('div');
      bar.dataset.raSelectionBar = 'true';
      bar.className = 'fixed inset-x-3 bottom-3 z-[90] mx-auto flex max-w-xl items-center justify-between gap-3 rounded-2xl border border-white/20 bg-[#10293e] p-3 pl-4 text-white shadow-2xl sm:bottom-5';
      document.body.appendChild(bar);
    }
    const names = [...quote.map((item) => `${item.brand ? `${item.brand} · ` : ''}${item.name}`), ...families];
    const text = `Guten Tag, ich interessiere mich für folgende Auswahl:\n\n${names.map((name, index) => `${index + 1}. ${name}`).join('\n')}\n\nBitte kontaktieren Sie mich für Referenzen, Verfügbarkeit und eine projektbezogene Offerte.`;
    bar.innerHTML = `<div><strong class="block text-sm">${total} ${total === 1 ? 'Produkt ausgewählt' : 'Produkte ausgewählt'}</strong><span class="text-[11px] text-white/65">Auswahl prüfen oder direkt anfragen</span></div><div class="flex gap-2"><a href="/projektanfrage" class="rounded-lg border border-white/25 px-3 py-2 text-xs font-extrabold text-white">Öffnen</a><a href="https://wa.me/41782418913?text=${encodeURIComponent(text)}" target="_blank" rel="noreferrer" class="rounded-lg bg-[#d7aa57] px-3 py-2 text-xs font-extrabold text-[#10293e]">WhatsApp</a></div>`;
  }

  function enhanceFamilySelection() {
    const selected = readJson(FAMILY_KEY);
    familyCards().forEach((article) => {
      const id = familyId(article);
      const whatsapp = [...article.querySelectorAll('a')].find((link) => link.href.includes('wa.me'));
      if (!id || !whatsapp) return;
      const active = selected.includes(id);
      whatsapp.href = '#';
      whatsapp.removeAttribute('target');
      whatsapp.setAttribute('role', 'button');
      whatsapp.setAttribute('aria-pressed', String(active));
      whatsapp.classList.toggle('bg-[#16734b]', !active);
      whatsapp.classList.toggle('bg-[#10293e]', active);
      whatsapp.innerHTML = active ? '✓ Ausgewählt' : '＋ Auswählen';
      if (whatsapp.dataset.raSelectBound) return;
      whatsapp.dataset.raSelectBound = 'true';
      whatsapp.addEventListener('click', (event) => {
        event.preventDefault();
        const current = readJson(FAMILY_KEY);
        const exists = current.includes(id);
        writeJson(FAMILY_KEY, exists ? current.filter((item) => item !== id) : [...current, id]);
        enhanceFamilySelection();
        updateStickySelection();
      });
    });
  }

  function enableDirectRemoval() {
    document.querySelectorAll('article').forEach((article) => {
      const button = [...article.querySelectorAll('button')].find((item) => item.textContent.trim() === 'In der Anfrage');
      const name = article.querySelector('h3')?.textContent?.trim();
      if (!button || !name) return;
      button.disabled = false;
      button.textContent = 'Auswahl entfernen';
      button.className = 'rounded-lg border border-[#d6a2a2] bg-white px-4 py-3 text-xs font-extrabold text-[#a23434] hover:bg-[#fff5f5]';
      if (button.dataset.raRemoveBound) return;
      button.dataset.raRemoveBound = 'true';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const current = readJson(QUOTE_KEY);
        writeJson(QUOTE_KEY, current.filter((item) => item.name !== name));
        location.reload();
      });
    });
  }

  function addMosaicGuidance() {
    if (location.pathname !== '/premium-mosaike' || document.querySelector('[data-ra-mosaic-guidance]')) return;
    const main = document.querySelector('main');
    const firstProductsSection = main?.querySelector('section.mx-auto');
    if (!firstProductsSection) return;
    const box = document.createElement('div');
    box.dataset.raMosaicGuidance = 'true';
    box.className = 'mb-8 rounded-[18px] border border-[#d9c393] bg-[#fffaf0] p-5 sm:p-6';
    box.innerHTML = `<p class="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#8e6725]">Klare Premium-Kriterien</p><h2 class="mt-2 text-xl font-extrabold text-[#10293e]">Nicht jedes Kleinformat ist automatisch Premium.</h2><p class="mt-3 text-sm leading-6 text-[#5d7381]">Wir unterscheiden zwischen <strong>Design-Akzenten</strong> mit besonderer Material-, Relief- oder Finishwirkung und <strong>koordinierten Serienmosaiken</strong>, die technisch zu einer Flächenserie passen. Für exklusive Projekte priorisieren wir Mastery Mix, Relief- und dekorative Lösungen; Standardquadrate bleiben als funktionale Ergänzung sichtbar.</p>`;
    firstProductsSection.prepend(box);
  }

  function verifyContactLinks(root = document) {
    root.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('mailto:') && !href.includes('rodrigo@ra-bau-lieferung.com')) return;
      if (href.startsWith('tel:')) link.setAttribute('href', 'tel:+41782418913');
      if (href.includes('wa.me/') && !href.includes('wa.me/41782418913')) link.href = link.href.replace(/wa\.me\/[^?]+/, 'wa.me/41782418913');
    });
  }

  function installKeyboardSupport() {
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return;
      const close = [...dialog.querySelectorAll('button')].find((button) => /schliessen|close|zurück/i.test(button.getAttribute('aria-label') || button.textContent));
      close?.click();
    });
  }

  function installMeasurement() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a,button');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      let type = 'interaction';
      if (href.includes('wa.me')) type = 'whatsapp';
      else if (href.startsWith('mailto:')) type = 'email';
      else if (href.startsWith('tel:')) type = 'phone';
      else if (/zur anfrage|hinzufügen|auswählen/i.test(link.textContent)) type = 'add_to_request';
      const events = readJson('ra_interactions');
      events.push({ type, label: link.textContent.trim().slice(0, 100), path: location.pathname, at: new Date().toISOString() });
      writeJson('ra_interactions', events.slice(-200));
    }, true);
  }

  let scheduled = false;
  function run() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      normalizeCopy();
      injectAdvisor();
      enhanceFooter();
      enhanceImages();
      enhanceForms();
      enhanceDialogs();
      installSharing();
      enhanceFamilySelection();
      enableDirectRemoval();
      addMosaicGuidance();
      verifyContactLinks();
      updateStickySelection();
    });
  }

  installMeasurement();
  installKeyboardSupport();
  window.addEventListener('storage', updateStickySelection);
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
  run();
})();
