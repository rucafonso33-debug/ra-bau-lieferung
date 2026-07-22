(() => {
  const routeMap = {
    '/': 'home',
    '/produkte': 'interior',
    '/baustellenzubehoer': 'baustellenzubehoor',
    '/feinsteinzeug': 'porcelain',
    '/premium-mosaike': 'mosaics',
    '/spc-vinyl': 'spc',
    '/bad-sanitaer': 'bathroom',
    '/projektanfrage': 'quote-planner',
    '/kontakt': 'contact'
  };
  const labels = {
    home: 'Startseite', interior: 'Alle Sparten im Überblick', baustellenzubehoor: 'Baustellenzubehör',
    porcelain: 'Feinsteinzeug', mosaics: 'Premium Mosaike', spc: 'SPC & Vinyl', bathroom: 'Bad & Sanitär',
    'quote-planner': 'Anfrage zusammenstellen', contact: 'Kontakt'
  };
  const paths = Object.fromEntries(Object.entries(routeMap).map(([path, route]) => [route, path]));
  let internalNavigation = false;

  function clickRoute(route) {
    const label = labels[route];
    if (!label) return;
    const candidates = [...document.querySelectorAll('button')];
    const button = candidates.find((item) => item.textContent.trim().includes(label));
    if (button) {
      internalNavigation = true;
      button.click();
      setTimeout(() => { internalNavigation = false; }, 80);
    }
  }

  function installNavigation() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button || internalNavigation) return;
      const text = button.textContent.trim();
      const route = Object.entries(labels).find(([, label]) => text.includes(label))?.[0];
      if (route && paths[route] && location.pathname !== paths[route]) {
        history.pushState({ route }, '', paths[route]);
      }
    }, true);
    window.addEventListener('popstate', () => clickRoute(routeMap[location.pathname] || 'home'));
    const initial = routeMap[location.pathname];
    if (initial && initial !== 'home') setTimeout(() => clickRoute(initial), 350);
  }

  function normalizeCopy(root = document) {
    root.querySelectorAll('button, a, p, span').forEach((node) => {
      if (node.childElementCount) return;
      const text = node.textContent;
      if (text === 'Offerte zusammenstellen') node.textContent = 'Anfrage zusammenstellen';
      if (text === 'Zur Offerte') node.textContent = 'Zur Anfrage';
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

  function installMeasurement() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a,button');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      let type = 'interaction';
      if (href.includes('wa.me')) type = 'whatsapp';
      else if (href.startsWith('mailto:')) type = 'email';
      else if (href.startsWith('tel:')) type = 'phone';
      else if (link.textContent.includes('Zur Anfrage')) type = 'add_to_request';
      const events = JSON.parse(localStorage.getItem('ra_interactions') || '[]');
      events.push({ type, label: link.textContent.trim().slice(0, 100), path: location.pathname, at: new Date().toISOString() });
      localStorage.setItem('ra_interactions', JSON.stringify(events.slice(-200)));
    }, true);
  }

  installNavigation();
  installMeasurement();
  const observer = new MutationObserver(() => { normalizeCopy(); injectAdvisor(); enhanceFooter(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  normalizeCopy(); injectAdvisor(); enhanceFooter();
})();