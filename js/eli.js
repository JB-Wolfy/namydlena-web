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
    /* product page */
    deoSwitch: 'Vyber si atmosféru',
    insideOpen: 'Celé složení a proč tam je',
    faqTitle: 'Časté otázky',
    moreTitle: 'Doplň si',
    sign: 'Eli',
    stickyCta: 'Do košíku',
    brandTag: 'autorská kosmetika z Beskyd',
    blogMore: 'Číst dál',
    /* links from the top bar that join the main menu (the rest stays in the footer) */
    menuExtra: [
      { href: '/muj-pribeh/', label: 'Můj příběh' },
      { href: '/prodejni-mista/', label: 'Prodejní místa' }
    ]
  };

  /* The four deodorants share one page module; colour = stripe on the label (Web Plan section 6). */
  var DEO = [
    { href: '/cervnova-louka-prirodni-deodorant/', name: 'Červnová louka', tone: 'rose' },
    { href: '/letni-podvecer-prirodni-deodorant/', name: 'Letní podvečer', tone: 'softrose' },
    { href: '/pred-bourkou-prirodni-deodorant/', name: 'Před bouřkou', tone: 'sage' },
    { href: '/bezvetri-prirodni-deodorant/', name: 'Bezvětří', tone: 'olive' }
  ];

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

  /* ---- Stock state for the coloured dot: in (skladem) / order / out (nedostupné) ---- */
  function stockState() {
    $$('.availability > span:first-child, .availability-value .availability-label').forEach(function (s) {
      if (s.dataset.eliStock) return;
      var t = s.textContent.trim();
      s.dataset.eliStock = /^skladem\b/i.test(t) ? 'in'
        : /nedostupn|vyprodán|není skladem|nelze/i.test(t) ? 'out'
        : 'order'; /* na objednávku, předobjednávka, do x dnů ... */
    });
  }

  /* ---- Footer: wordmark under the search, like in the header ---- */
  function footerBrand() {
    var col = $('#footer .custom-footer__search');
    if (!col || col.querySelector('.eli-footer-brand')) return;
    var box = el('div', 'eli-footer-brand');
    box.appendChild(el('b')).textContent = T.brandName;
    box.appendChild(el('span')).textContent = T.brandTag;
    col.insertBefore(box, col.firstChild); /* above the "Vyhledávání" heading */
  }

  /* ---- Product page: the "Podrobný popis" (fixed H2/H3 skeleton in Shoptet) becomes modules.
          The text is never changed, only grouped and styled. ---- */
  var slug = function (s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };
  var MOD = { 'co-umi': 'cards', 'dva-tahy-vic-ne': 'callout', 'jak-voni': 'scent', 'bez-vune': 'scent',
    'proc-bez-sody': 'text', 'co-je-uvnitr-a-proc': 'inside', 'caste-otazky': 'faq', 'z-dilny': 'workshop' };
  /* Card icons: Lucide (img/icons/lucide), picked by keywords in the card heading.
     Add a rule here for new products; first match wins, fallback = sparkles. */
  var CARD_ICONS = [
    [/svěž|zápach|čerstv/i, 'wind'],
    [/nepál|citliv|šetrn|jemn/i, 'feather'],
    [/peč|hydrat|vyživ|zvláč|mazl/i, 'droplet'],
    [/vůn|voní|aroma/i, 'flower-2'],
    [/vydrž|dlouh|celý den/i, 'clock'],
    [/přírod|rostlin|bylin/i, 'leaf'],
    [/ruč|láska|s láskou/i, 'hand-heart'],
    [/slun|léto|světl/i, 'sun'],
    [/radost|rituál|potěš/i, 'heart']
  ];
  var cardIcon = function (title) {
    for (var i = 0; i < CARD_ICONS.length; i++) if (CARD_ICONS[i][0].test(title)) return CARD_ICONS[i][1];
    return 'sparkles';
  };

  function productModules() {
    var box = $('.p-detail #description .basic-description');
    if (!box || box.dataset.eliDone || !box.querySelector('h2')) return;
    box.dataset.eliDone = '1';
    document.documentElement.classList.add('eli-pd');
    /* Shoptet's own "Detailní popis produktu" heading before the first H2 */
    var first = box.firstElementChild;
    if (first && first.tagName === 'H3' && /detailn/i.test(first.textContent)) first.remove();

    var wrap = el('div', 'eli-pd__modules');
    var nodes = Array.prototype.slice.call(box.childNodes);
    var sec = null;
    nodes.forEach(function (n) {
      if (n.nodeType === 1 && n.tagName === 'H2') {
        var key = slug(n.textContent);
        sec = el('section', 'eli-pm eli-pm--' + (MOD[key] || 'text'));
        sec.dataset.key = key;
        n.classList.add('eli-pm__title');
        sec.appendChild(n);
        wrap.appendChild(sec);
      } else if (sec) sec.appendChild(n);
      else if (n.nodeType === 1) wrap.appendChild(n);
    });
    box.appendChild(wrap);

    $$('.eli-pm', wrap).forEach(function (s) {
      var type = s.className.replace(/.*eli-pm--(\w+).*/, '$1');
      var title = s.querySelector('.eli-pm__title');
      var body = el('div', 'eli-pm__body');
      while (title.nextSibling) body.appendChild(title.nextSibling);
      s.appendChild(body);

      if (type === 'cards' || type === 'faq') {
        /* H3 + following paragraphs = one card / one question */
        var list = el('div', type === 'cards' ? 'eli-pm__cards' : 'eli-pm__faq');
        var item = null;
        Array.prototype.slice.call(body.childNodes).forEach(function (n) {
          if (n.nodeType === 1 && n.tagName === 'H3') {
            if (type === 'cards') {
              item = el('div', 'eli-pm__card');
              item.appendChild(el('span', 'eli-ico eli-ico--lucide eli-ico--' + cardIcon(n.textContent)));
              item.lastChild.setAttribute('aria-hidden', 'true');
              item.appendChild(n);
            } else {
              item = el('details', 'eli-pm__q');
              var sum = el('summary');
              sum.textContent = n.textContent.trim();
              item.appendChild(sum);
              n.remove();
            }
            list.appendChild(item);
          } else if (item && (n.nodeType === 1 || n.textContent.trim())) item.appendChild(n);
        });
        body.appendChild(list);
      }
      if (type === 'callout') s.insertBefore(el('span', 'eli-pm__big', '2'), title).setAttribute('aria-hidden', 'true');
      if (type === 'scent') {
        var ul = body.querySelector('ul');
        if (ul) ul.classList.add('eli-pm__notes');
        var mood = ul && ul.nextElementSibling;
        if (mood && mood.tagName === 'P') mood.classList.add('eli-pm__mood');
      }
      if (type === 'inside') {
        s.id = 'co-je-uvnitr';
        var det = el('details', 'eli-pm__more');
        var sm = el('summary');
        sm.textContent = T.insideOpen;
        det.appendChild(sm);
        while (body.firstChild) det.appendChild(body.firstChild);
        $$('p', det).forEach(function (p) { if (/^ingredients:/i.test(p.textContent.trim())) p.classList.add('eli-pm__inci'); });
        body.appendChild(det);
        if (location.hash === '#co-je-uvnitr') det.open = true;
      }
      if (type === 'workshop') body.appendChild(el('p', 'eli-sign', T.sign));
    });
    if (location.hash === '#co-je-uvnitr') { var t = $('#co-je-uvnitr'); if (t) t.scrollIntoView(); }
  }

  /* ---- Product page frame: badges, deodorant switcher, quiet tabs, "Doplň si", stars only with ratings ---- */
  function productFrame() {
    var pd = $('.p-detail');
    if (!pd || pd.dataset.eliFrame) return;
    pd.dataset.eliFrame = '1';
    var path = location.pathname;
    var deo = DEO.filter(function (d) { return d.href === path; })[0];

    var header = $('.p-detail-inner-header');
    /* name, badges, flags and stars sit next to the photo (top of the info column), not above it.
       Stars stay always, also "Neohodnoceno": transparency for every product. */
    var infoCol = $('.p-info-wrapper');
    var flags = $('.p-detail .p-detail-info');
    if (infoCol && header && !infoCol.contains(header)) {
      infoCol.insertBefore(header, infoCol.firstChild);
      if (flags) infoCol.insertBefore(flags, header.nextSibling);
    }
    if (deo) {
      var info = $('.p-info-wrapper');
      var cart = info && info.querySelector('.add-to-cart');
      if (cart && !$('.eli-switch')) {
        var sw = el('nav', 'eli-switch');
        sw.setAttribute('aria-label', T.deoSwitch);
        sw.appendChild(el('p', 'eli-switch__label', T.deoSwitch));
        var row = el('ul', 'eli-switch__list');
        DEO.forEach(function (d) {
          var li = el('li');
          var a = el('a', 'eli-switch__item eli-switch__item--' + d.tone);
          a.href = d.href;
          a.appendChild(el('span', 'eli-switch__dot'));
          a.appendChild(el('span', 'eli-switch__name', d.name));
          if (d === deo) { a.setAttribute('aria-current', 'page'); a.classList.add('is-current'); }
          li.appendChild(a);
          row.appendChild(li);
        });
        sw.appendChild(row);
        var price = info.querySelector('.p-final-price-wrapper');
        info.insertBefore(sw, price ? price : cart);
      }
    }

    /* tabs: description always open; similar products become "Doplň si" below; rating tab only with ratings */
    var tabs = $('.p-detail-tabs-wrapper');
    if (tabs) {
      tabs.classList.add('eli-tabs-off');
      var alt = $('#productsAlternative .products-block');
      if (alt && !$('.eli-more')) {
        var more = el('section', 'eli-more');
        var head = el('div', 'eli-head');
        head.appendChild(el('h2', 'eli-h2', T.moreTitle));
        more.appendChild(head);
        more.appendChild(alt);
        tabs.parentNode.insertBefore(more, tabs.nextSibling);
      }
    }
  }

  /* ---- Sticky "Do košíku" bar once the real button scrolls out of view (presses the real button) ---- */
  function stickyCart() {
    var btn = $('.p-detail .add-to-cart-button');
    if (!btn || $('.eli-sticky') || !('IntersectionObserver' in window)) return;
    var bar = el('div', 'eli-sticky');
    bar.setAttribute('aria-hidden', 'true');
    var name = $('.p-detail-inner-header .eli-name') || $('.p-detail-inner-header h1');
    var price = $('.p-detail .price-final-holder');
    var txt = el('div', 'eli-sticky__text');
    txt.appendChild(el('span', 'eli-sticky__name')).textContent = name ? name.textContent.trim() : '';
    if (price) txt.appendChild(el('span', 'eli-sticky__price')).textContent = price.textContent.trim();
    bar.appendChild(txt);
    var go = el('button', 'eli-btn eli-sticky__btn', T.stickyCta);
    go.type = 'button';
    go.tabIndex = -1;
    go.addEventListener('click', function () { btn.click(); });
    bar.appendChild(go);
    document.body.appendChild(bar);
    new IntersectionObserver(function (e) {
      var past = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
      bar.classList.toggle('is-on', past);
    }).observe(btn);
  }

  var FEATURES = [badgePreview, footerBrand, oneMenu, accountIcon, instagramStrip, homepagePicks, homepageBlog, splitNames, stockState, productFrame, productModules, stickyCart];

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
