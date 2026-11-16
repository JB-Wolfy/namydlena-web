---
title: "Namydlená Eli - Web Plan v2 (redesign e-shopu)"
type: plán
status: v2.5 - živý dokument, jediný zdroj pravdy pro web
created: 2026-11-08
updated: 2026-11-15
nahrazuje: Design Runbook §7, Rebrand Execution BRIEF E, claude/Handoff_Eshop_Platforma_a_Inspirace.md (sloučeno sem)
umístění: hlavní kopie je v repu `docs/WEB_PLAN.md`; v Claude Projectu je zrcadlo `claude/Namydlena_Eli_Web_Plan_v2.md`
---

# Namydlená Eli - Web Plan v2

## 0. Jak s dokumentem pracovat

- Každá web session začíná přečtením tohoto dokumentu. Na konci session se aktualizuje §13 Stav (3 řádky).
- **Hlavní kopie je v repu** (`docs/WEB_PLAN.md`), protože přežije změnu účtu Claude. Po úpravě ji zkopíruj i do projektu.
- Jedna věc na session (Master One). 70 % = ship.
- Rozhodnutí v §1 se nediskutují znovu bez nového důvodu. Otevřené body jsou v §12.
- Tokeny a typografie: Design Runbook §2 je zdroj, zde jen převod do CSS.
- Tento dokument je zároveň zadání (brief) pro kódování webu. Jak se píše kód, říká `CLAUDE.md` v repu.

## 1. Zamčená rozhodnutí

- **Platforma: zůstáváme na Shoptetu.** Shopify by ušetřil jen cca 400-600 Kč/měs., migrace = desítky hodin + rizika (recenze, poukazy s ručními kódy, QR /uvnitr a /poukazy, Klub na SmartEmailingu). Skutečný problém byl design, ne platforma. SumUp na trzích zůstává.
- **Pěkný web nepotřebuje Premium.** Perfino (MIME) běží na běžném tarifu, vzhled = vlastní CSS vrstva.
- **Code freeze zrušen** (původně 10. 10. 2026 - 2. 1. 2027). Cíl: před Vánoci zaujmout lidi, kteří přijdou z trhů. Rollback přes git.
- **Kdo co dělá:** Claude navrhuje i kóduje (CSS/HTML/JS). GPT se nepoužívá. Kubova slova = zadání. Kuba fotí a nasazuje. Rozdělení nasazení viz §4.
- **GPT v2 prototyp se nepoužije** (15. 11. 2026). Jeho kód se do projektu nepřenáší.
- **Mockup zrušen, stavíme rovnou na e-shopu** (15. 11. večer). Design se dělá na živém Shoptetu (Classic) přes náhled `?eli=<sha>`, zákazníci nic nevidí až do vydání. Mockup na plátně zůstává jen jako historie.
- **Tvarosloví: žádné oblouky, „Canva styl“ ne** (15. 11.). Fotky a boxy s malým rádiusem, tlačítka pilulka, dělení tenkou linkou, žádné stíny a přechody. Jediný přechod = rozplynutí hero fotky dole.
- **Směr: autorská kosmetika.** Eli a její příběh je tahoun, produkty jsou výsledek, vše ostatní je bonus. „Eli tvoří. Kuba pozoruje.“ Kuba je součástí příběhu přes Zápisník (podpis „Namydlený Kuba“), autorita přes „Znáte nás z médií“.
- **Oslovení: tykáme.** „Do vašich…“ v textech = množné číslo, ne vykání.
- **Žádné slevy na webu** (15. 11.). Slevové bannery (včetně banneru 100 Kč) a slevové odznaky (včetně „-14 %“ u předobjednávky) jdou pryč. Klub se zvaliduje později, do té doby se na webu nepropaguje.
- **Evergreen hero místo sezónních bannerů.** Jedna nadčasová fotka Eli s produkty, mění se max. 1× ročně. Akce a sezóna jen v textovém announcement baru.
- **Na webu nikdy AI portrét Eli.** Jen skutečné fotky.
- **Fotky produktů jen ze Shoptetu** (15. 11.). Shoptet nabízí poměr 4:3 / 1:1 / 3:4 / 2:3 (4:5 ne). Návrh 16. 11.: přepnout z 1:1 na 3:4 a nové fotky fotit 3:4 (nativní portrét X1D II); deo fotky 4:5 kód dorovná. Kód je jen styluje, nikdy se kvůli nové fotce nemění.
- **Content-gated:** Zápisník, kapitoly Atlasu surovin, poradce a YouTube jdou do menu až s reálným obsahem. Žádné odkazy do prázdna. Postavit je smí kdykoli, spustit až po kontrole obsahu.
- **AI poradce se jmenuje B.U.B.L.I.N.A.** (15. 11.) = **B**ystrá **U**mělá **B**ytost, **L**askavě **I**nformující o **N**amydlené **A**utorské kosmetice. Bublina z mýdla i bublina chatu, tečkovaná zkratka jako styl, žádná cizí jména ani symboly.
- **Logo zatím Raleway.** Cormorant (z poukazů) se testuje mimo web, rozhodnutí při příštím tisku etiket.
- **Přívlastek značky: „autorská kosmetika z Beskyd“** (8. 11. 2026, nahrazuje „poctivá kosmetika z Beskyd“). Web hned, etikety postupně při tisku.
- **Produktové názvy:** „Jméno - typ produktu“ (např. „Bezvětří - přírodní deodorant“), normální velikost písmen, verzálky jen CSS.

## 2. Šablona

**ROZHODNUTO 8. 11. 2026: Classic.** Přepnout ze Stepu před psaním CSS. Při vlastní CSS vrstvě je šablona jen kostra, Classic má nejméně vlastního stylu k přebíjení a je ověřený u Perfino/Olivie/Herbavis. Papelote (UX vzor košíku a Instagramu) stojí na Disco, jeho zážitek ale dělá vrstva Webotvůrců + doplňky, ne šablona - přenositelné na Classic.

- Technická poznámka Classic: `.description-inner` je flex, nutné `display:block`.
- Step (aktuální) nemá drobečkovou navigaci (SEO). Samba schovává hlavičku při scrollu.
- HTML moduly (hero, popisy produktů, média) jsou na šabloně nezávislé. Závislé jsou jen CSS selektory globální vrstvy.
- Před přepnutím: zálohovat nastavení menu, bannerů a textů homepage, ověřit náhled v Návrháři.

## 3. Design systém (web)

CSS proměnné (prefix `--eli-`):

| Token | Hex | Použití |
|---|---|---|
| `--eli-forest` | #2F4738 | primární akce, nadpisy, linky ikon |
| `--eli-olive` | #CBD18F | sekundární akcent (jen plocha) |
| `--eli-rose` | #CD7A7C | hlavní akcent (tip box, zvýraznění) |
| `--eli-softrose` | #DDB7B0 | plochy, karty |
| `--eli-sage` | #A8BB9F | plochy, karty |
| `--eli-cream` | #F7F1E8 | pozadí webu |
| `--eli-silver` | #F5F5F0 | plochy webu |
| `--eli-border` | #D8D1C4 | linky, oddělovače |
| `--eli-ink` | #2E2B28 | text |
| `--eli-muted` | #6E675F | sekundární text |

- Jakákoli barva mimo tokeny = chyba.
- Písma: PT Serif (nadpisy), Poppins 300/400/500 (text), Raleway (jen logo). Cormorant zatím ne. Fonty self-hosted v repu.
- Velikost písma: nic pod 13 px, Poppins 300 jen od 16 px.
- Ikony: vlastní sada z Recraftu (sklenice, hřeben, dlaně, list, kopretina), 40-60 px, barva `--eli-forest`.
- Čitelnost: text článků max. cca 700 px šířky, širší jen fotky.
- Kontrast: světle olivová na bílé neprochází - olivovou jen jako plochu, ne text.
- Pocit: hodně krémové plochy a vzduchu, zelená jen na tlačítkách a na jednom výrazném bloku na stránku.

## 4. Architektura kódu a deploy

- **Repo:** https://github.com/JB-Wolfy/namydlena-web = zdroj pravdy pro CSS, HTML moduly, JS, Worker poradce i tento plán. Musí být **Public** (jsDelivr soukromé repo neservíruje).
- Struktura:
  - `css/eli.css` - fonty, tokeny, komponenty `.eli-*`, přepisy Shoptetu
  - `js/eli.js` - funkce (Instagram, Eliin výběr, odpočet dopravy, upsell, kvíz...)
  - `modules/home/` - blok úvodní stránky
  - `modules/product/` - šablony popisů (deo, šampuk, peeling, balzám...)
  - `modules/atlas/` - stránka /uvnitr: rozcestník + kapitoly surovin
  - `snippets/shoptet-head.html` - loader, jediný kód v Shoptetu
  - `worker/` - Cloudflare Worker pro B.U.B.L.I.N.A. (API klíč jen v Cloudflare)
  - `data/` - `products.json`, `ingredients.json`
  - `docs/WEB_PLAN.md` - tento plán, `HANDOFF.md` - stav pro další session, `CLAUDE.md` - pravidla kódu
- **Načítání:** loader v záhlaví Shoptetu načte CSS + JS z jsDelivr z **konkrétního commitu** (`RELEASE = '<sha>'`). Prázdné = vrstva vypnutá. Rollback = vrátit předchozí sha. Tagy nejdou (cloudová session je nesmí pushnout).
- **Náhled:** `?eli=<sha>` zapne vrstvu jen v daném prohlížeči, `?eli=off` vypne.
- HTML moduly se vkládají do Shoptetu v režimu zdrojového HTML, mají `display:none` a zapne je až CSS. Po uložení ověřit, že zůstaly `<details>`/`<summary>`.
- Rozbalování a FAQ: čisté `<details>`, bez JS.
- Pokladna: jde přestylovat (pole, písmo, barvy), strukturu kroků ne.
- Testovat na 390 px (mobil) a 1440 px (desktop) před každým vydáním. Mobil má přednost - lidé z trhů a z QR kódů chodí z telefonu.

### Kdo co nasazuje

**Jednorázově Kuba:**

1. GitHub: repo přepnout na Public.
2. Záloha menu, bannerů a textů homepage (screenshoty), přepnutí šablony na Classic.
3. Přihlásit se do adminu v prohlížeči, se kterým pracuje Claude.
4. Vypnout slevy a slevové bannery, vypnout „-14 %“.
5. Založit prázdné stránky / rubriky: /uvnitr, `/zapisnik/`, `/zapisnik/od-eli/` (skryté).
6. Zakoupit skladové hospodářství.

**Claude smí v adminu sám:** HTML kód záhlaví a zápatí, texty a bloky úvodní stránky, stránky, popisy produktů.
**Vždy Kuba:** tarify, doplňky, ceny, doprava, platby, objednávky, zákazníci, fotky produktů.
**Kontrola:** po každém vydání Kuba projde web na telefonu.

## 5. Homepage - struktura (stav 15. 11. večer, kód v `modules/home/home.html`)

1. **Announcement bar** - jedna věta: vánoční termín objednávky + doprava zdarma od 600 Kč. Žádné slevy.
2. **Hero** (15. 11. večer) - originální fotka, Eli uprostřed, dole se rozplyne do krémové a text navazuje pod ní uprostřed. **Vybráno: upravené pozadí bez boxu** (stěna srovnaná do #F7F1E8, fotka se prolne nahoře, do stran i dolů, hlavička na úvodní stránce bez linky splyne s fotkou). Varianta „originál v banner boxu“ zůstává v kódu jako záloha (`eli-hero--box`). Desktop (od 1100 px) podle reference Lumière: text vlevo (kicker s linkou, velký nadpis, věta, podpis, tlačítka „Vybrat si péči“ + „Můj příběh“), Eli vpravo, fotka se prolne do stránky. Mobil 1:1 s textem pod fotkou, lokty celé. Volitelný kulatý odznak „S láskou z Beskyd i do Beskyd“ (badge-new + text po obvodu) - rozhodnutí s/bez čeká na Kubu. Varianta „Eli vpravo, text vlevo“ zamítnuta (fotka je focená na střed, Eli byla ustřižená). Kicker „autorská kosmetika z Beskyd“, nadpis „Malé rituály. Velká radost.“, věta „Z mých rukou do vašich každodenních rituálů.“ + podpis Eli, tlačítko „Vybrat si péči“ (později kvíz poradce). Text jako živé HTML. H1 musí na stránce existovat.
3. **Kategorie** - Dárky / Denní péče / Rituály s odkazy na podkategorie. Fotky kategorií (4:5) až budou.
4. **Eliin výběr „Bez čeho se neobejdu“** - nativní blok produktů Shoptetu (produkty se vybírají v adminu), JS ho přesune do sekce.
5. **Tři pilíře** - Vlastní receptury / Ručně v Beskydech / Osobní příběh, ikony z Recraftu.
6. **Jsem Eli** - fotka Eli na trhu, úvod příběhu, odkaz na Můj příběh. Starší portrét patří na stránku Můj příběh.
7. **Zápisník** - řeší šablona Classic, doladí se na dummy článku po přepnutí šablony.
8. **Hodnocení obchodu „Co o nás píšete“** - 3 skutečná hodnocení ze Shoptetu (5,0/5), text beze změny. Pokud Classic umí nativní blok, použít ten.
9. **Znáte nás z médií** - viz §8.
10. **Instagram** - pruh fotek nad patičkou podle Papelote, z nativního widgetu Shoptetu. Desktop 6 fotek, mobil posuvná řada.
11. **Footer** - forest pozadí, krémový text: kontakt, doprava, poukazy, O Eli, Co je uvnitř (/uvnitr).

Menu: Denní péče · Rituály · Dárky · O Eli · Zápisník (Zápisník až s článkem).

## 6. Produktová stránka

- **Pilot: deodoranty** (Letní podvečer první, pak zbylé 3 stejným modulem).
- Nativní část Shoptetu nahoře zůstává: galerie 4:5, název, krátký popis, dostupnost, cena, košík.
- Název rozdělený podle „ - “: jméno verzálkami s prostrkáním (PT Serif), typ malým pod ním. Cena + Kč/g.
- Textové odznaky: Bez sody · Papírová tuba · Ručně v malých várkách.
- Přepínač 4 atmosfér: kolečka v barvě proužku etikety (Červnová louka #CD7A7C, Letní podvečer #DDB7B0, Před bouřkou #A8BB9F, Bezvětří #CBD18F), odkazy na 4 produkty.
- Obsah v „Podrobném popisu“ už je v Shoptetu s pevnou kostrou H2 na modul a H3 pro karty a FAQ. Redesign text nepřepisuje, jen styluje.
- Moduly deo: Co umí (3 sloupce s ikonami) · Dva tahy. Víc ne. (zelený callout s velkou dvojkou) · Jak voní / Bez vůně (pyramida 3 řádky, bez procent) · Proč bez sody · Co je uvnitř a proč (rozbalovací + Ingredients, kotva `#co-je-uvnitr`, suroviny prolinkované do Atlasu) · Časté otázky · Z dílny (přejmenovat, viz §14).
- Lepicí lišta „Do košíku“ při scrollu.
- Pod tím: Doplň si (zbylá 3 dea + balzám). Blok hodnocení se zobrazí až s prvním hodnocením. Klub tlačítko až po validaci Klubu.
- Další produkty dostanou moduly až při svém relabelu. Nikdy nepřebírat tvrzení z deo textů na jiný produkt.

## 7. Hero fotka + video rozhovor

- **Hero fotka je hotová (15. 11.)**, v repu `img/hero-desktop.jpg` (3:2) a `img/hero-mobil.jpg` (4:5). Stěna je krémová #F7F1E8, splývá se stránkou. Master v plném rozlišení zvlášť.

**Video rozhovor s Eli (termín později, otázky v §14):**

- Cíl: přepis jako podklad pro texty Jsem Eli a Z dílny + 2-3 úryvky na Reels jako bonus.
- **Kuba není v záběru.** Sedí vedle kamery, otázky se vystřihnou. Eli začíná odpověď celou větou, která otázku zopakuje.
- **Světlo:** Aputure + softbox 45°, odrazka, pozadí s hloubkou obýváku.
- **Kamera:** DJI Pocket 4P na stativu v úrovni očí, Eli se dívá na Kubu, na šířku 4K (rezerva na 9:16).
- **Zvuk má přednost:** bezdrátový mikrofon na svetr, zavřená okna, na začátku 10 s ticha.
- Rozsah: obecné otázky + 4 dea × cca 10 min.

## 8. Média a Zápisník

**Znáte nás z médií** (styl podle belenka.cz):

- Nadpis „Znáte nás z médií“, pod ním mřížka log 3 sloupce (i na mobilu), jednobarevná loga, hodně vzduchu, na `--eli-silver`. Bez citátů.
- Jen média, kde Eli opravdu byla. Logo vždy jako odkaz na konkrétní článek / pořad.
- Loga brát z oficiálních press kitů médií, nepřebarvovat jinak než do jedné barvy. Do té doby názvy textem.

| Médium | Stav odkazu |
|---|---|
| Patriot | přímý článek, URL dodá Kuba |
| Marianne | přímý článek, URL dodá Kuba |
| Deník | chybí přímá URL - logo zatím bez odkazu |
| Česká televize, Dobré ráno 24. 9. | odkaz na článek #1 v Zápisníku (`/zapisnik/dobre-rano/`), doplnit rok vysílání |

**Zápisník:**

- Dva hlasy, nikdy pod společným podpisem: **Kuba** - „Zápisník pozorovatele“, podpis „Namydlený Kuba“ (pracovní název formátu „Co se nevejde na etiketu“). **Eli** - speciál s videem, až bude rozhovor.
- Rubriky v Shoptetu: `/zapisnik/` a `/zapisnik/od-eli/`. Autor + datum v úvodu. YouTube přes editor, bez autoplay.
- Vzhled řeší šablona Classic + CSS; doladí se na dummy článku po přepnutí šablony.
- **Článek #1 = Kuba o ČT Dobré ráno, týden 16.-22. 11. 2026.** Až bude live: Zápisník do menu, odkaz ČT v médiích.
- Rubrika `/zapisnik/od-eli/` zůstane skrytá, dokud nebude první Eliin obsah.
- Frekvence: začít čtvrtletně, zrychlit podle chuti a kapacity. Rozhoduje Kuba.

## 9. Backlog funkcí a sekcí

**A. Konverze - před Vánoci (dopad na tržby):**

1. **Odpočet do dopravy zdarma (600 Kč)** v košíku: „Do dopravy zdarma ti chybí 180 Kč“ - vlastní JS. Otestovat celou pokladnu.
2. **Lepicí lišta „Do košíku“** na produktové stránce při scrollu (Apple).
3. **Upsell v košíku** (2-3 produkty) - vlastní JS (Papelote).
4. **Dárek nad částku** - Kuba uvádí, že Shoptet má nativní možnost. Ověřit v adminu, nastavit nativně, JS jen na hlášku „Ještě X Kč a dárek je tvůj“.
5. **Recenze na homepage** - HOTOVO v kódu jako blok skutečných hodnocení obchodu. Po přepnutí ověřit, jestli Classic umí nativní blok; pokud ano, nahradit.
6. **Skladové hospodářství** - kupuje se (200 Kč/měs.). Po zapnutí nastavit sklad deodorantů a dalších produktů, dostupnost řídit skladem.
7. **Instagram pruh** - HOTOVO v kódu (podle Papelote).

**B. Poradce, Atlas, YT:**

8. **B.U.B.L.I.N.A. = kvíz + AI na zavolání.**
   - **Kvíz (v1, čisté JS, data z `data/products.json`):**
     - Start: dvě velká tlačítka **„Vybírám pro sebe“** / **„Hledám dárek pro někoho“**.
     - Pro sebe: Co chceš řešit? (podpaží / vlasy / rty / tělo / pleť / chvíle v koupeli) → Vůně ano, nebo bez vůně? → 1-3 produkty s krátkým důvodem a tlačítkem Do košíku.
     - Dárek: Pro koho? (pro ni / pro něj / je mi to jedno) → Kolik chceš dát? (do 200 / do 400 / víc) → sady, produkty, nad limit nebo „nevím“ → dárkový poukaz.
     - Deo větev obsahuje „Který deodorant je pro mě?“ (porovnání 4 vůní).
     - Na konci: „Chceš se na něco doptat? Zeptej se B.U.B.L.I.N.Y.“ → AI.
   - **AI na zavolání (v2):**
     - Model: Claude API, nejmenší model řady Haiku. Aktuální název modelu a cenu ověřit na docs.claude.com.
     - Architektura: Cloudflare Worker (stejně jako Klub) drží API klíč, web volá jen Worker. Klíč nikdy ve frontendu ani v gitu.
     - Ochrana: Cloudflare Turnstile proti botům, limit dotazů na IP, max. délka odpovědi, měsíční strop útraty nastavený v Claude Console.
     - Znalosti: systémový prompt jen z `data/products.json` + schválených textů popisů + Atlasu. Nic mimo to.
     - Pravidla: žádná léčebná tvrzení ani slib účinku na kožní potíže; při zdravotní otázce odkaz na lékaře / lékárníka; když neví → kontakt na Eli (info@namydlenaeli.cz); nemluví za Eli v první osobě.
     - Transparentnost: hned v prvním okně jasně „Jsem B.U.B.L.I.N.A., AI asistentka, ne Eli“ (AI Act + poctivost značky).
     - GDPR: konverzace se neukládají, do chatu nepsat osobní údaje, krátká poznámka v zásadách ochrany osobních údajů.
     - Před spuštěním: test 20-30 otázek včetně záludných (ekzém, těhotenství, alergie, dítě), Kuba odklepne.
9. **Atlas surovin = stránka /uvnitr.**
   - **Nahoře rozcestník:** „Co držíš v ruce?“ - mřížka dlaždic produktů (fotka + jméno jako na etiketě), seskupená podle kategorie. Dlaždice vede na produktovou stránku na `#co-je-uvnitr`. U přechodu etiket klidně obě fotky.
   - **Dole kapitoly surovin:** souhrn všech surovin z INCI našich produktů (nic nevymýšlet). Kapitola: český název + INCI, tenkolinková SVG ilustrace v `--eli-forest`, co dělá (bez léčebných tvrzení), ve kterých produktech je. Zdroj = existující „Co je uvnitř a proč“, sjednotit do `data/ingredients.json`.
   - **Spuštění ve dvou krocích:** rozcestník live co nejdřív; kapitoly až po claims-checku každé z nich.
   - **QR na etiketách řeší Kuba:** nové etikety odkaz na Atlas, stávající QR Kuba přesměruje.
10. **YouTube sekce** - zatím jen instrukce. Implementace až s prvním videem.

Reference: Herbavis/Perfino = komponenty popisu · Papelote = košík + Instagram · Apple = sticky lišta + porovnání · belenka.cz = média · Kvitok = příběh. Inspirace 15. 11. (GERA, Lumière, NueSkin): fotka přes šířku s textem, stavba produktové stránky. Nebrat: trhané okraje, vymyšlená čísla („10K+ zákazníků“), modelky.

## 10. Compliance opravy (blokující)

- **Balzám na rty měsíček** - text obsahuje rizikové claimy: „bez alergických reakcí“, „antibakteriální vlastnosti“, „Testováno dle EU směrnic“. Přepsat.
- Při převodu každého produktu, každé kapitoly Atlasu a textů poradce projít claims-check (žádná léčebná tvrzení, žádné „non-toxic“, žádné zakázané badge).

## 11. Pořadí prací

| Kdy | Co | Hotovo když |
|---|---|---|
| ~~15. 11.~~ | ~~Mockup~~ - zrušen, nahrazen náhledem na živém webu | - |
| 15. 11. | Základ v repu: loader, tokeny, fonty, blok homepage, Instagram | HOTOVO (commit v repu) |
| po migraci na Team | Kuba: repo Public, záloha, Classic, přihlášení v prohlížeči, slevy pryč | Classic aktivní |
| hned potom | Loader do záhlaví, globální vrstva `eli.css` (header, menu, tlačítka, typografie, karty, footer, mobil) | review 390 + 1440 px |
| hned potom | Homepage na živém webu, vydat | live |
| 16.-22. 11. | Kuba píše článek #1 → Zápisník live (doladit vzhled na dummy článku) | článek live |
| 16.-22. 11. | Letní podvečer s moduly + lepicí lišta, pak zbylá 3 dea | 4 deo stránky live |
| 16.-22. 11. | Odpočet dopravy zdarma, skladové hospodářství, nativní dárek | live / nastaveno |
| co nejdřív | Rozcestník /uvnitr live, Kuba přesměruje stávající QR | QR z etikety vede na Atlas |
| do Vánoc | Upsell, hláška k dárku. Kvíz live, pokud prošel testem | live |
| leden 2027 | AI B.U.B.L.I.N.A. po testu otázek, kapitoly Atlasu po claims-checku, YT instrukce | dle §9 B |
| později | Video rozhovor s Eli → texty, název modulu „Z dílny“, Eliin speciál | video + přepis |

Definition of Done každé části: review 390 + 1440 px + Kuba odklepne + zápis v CHANGELOG + `RELEASE` na novém sha.

## 12. Otevřené body

- Datum poslední objednávky do Vánoc (announcement bar).
- URL článků Patriot, Marianne, Deník; rok vysílání ČT; jednobarevná loga médií.
- Fotky kategorií (3× 4:5).
- Fotka Eli z trhu má balzám se starou etiketou - vyměnit, až bude nová.
- Logo: Raleway vs. Cormorant - při příštím tisku etiket.
- Shoptet: nativní dárek k objednávce a blok recenzí na homepage - ověřit v Classicu.
- Cena SmartEmailingu (skutečná faktura).
- SumUp prodeje se neodečítají ze skladu Shoptetu - automatizace přes API později.
- Validace Klubu, pak Klub tlačítko na produktech.
- Claude Team (vlastní účty Kuba / Eli) - migrace probíhá, po ní revize projektových instrukcí a znovu připojit GitHub a Shoptet MCP.
- Nový název modulu „Z dílny“ / „PS z dílny“ (viz §14).
- Termín video rozhovoru s Eli.

## 13. Stav

- 8. 11. 2026: Web Plan v2 vytvořen. Freeze zrušen. Šablona Classic, přívlastek „autorská kosmetika z Beskyd“.
- 9. 11. 2026: Přidán §14 (Eli jako hlas webu) + otázky na rozhovor.
- 15. 11. 2026 (v2.1-2.4): Hero fotka hotová. GPT prototyp se nepoužije. Slevy pryč, tykání potvrzeno. Skladové hospodářství se kupuje. B.U.B.L.I.N.A. = kvíz + AI (Haiku přes Worker). Atlas = /uvnitr.
- 15. 11. 2026 (v2.5): Mockup prošel 3 verzemi a byl zrušen - stavíme rovnou na e-shopu. Oblouky pryč, hero s textem vedle Eli. Homepage doplněna o Eliin výběr, hodnocení obchodu a Instagram. Repo založeno, základ vrstvy pushnutý, vydávání přes sha commitu. Plán přesunut do repa.
- Další na řadě: migrace na Claude Team → Kubův setup (Public, Classic) → loader + globální vrstva na živém webu → homepage live → deo stránky.

## 14. Backlog k review: Eli jako hlas webu (9. 11. 2026)

Stav: **neschváleno, projít až bude kapacita.**

**Návrh:**

1. Úvod: Eli s produkty + jedna její vlastní věta, podpis „Eli“, tlačítko „Vybrat si péči“.
2. Produkty s malým příběhem: název, jasné použití, jedna osobní věta o vzniku.
3. Pohled do práce: skutečné ruce, pracovní stůl, rozpracované produkty, krátké popisky od Eli. Dílna není prezentovatelná jako pozadí → jen detaily, XCD 45P s malou hloubkou ostrosti.
4. Osobní stránka o Eli: příběh, fotky, na čem jí při tvorbě záleží.

- „S láskou“ se nepíše, vyplyne z detailů: co dlouho ladila, proč vybrala určitou vůni.
- Podklad pro texty: rozhovor s Eli o každém produktu, zachovat její slovník. **Od 15. 11. odloženo, termín později.**
- Název „PS z dílny“ / „Z dílny“ se Kubovi nelíbí → přejmenovat (ne „Zápisník“, koliduje s blogem).
- Otázka k zamyšlení: kolik chce být Eli tváří webu dlouhodobě (soukromí, případný další člověk v týmu)?

### Otázky pro rozhovor s Eli

Cca 10 min na produkt, nahrávat celé. Eli začíná odpověď celou větou se zopakovanou otázkou. Nech ji mluvit, doptávej se („Jak to?“, „Dej příklad.“, „Co přesně?“).

**Obecné:**

1. Kdy a proč ses do výroby kosmetiky pustila?
2. Co tě na tom pořád baví?
3. Na čem ti při tvorbě nejvíc záleží? Co bys nikdy neudělala?
4. Jak vypadá tvůj den v dílně?
5. Co má člověk cítit, když tvůj produkt poprvé otevře?

**Ke každému produktu:**

1. Proč vznikl? Co ti chybělo nebo co jsi řešila?
2. Co jsi nejdéle ladila? Co napoprvé nefungovalo?
3. Proč zrovna tahle vůně / surovina?
4. Jak ho používáš ty sama? Kdy po něm sáhneš?
5. Komu bys ho dala jako prvnímu a proč?
6. Co lidi na něm nejčastěji překvapí?

**Navíc u dea:** Proč bez sody? Jak vznikly názvy a nálady čtyř atmosfér?
