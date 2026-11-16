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
    igFollow: 'Sledovat @namydlenaeli',
    account: 'Můj účet',
    brandName: 'NAMYDLENÁ ELI',
    brandTag: 'autorská kosmetika z Beskyd',
    blogMore: 'Číst dál',
    /* links from the top bar that join the main menu (the rest stays in the footer) */
    menuExtra: [
      { href: '/muj-pribeh/', label: 'Můj příběh' },
      { href: '/prodejni-mista/', label: 'Prodejní místa' }
    ]
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

  /* ---- One menu: "Můj příběh" and "Prodejní místa" join the category menu,
          the top bar is hidden on desktop in css (its legal links are in the footer) ---- */
  function oneMenu() {
    var ul = $('#navigation .menu-level-1');
    if (!ul || ul.querySelector('.eli-menu-extra')) return;
    T.menuExtra.forEach(function (m) {
      if (ul.querySelector('a[href$="' + m.href + '"]')) return;
      var li = el('li', 'eli-menu-extra');
      var a = el('a');
      a.href = m.href;
      a.appendChild(el('b', null, m.label));
      li.appendChild(a);
      ul.appendChild(li);
    });
    /* Shoptet folds items that do not fit into the "..." helper on resize */
    window.dispatchEvent(new Event('resize'));
  }

  /* ---- Account: the "Přihlášení" button from the top bar moves next to the cart as an icon ---- */
  function accountIcon() {
    var box = $('#header .navigation-buttons');
    var btn = $('.top-navigation-tools .top-nav-button-login, .top-navigation-tools a.top-nav-button[href*="klient"]');
    if (!box || !btn || box.contains(btn)) return;
    btn.classList.add('eli-account');
    btn.setAttribute('aria-label', (btn.textContent || '').trim() || T.account);
    box.insertBefore(btn, box.firstChild);
  }

  /* ---- Zápisník on the homepage: newest articles of the blog section in data-eli-blog ---- */
  function homepageBlog() {
    var slot = $('[data-eli-slot="blog"]');
    if (!slot || slot.dataset.eliDone) return;
    slot.dataset.eliDone = '1';
    var section = slot.closest('[data-eli-section="blog"]');
    var url = slot.getAttribute('data-eli-blog');
    if (!url || !window.fetch) return;
    fetch(url, { credentials: 'same-origin' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var items = Array.prototype.slice.call(doc.querySelectorAll('.news-wrapper .news-item')).slice(0, 3);
      if (!items.length) return;
      slot.textContent = ''; /* Shoptet's editor pads the empty slot with &nbsp; */
      items.forEach(function (it) {
        var link = it.querySelector('a.title') || it.querySelector('a[href]');
        if (!link) return;
        var post = el('article', 'eli-post');
        var img = it.querySelector('img');
        if (img) {
          var media = el('a', 'eli-post__media');
          media.href = link.getAttribute('href');
          media.tabIndex = -1;
          media.setAttribute('aria-hidden', 'true');
          var pic = el('img');
          pic.src = img.getAttribute('data-src') || img.getAttribute('src');
          pic.alt = ''; pic.loading = 'lazy';
          media.appendChild(pic);
          post.appendChild(media);
        }
        var time = it.querySelector('time');
        if (time) post.appendChild(el('p', 'eli-kicker eli-kicker--muted', time.textContent.trim()));
        var h = el('h3', 'eli-h3 eli-post__title');
        var a = el('a');
        a.href = link.getAttribute('href');
        a.textContent = link.textContent.trim();
        h.appendChild(a);
        post.appendChild(h);
        var desc = it.querySelector('.description');
        if (desc && desc.textContent.trim()) post.appendChild(el('p', 'eli-post__text', '')).textContent = desc.textContent.trim();
        var more = el('a', 'eli-link', T.blogMore);
        more.href = link.getAttribute('href');
        post.appendChild(more);
        slot.appendChild(post);
      });
      if (section && slot.children.length) section.hidden = false;
    }).catch(function (e) { if (window.console) console.warn('[eli] homepageBlog: ' + e.message); });
  }

  /* ---- "Skladem" gets its own class, so css can colour in-stock without touching other states ---- */
  function stockState() {
    $$('.availability > span:first-child').forEach(function (s) {
      if (s.dataset.eliStock) return;
      s.dataset.eliStock = /^skladem\b/i.test(s.textContent.trim()) ? 'in' : 'other';
    });
  }

  /* ---- Footer: wordmark under the search, like in the header ---- */
  function footerBrand() {
    var col = $('#footer .custom-footer__search');
    if (!col || col.querySelector('.eli-footer-brand')) return;
    var box = el('div', 'eli-footer-brand');
    box.appendChild(el('b')).textContent = T.brandName;
    box.appendChild(el('span')).textContent = T.brandTag;
    col.appendChild(box);
  }

  var FEATURES = [badgePreview, footerBrand, oneMenu, accountIcon, instagramStrip, homepagePicks, homepageBlog, splitNames, stockState];

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
