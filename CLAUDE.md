# Namydlená Eli - web (Shoptet, šablona Classic)

Design a chování e-shopu namydlenaeli.cz. Repo je zdroj pravdy pro CSS, JS, HTML bloky a Worker poradce.
Zadání a rozhodnutí: **`docs/WEB_PLAN.md`** (hlavní kopie; v Claude Projectu je zrcadlo). Když se tento soubor
a Web Plan liší, platí Web Plan. Rozpracovaný stav: `HANDOFF.md`. Tenhle soubor říká, **jak** se tady píše kód, aby ho mohl kdokoli dokončit stejným stylem.

## Jak to celé funguje

- V Shoptetu žije jediný kus kódu: `snippets/shoptet-head.html` (admin > Vzhled a obsah > Editor > HTML kód > Záhlaví).
- Loader přidá na `<html>` třídu `eli` a načte `css/eli.css` + `js/eli.js` z jsDelivr z daného commitu.
- **Všechno CSS je pod `html.eli`.** Bez třídy se nic neprojeví. Vypnutí vrstvy = `RELEASE = ''` v loaderu.
- HTML bloky v obsahu Shoptetu (`modules/`) mají inline `style="display:none"` a třídu `eli-block`; zapíná je až CSS.
  Dají se proto vložit dopředu a zákazník je neuvidí.
- Nic se v adminu nemaže kvůli designu. Staré bannery apod. se schovávají v CSS (část 4), aby šel návrat jedním řádkem.

## Náhled bez dopadu na zákazníky

    https://www.namydlenaeli.cz/?eli=<commit sha>   zapne náhled v tomto prohlížeči
    https://www.namydlenaeli.cz/?eli=off            vypne
    https://www.namydlenaeli.cz/?eli-badge=bez      odznak v hero na mobilu skrytý (?eli-badge=s zpět)

Při vývoji používej **commit sha** (jsDelivr ho servíruje hned a napořád). Větev (`@main`) si jsDelivr drží v cache až 12 h.

## Vydání a návrat

1. Otestuj náhled na 390 px a 1440 px (mobil má přednost) + celý průchod košíkem, pokud se sahalo na košík.
2. Zapiš změnu do `CHANGELOG.md` (datum + sha), pushni do `main`.
3. V loaderu v Shoptetu nastav `RELEASE = '<celé sha commitu>'`. Návrat = vrátit předchozí sha.
   Předtím sha „zahřej“: jsDelivr první minuty po pushi u nového commitu občas vrací chybu.
   Otevři `https://cdn.jsdelivr.net/gh/JB-Wolfy/namydlena-web@<sha>/css/eli.css` (a `js/eli.js`), až vrátí 200, teprve pak vydej.

Vydává se přes **sha commitu**, ne přes tagy: cloudová session modelu tagy pushnout nesmí (proxy je odmítá).
Tag si může Kuba kdykoli udělat ručně na GitHubu, loader ho vezme stejně.

Obrázky v obsahu Shoptetu (hero, Eli) mají v URL sha commitu, který je přidal (na jsDelivr neměnné).
Nová fotka = nový soubor, push, přepsat sha v URL v bloku. Ikony a fonty jdou přes relativní URL v CSS,
verzují se samy s vydáním.

## Struktura

    css/eli.css            jeden soubor: 1 fonty, 2 tokeny, 3 naše komponenty .eli-*, 4+ přepisy Shoptetu
    js/eli.js              jedna IIFE, funkce v poli FEATURES, každá ve vlastním try/catch
    modules/home/          HTML bloky úvodní stránky (vkládají se jako zdrojový kód)
    modules/product/       šablony popisů produktů (deo, ...)
    modules/atlas/         stránka /uvnitr
    snippets/              kód, který se vkládá do adminu Shoptetu
    data/                  products.json, ingredients.json (kvíz, poradce, Atlas)
    worker/                Cloudflare Worker pro B.U.B.L.I.N.A. (klíče NIKDY do gitu, jen Cloudflare secrets)
    img/, fonts/           statické soubory (fonty jsou self-hosted, žádný požadavek na Google)

## Pravidla CSS

- Barvy jen přes tokeny `--eli-*` (tabulka v Web Plan §3 a v `eli.css` část 2). Jiná barva = chyba.
  Olivová a rose nikdy jako barva drobného textu (neprojdou kontrastem).
- Písma: PT Serif (nadpisy, citace), Poppins 300/400/500 (text), Raleway 600 (jen logo).
  Nic pod 13 px. Poppins 300 jen od 16 px, menší text 400.
- Tvary: fotky a boxy s malým rádiusem (`--eli-r-photo`, `--eli-r-box`), tlačítka a štítky pilulka.
  **Žádné oblouky, žádné zaoblené karty se stínem, žádné přechody** (jediná výjimka: rozplynutí hero fotky dole). Dělení tenkou linkou `--eli-border`.
- Mobile first, zlomy 768 px a 1100 px. Zelená plocha max. jedna na stránku + patička.
- Vlastní komponenty `.eli-nazev`, prvky `.eli-nazev__prvek`, varianty `.eli-nazev--varianta`.
- Přepisy Shoptetu: vždy s prefixem `.eli`, co nejkratší selektor, `!important` jen kde ho používá Shoptet.
  U každého bloku přepisů komentář, na jaké stránce a šabloně byl ověřen.
- Reset uvnitř `.eli-block` je přes `:where()`, aby nepřebíjel komponenty.

## Pravidla JS

- Čisté ES2017, bez knihoven, bez buildu. Nová funkce = jedna funkce + zápis do `FEATURES`.
- Funkce musí být idempotentní (Shoptet překresluje košík a výpisy AJAXem, `run()` běží opakovaně).
- Nikdy nepočítat ani nepřepisovat ceny, součty a objednávku. Jen číst z DOM / událostí Shoptetu a přidat prezentaci.
- Texty pro zákazníky jsou v objektu `T` nahoře v souboru.
- Chyba ve funkci nesmí shodit e-shop: vše běží v try/catch a jen loguje `[eli]`.

## Texty a tvrzení

- Tykání, hlas Eli v první osobě. Žádné dlouhé pomlčky, jen ` - `. Žádná AI klišé.
- Texty produktů se nevymýšlí: jsou v Shoptetu v „Podrobném popisu“ s pevnou kostrou H2/H3, kód je jen styluje.
- Žádná léčebná tvrzení, žádné „dermatologicky testováno“, „detox“, „non-toxic“, „hypoalergenní“.
- Recenze jen skutečné a beze změny textu. Na webu nikdy AI fotka Eli. Žádné slevy a slevové odznaky.
- Klub se na webu nepropaguje, dokud ho Kuba nepotvrdí.

## Kdo co smí v adminu

- Model: HTML kód záhlaví/zápatí, texty a bloky úvodní stránky, stránky, popisy produktů.
- Vždy Kuba: tarify, doplňky, ceny, doprava, platby, objednávky, zákazníci, fotky produktů.

## Stav a co zbývá (aktualizuj při každé session)

Live od 16. 11. 2026 (Classic + vrstva, aktuální RELEASE viz `CHANGELOG.md`). Vydává se v admin > Vzhled a obsah >
Editor > HTML kód > Záhlaví (ne v Návrháři, ten po zveřejnění vytváří nový koncept).

Hotovo: úvodní stránka, globální vrstva (hlavička, jedno menu, ikony Lucide, karty, patička, mobil), „Kde začít“ jako čtvercové dlaždice,
produktová stránka (krátký popis nahoře, cena u košíku + výdrž, rámeček dopravy, pilíře, rejstřík kapitol, hodnocení a diskuze vždy
viditelné, přepínač vůní deo), výpis kategorie, košík na mobilu. Rozhodnutí a poučení k produktové stránce: `HANDOFF.md`.

Další na řadě:
0. Popisy ostatních produktů do kostry s H2 (pak mají rejstřík).
1. Košík: odpočet do dopravy zdarma (600 Kč) ve stylu webu, upsell, hláška k dárku.
2. `/uvnitr` (rozcestník + kapitoly), kvíz B.U.B.L.I.N.A., Worker.

Otevřené od Kuby: testovací článek v Zápisníku skrýt; deodoranty „Skladem“ vs. text o předobjednávce;
datum poslední objednávky do Vánoc (informační lišta).
