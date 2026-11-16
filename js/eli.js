/* ==========================================================================
   Namydlená Eli - behaviour layer for Shoptet (template Classic)
   Loaded by snippets/shoptet-head.html together with css/eli.css.

   Rules (see CLAUDE.md):
   - Plain ES2017, no dependencies, no build step. One IIFE, features as
     small functions registered in FEATURES. A feature that throws must
     never break the shop: every feature runs in its own try/catch.
   - Never touch prices, cart totals or order data. Read them from the DOM
     or from Shoptet's own events, only add presentation.
   - Texts shown to customers live in T (Czech, tykání, no em dashes).
   ========================================================================== */
(function () {
  'use strict';

  var T = {
    igTitle: 'Namydlená Eli na Instagramu',
    igFollow: 'Sledovat @namydlenaeli'
  };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---- Instagram: Shoptet's footer widget becomes a full-width strip above the footer ---- */
  function instagramStrip() {
    var widget = $('.instagram-widget');
    var footer = $('#footer');
    if (!widget || !footer || $('.eli-ig')) return;
    var links = $$('a', widget).filter(function (a) { return a.querySelector('img'); });
    if (links.length < 3) return;

    var follow = $('.instagram-follow-btn a', widget);
    var profile = follow ? follow.href : 'https://www.instagram.com/namydlenaeli/';

    var strip = el('section', 'eli-ig');
    strip.setAttribute('aria-label', 'Instagram');
    var head = el('div', 'eli-ig__head');
    head.appendChild(el('h2', 'eli-ig__title', T.igTitle));
    var more = el('a', 'eli-link', T.igFollow);
    more.href = profile; more.target = '_blank'; more.rel = 'noopener';
    head.appendChild(more);
    var feed = el('div', 'eli-ig__feed');
    links.slice(0, 8).forEach(function (a) {
      var c = a.cloneNode(true);
      c.removeAttribute('class');
      c.target = '_blank'; c.rel = 'noopener';
      var img = c.querySelector('img');
      if (img) {
        if (img.dataset && img.dataset.src) img.src = img.dataset.src; /* lazy images from the footer */
        img.loading = 'lazy';
        if (!img.alt) img.alt = 'Příspěvek na Instagramu Namydlené Eli';
      }
      feed.appendChild(c);
    });
    strip.appendChild(head);
    strip.appendChild(feed);
    footer.parentNode.insertBefore(strip, footer);

    var col = widget.closest('.custom-footer__instagram') || widget;
    col.classList.add('eli-ig-moved');
  }

  /* ---- Homepage: Shoptet's own product block moves into the "Eliin výběr" slot ---- */
  function homepagePicks() {
    var slot = $('[data-eli-slot="picks"]');
    if (!slot) return;
    var section = slot.closest('[data-eli-section="picks"]');
    var block = $('.in-index .products-block, .in-index .homepage-products-1, .in-index .products');
    if (!block || slot.contains(block)) {
      if (section && !slot.children.length) section.style.display = 'none';
      return;
    }
    /* take the heading Shoptet prints above the block with it, hidden: ours replaces it */
    var prev = block.previousElementSibling;
    if (prev && /^H[1-6]$/.test(prev.tagName)) prev.style.display = 'none';
    slot.textContent = ''; /* Shoptet's editor pads the empty slot with &nbsp; */
    slot.appendChild(block);
  }

  /* ---- Product names "Jméno - typ": the type becomes a quiet second line ---- */
  function splitNames() {
    $$('.p-detail-inner-header h1, .products-block .name').forEach(function (n) {
      if (n.dataset.eliSplit) return;
      var target = n.querySelector('span[data-micro="name"], span') || n;
      var text = target.textContent.trim();
      var i = text.indexOf(' - ');
      if (i < 1) return;
      n.dataset.eliSplit = '1';
      target.textContent = '';
      target.appendChild(el('span', 'eli-name', text.slice(0, i)));
      target.appendChild(el('span', 'eli-type', text.slice(i + 3)));
    });
  }

  /* ---- Preview switch for the hero badge on mobile: ?eli-badge=bez / ?eli-badge=s (remembered) ---- */
  function badgePreview() {
    var m = location.search.match(/[?&]eli-badge=(bez|s)\b/);
    try {
      if (m) localStorage.setItem('eli-badge', m[1]);
      var v = localStorage.getItem('eli-badge');
      document.documentElement.classList.toggle('eli-badge-mobil-bez', v === 'bez');
    } catch (e) {}
  }

  var FEATURES = [badgePreview, instagramStrip, homepagePicks, splitNames];

  function run() {
    FEATURES.forEach(function (f) {
      try { f(); } catch (e) { if (window.console) console.warn('[eli] ' + f.name + ': ' + e.message); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  /* Shoptet re-renders product lists and the cart with AJAX; run again after it. */
  ['ShoptetDOMContentLoaded', 'ShoptetDOMPageContentLoaded', 'ShoptetDOMCartContentLoaded'].forEach(function (ev) {
    document.addEventListener(ev, run);
  });
})();
