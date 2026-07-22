(() => {
  const FAMILY_KEY = 'ra_family_selection_v1';
  const QUOTE_KEY = 'ra_quote_v1';
  const FALLBACKS = {
    'Signature Gold': '/images/catalog/rubicer-signature-gold.svg',
    'Natural Cork Floors': '/images/products/rubifloor-premium-cream.webp',
    'Duschabtrennungen': '/images/catalog/rubicer-stria.png',
    'Designarmaturen 2026': '/images/premium/ramon-soler.svg'
  };
  const read = (key) => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const titleOf = (node) => node.closest('article,[role="dialog"]')?.querySelector('h2,h3')?.textContent?.trim() || '';

  function fixImages() {
    document.querySelectorAll('img').forEach((img) => {
      const title = titleOf(img);
      const fallback = FALLBACKS[title];
      if (!fallback || img.dataset.raFixBound) return;
      img.dataset.raFixBound = 'true';
      const apply = () => {
        if (img.dataset.raFallback === fallback) return;
        img.dataset.raFallback = fallback;
        img.src = fallback;
        img.style.objectFit = title === 'Natural Cork Floors' ? 'cover' : 'contain';
        img.style.objectPosition = 'center';
      };
      img.addEventListener('error', apply);
      img.addEventListener('load', () => {
        if (img.naturalWidth < 80 || img.naturalHeight < 80) apply();
      });
    });
  }

  function familyCards() {
    return [...document.querySelectorAll('article')].filter((article) => {
      const links = [...article.querySelectorAll('a')];
      return links.some((a) => a.href.startsWith('mailto:')) && links.some((a) => a.href.includes('wa.me'));
    });
  }
  function familyId(article) {
    return `${article.querySelector('p')?.textContent?.trim() || ''} · ${article.querySelector('h3')?.textContent?.trim() || ''}`;
  }

  function enhanceFamilySelection() {
    const selected = read(FAMILY_KEY);
    familyCards().forEach((article) => {
      const id = familyId(article);
      const button = [...article.querySelectorAll('a')].find((a) => a.href.includes('wa.me') || a.dataset.raFamilyButton);
      if (!id || !button) return;
      const active = selected.includes(id);
      button.dataset.raFamilyButton = 'true';
      button.href = '#';
      button.removeAttribute('target');
      button.setAttribute('role', 'button');
      button.setAttribute('aria-pressed', String(active));
      button.textContent = active ? '✓ Ausgewählt' : '＋ Auswählen';
      button.classList.toggle('bg-[#10293e]', active);
      button.classList.toggle('bg-[#16734b]', !active);
      if (button.dataset.raSelectBound) return;
      button.dataset.raSelectBound = 'true';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const current = read(FAMILY_KEY);
        write(FAMILY_KEY, current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
        enhanceFamilySelection();
        updateBar();
      });
    });
  }

  function enableDirectRemoval() {
    document.querySelectorAll('article').forEach((article) => {
      const button = [...article.querySelectorAll('button')].find((b) => b.textContent.trim() === 'In der Anfrage');
      const name = article.querySelector('h3')?.textContent?.trim();
      if (!button || !name) return;
      button.disabled = false;
      button.textContent = 'Auswahl entfernen';
      button.className = 'rounded-lg border border-[#d6a2a2] bg-white px-4 py-3 text-xs font-extrabold text-[#a23434] hover:bg-[#fff5f5]';
      if (button.dataset.raRemoveBound) return;
      button.dataset.raRemoveBound = 'true';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        write(QUOTE_KEY, read(QUOTE_KEY).filter((item) => item.name !== name));
        location.reload();
      });
    });
  }

  function updateBar() {
    const quote = read(QUOTE_KEY);
    const families = read(FAMILY_KEY);
    const total = quote.length + families.length;
    let bar = document.querySelector('[data-ra-selection-bar]');
    if (!total) { bar?.remove(); return; }
    if (!bar) {
      bar = document.createElement('div');
      bar.dataset.raSelectionBar = 'true';
      bar.className = 'fixed inset-x-3 bottom-3 z-[90] mx-auto flex max-w-xl items-center justify-between gap-3 rounded-2xl border border-white/20 bg-[#10293e] p-3 pl-4 text-white shadow-2xl sm:bottom-5';
      document.body.appendChild(bar);
    }
    const names = [...quote.map((item) => `${item.brand ? `${item.brand} · ` : ''}${item.name}`), ...families];
    const message = `Guten Tag, ich interessiere mich für folgende Auswahl:\n\n${names.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\nBitte prüfen Sie Referenzen, Verfügbarkeit und eine projektbezogene Offerte.`;
    bar.innerHTML = `<div><strong class="block text-sm">${total} ${total === 1 ? 'Produkt ausgewählt' : 'Produkte ausgewählt'}</strong><span class="text-[11px] text-white/65">Auswahl prüfen oder direkt anfragen</span></div><div class="flex gap-2"><a href="/projektanfrage" class="rounded-lg border border-white/25 px-3 py-2 text-xs font-extrabold text-white">Öffnen</a><a href="https://wa.me/41782418913?text=${encodeURIComponent(message)}" target="_blank" rel="noreferrer" class="rounded-lg bg-[#d7aa57] px-3 py-2 text-xs font-extrabold text-[#10293e]">WhatsApp</a></div>`;
  }

  function addMosaicGuidance() {
    if (location.pathname !== '/premium-mosaike' || document.querySelector('[data-ra-mosaic-guidance]')) return;
    const section = document.querySelector('main section.mx-auto');
    if (!section) return;
    const box = document.createElement('div');
    box.dataset.raMosaicGuidance = 'true';
    box.className = 'mb-8 rounded-[18px] border border-[#d9c393] bg-[#fffaf0] p-5 sm:p-6';
    box.innerHTML = `<p class="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#8e6725]">Klare Premium-Kriterien</p><h2 class="mt-2 text-xl font-extrabold text-[#10293e]">Nicht jedes Kleinformat ist automatisch Premium.</h2><p class="mt-3 text-sm leading-6 text-[#5d7381]">Wir unterscheiden zwischen <strong>Design-Akzenten</strong> mit besonderer Material-, Relief- oder Finishwirkung und <strong>koordinierten Serienmosaiken</strong>, die technisch zu einer Flächenserie passen. Für exklusive Projekte priorisieren wir Mastery Mix, Relief- und dekorative Lösungen; Standardquadrate bleiben als funktionale Ergänzung sichtbar.</p>`;
    section.prepend(box);
  }

  function verifyContacts() {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) link.setAttribute('href', 'tel:+41782418913');
      if (href.includes('wa.me/') && !href.includes('wa.me/41782418913')) link.href = link.href.replace(/wa\.me\/[^?]+/, 'wa.me/41782418913');
    });
  }

  let queued = false;
  function run() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      fixImages();
      enhanceFamilySelection();
      enableDirectRemoval();
      addMosaicGuidance();
      verifyContacts();
      updateBar();
    });
  }
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('storage', updateBar);
  run();
})();
