(() => {
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

  function enhanceImages(root = document) {
    root.querySelectorAll('img').forEach((image) => {
      if (!image.hasAttribute('decoding')) image.setAttribute('decoding', 'async');
      if (!image.hasAttribute('loading') && !image.closest('section')?.matches(':first-of-type')) image.setAttribute('loading', 'lazy');
      image.addEventListener('error', () => image.setAttribute('aria-hidden', 'true'), { once: true });
    });
  }

  function enhanceForms(root = document) {
    root.querySelectorAll('form').forEach((form) => {
      if (form.dataset.privacyEnhanced) return;
      form.dataset.privacyEnhanced = 'true';
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

  function installKeyboardSupport() {
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return;
      const close = [...dialog.querySelectorAll('button')].find((button) => /schliessen|close|zurück/i.test(button.getAttribute('aria-label') || button.textContent));
      if (close) close.click();
    });
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
        const shareData = { title: `${heading.textContent} | RA Bau Lieferung`, text: `Premium Produkt: ${heading.textContent}`, url: location.href };
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

  function installMeasurement() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a,button');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      let type = 'interaction';
      if (href.includes('wa.me')) type = 'whatsapp';
      else if (href.startsWith('mailto:')) type = 'email';
      else if (href.startsWith('tel:')) type = 'phone';
      else if (/zur anfrage|hinzufügen/i.test(link.textContent)) type = 'add_to_request';
      const events = JSON.parse(localStorage.getItem('ra_interactions') || '[]');
      events.push({ type, label: link.textContent.trim().slice(0, 100), path: location.pathname, at: new Date().toISOString() });
      localStorage.setItem('ra_interactions', JSON.stringify(events.slice(-200)));
    }, true);
  }

  function run() {
    normalizeCopy();
    injectAdvisor();
    enhanceFooter();
    enhanceImages();
    enhanceForms();
    enhanceDialogs();
    installSharing();
  }

  installMeasurement();
  installKeyboardSupport();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  run();
})();