// Atlas surovin: builds modules/atlas/atlas.html from data/products.json + data/ingredients.json.
// Run: node modules/atlas/build.mjs   (Node 18+, no dependencies)
// The output is pasted into Shoptet as the source HTML of the page /atlas-surovin/ (page id 793).
// The page is a small book: tabs Co je uvnitř (signpost) / Výrobky (chapter per product type) /
// Suroviny (index A-Z) / Jak číst INCI. All panels are plain HTML in one page (readable for search
// engines); js/eli.js (atlasTabs) turns them into tabs driven by the URL hash.
// Only content with status "ok" (claims-checked) is rendered.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const P = JSON.parse(readFileSync(join(root, 'data/products.json'), 'utf8'));
const I = JSON.parse(readFileSync(join(root, 'data/ingredients.json'), 'utf8'));

// customer-facing copy of the page (Czech, tykání); lead + productsNote approved by Kuba 22. 11. 2026
const T = {
  kicker: 'Co je uvnitř',
  lead: 'Vyber, co držíš v ruce, a podívej se dovnitř. Pod tím najdeš suroviny, které používám, a proč tam jsou.',
  tabs: { inside: 'Co je uvnitř', products: 'Výrobky', index: 'Suroviny', inci: 'Jak číst INCI' },
  pickTitle: 'Co držíš v ruce?',
  pickReady: 'Z čeho a proč',
  pickSoon: 'Připravuji',
  productsTitle: 'Výrobky',
  productsNote: 'Zatím tu jsou suroviny z deodorantů. Další výrobky přidávám postupně.',
  made: 'Z čeho',
  scents: 'Vůně',
  shop: 'V e-shopu:',
  indexTitle: 'Rejstřík surovin',
  usedIn: 'Kde ji používám:',
  inciTitle: 'Jak číst INCI'
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ok = (x) => !!x && x.status === 'ok';
const types = new Map(P.types.map((t) => [t.id, t]));
const variants = new Map();
for (const t of P.types) for (const v of t.variants) variants.set(v.id, { ...v, type: t });
const ingr = new Map(I.ingredients.map((x) => [x.id, x]));
const chapters = I.chapters.filter(ok);
const ready = new Set(chapters.map((c) => c.type));
// label of a product type in the index ("Deodoranty"); falls back to the type name
const typeLabel = (t) => t.plural || t.name;

// ---- 1. Co je uvnitř: signpost, one tile per product type, grouped by category
const tiles = P.categories.map((c) => {
  const list = P.types.filter((t) => t.category === c.id).map((t) => {
    const inner = `<span class="eli-ico eli-ico--p-${t.icon}" aria-hidden="true"></span><span class="eli-atlas__tile-name">${esc(t.name)}</span>`;
    return ready.has(t.id)
      ? `\n        <a class="eli-atlas__tile" href="#${t.id}">${inner}<span class="eli-atlas__tile-note">${T.pickReady}</span></a>`
      : `\n        <span class="eli-atlas__tile eli-atlas__tile--soon" id="${t.id}">${inner}<span class="eli-atlas__tile-note">${T.pickSoon}</span></span>`;
  }).join('');
  return `
    <h3 class="eli-atlas__cat">${esc(c.name)}</h3>
    <div class="eli-atlas__tiles">${list}
    </div>`;
}).join('');

// ---- 2. Výrobky: one chapter per ready product type
const chapterHtml = chapters.map((c) => {
  const t = types.get(c.type);
  const items = c.ingredients.map((r) => {
    const x = ingr.get(r.id);
    if (!x) throw new Error('Unknown ingredient in chapter ' + c.type + ': ' + r.id);
    let text = [x.about, r.why].filter(Boolean).join(' ');
    text = text.charAt(0).toLocaleLowerCase('cs') + text.slice(1); // reads like the product copy: "Jojobový olej - chemicky to není..."
    return `\n        <li><a href="#${x.id}">${esc(x.name)}</a> - ${esc(text)}</li>`;
  }).join('');
  const sc = c.scents ? `
      <h4 class="eli-atlas__h4" id="${t.id}-vune">${T.scents}</h4>
      <dl class="eli-atlas__scents">${c.scents.items.map((s) => {
    const v = variants.get(s.product);
    if (!v) throw new Error('Unknown product in scents: ' + s.product);
    return `\n        <dt><a href="${esc(v.url)}">${esc(v.name)}</a></dt>\n        <dd>${esc(s.text)}</dd>`;
  }).join('')}
      </dl>
${c.scents.notes.map((n) => `      <p class="eli-atlas__text">${esc(n)}</p>`).join('\n')}` : '';
  return `
    <article class="eli-atlas__chapter" id="${t.id}">
      <div class="eli-atlas__chapter-head"><span class="eli-ico eli-ico--p-${t.icon}" aria-hidden="true"></span><h3 class="eli-h3">${esc(c.title)}</h3></div>
      <h4 class="eli-atlas__h4">${esc(c.intro.title)}</h4>
      <p class="eli-atlas__text">${esc(c.intro.text)}</p>
      <h4 class="eli-atlas__h4">${T.made}</h4>
      <ul class="eli-atlas__made">${items}
      </ul>${sc}
      <p class="eli-atlas__shop">${T.shop}</p>
      <ul class="eli-atlas__variants">
${t.variants.map((v) => `        <li><a href="${esc(v.url)}">${esc(v.name)}</a></li>`).join('\n')}
      </ul>
    </article>`;
}).join('');

// ---- 3. Suroviny: index A-Z of the ingredients used in ready chapters
const usage = new Map();
for (const c of chapters) for (const r of c.ingredients) {
  if (!usage.has(r.id)) usage.set(r.id, []);
  usage.get(r.id).push({ type: types.get(c.type), why: r.why });
}
const seeType = (x) => x.see && types.get(x.see.replace(/-vune$/, ''));
const groupName = new Map(I.groups.map((g) => [g.id, g.name]));
const indexed = I.ingredients
  .filter((x) => usage.has(x.id) || (seeType(x) && ready.has(seeType(x).id)))
  .sort((a, b) => a.name.localeCompare(b.name, 'cs'));
let letter = '';
const indexHtml = indexed.map((x) => {
  // Czech alphabet: Č, Ř, Š, Ž are letters of their own, accents like É or Ú are not
  const L = x.name.charAt(0).toLocaleUpperCase('cs').replace(/[ÁÉĚÍÓÚŮÝĎŤŇ]/, (c) => c.normalize('NFD').charAt(0));
  const head = L !== letter ? `\n      <h3 class="eli-atlas__letter">${(letter = L)}</h3>` : '';
  const uses = x.see
    ? [`<li><a href="#${x.see}">${esc(typeLabel(seeType(x)))}</a></li>`]
    : usage.get(x.id).map((u) => `<li><a href="#${u.type.id}">${esc(typeLabel(u.type))}</a>${u.why ? ' - ' + esc(u.why) : ''}</li>`);
  return `${head}
      <article class="eli-atlas__item" id="${x.id}">
        <span class="eli-ico eli-ico--${x.icon}" aria-hidden="true"></span>
        <div>
          <h4 class="eli-atlas__name">${esc(x.name)}</h4>
          <p class="eli-atlas__tag">${esc(groupName.get(x.group))}</p>
          <p class="eli-atlas__inci">${x.inci.map(esc).join(', ')}</p>${x.about ? `\n          <p class="eli-atlas__text">${esc(x.about)}</p>` : ''}
          <p class="eli-atlas__used">${T.usedIn}</p>
          <ul class="eli-atlas__uses">${uses.join('')}</ul>
        </div>
      </article>`;
}).join('');

// ---- 4. Jak číst INCI (only when approved)
const G = I.inciGuide;
const inciHtml = ok(G) ? `

  <section class="eli-atlas__panel" id="jak-cist-inci" aria-labelledby="eli-atlas-inci">
    <h2 class="eli-h2" id="eli-atlas-inci">${T.inciTitle}</h2>${G.sections.map((s) => `
    <h3 class="eli-atlas__h4">${esc(s.title)}</h3>
    <p class="eli-atlas__text">${esc(s.text)}</p>`).join('')}
  </section>` : '';

const tabs = [['co-je-uvnitr', T.tabs.inside], ['vyrobky', T.tabs.products], ['suroviny', T.tabs.index]]
  .concat(ok(G) ? [['jak-cist-inci', T.tabs.inci]] : []);

const html = `<!--
  Namydlená Eli - Atlas surovin (stránka /atlas-surovin/, id 793; /uvnitr přesměrováno sem = QR z etiket)
  GENERATED by modules/atlas/build.mjs from data/*.json - edit the data, not this file.
  Shoptet admin > Vzhled a obsah > Stránky > Atlas surovin > Popis (zdrojový kód).
  Hidden inline; css/eli.css turns it on. js/eli.js (atlasTabs) makes the panels tabs:
  /atlas-surovin/#deodorant opens Výrobky at that chapter, #jojobovy-olej the index entry.
-->
<div class="eli-block eli-atlas" style="display:none">
  <section class="eli-atlas__intro">
    <p class="eli-kicker">${T.kicker}</p>
    <p class="eli-atlas__lead">${T.lead}</p>
  </section>

  <nav class="eli-atlas__tabs" aria-label="Atlas surovin">
${tabs.map(([id, label]) => `    <a class="eli-atlas__tab" href="#${id}">${label}</a>`).join('\n')}
  </nav>

  <section class="eli-atlas__panel" id="co-je-uvnitr" aria-labelledby="eli-atlas-pick">
    <h2 class="eli-h2" id="eli-atlas-pick">${T.pickTitle}</h2>${tiles}
  </section>

  <section class="eli-atlas__panel" id="vyrobky" aria-labelledby="eli-atlas-products">
    <h2 class="eli-h2" id="eli-atlas-products">${T.productsTitle}</h2>
    <p class="eli-small">${T.productsNote}</p>${chapterHtml}
  </section>

  <section class="eli-atlas__panel" id="suroviny" aria-labelledby="eli-atlas-index">
    <h2 class="eli-h2" id="eli-atlas-index">${T.indexTitle}</h2>
    <div class="eli-atlas__index">${indexHtml}
    </div>
  </section>${inciHtml}
</div>
`;

writeFileSync(join(root, 'modules/atlas/atlas.html'), html);
console.log(`modules/atlas/atlas.html: ${html.length} B, ${chapters.length} chapter(s), ${indexed.length} index entries, INCI guide ${ok(G) ? 'ON' : 'off (draft)'}`);
