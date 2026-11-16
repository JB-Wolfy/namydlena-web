# Handoff - redesign e-shopu Namydlená Eli (16. 11. 2026)

## Stav 16. 11. odpoledne
- Classic je v Návrháři jako **koncept** (zákazníci vidí Step). Loader je v HTML kódu záhlaví konceptu, `RELEASE = ''`.
  Vydání = nastavit `RELEASE` na sha a pak Kuba klikne **Zveřejnit** v Návrháři (přepne šablonu i kód naráz).
- Náhled: `/?editorPreview=&eli=<sha>` v prohlížeči přihlášeném do adminu.
- Blok úvodní stránky je v Titulní strana > Popis za starým uvítacím textem (starý text CSS schovává).
- Blog: rubrika „Zápisník“ na `/blog/` (zatím jen Testovací článek). Před vydáním testovací článek skrýt nebo nahradit.
- Úvodní stránka: pilíře hned pod hero. Fotky produktů i kategorií v rámečku 3:4 (Kuba nahrává fotky 3:4). Média = logotypy v `img/media/`, odkazy doplní Kuba (atribut href).
- Hotovo: úvodní stránka, globální vrstva, produktová stránka deodorantů (js productFrame/productModules/stickyCart). Košík, /uvnitr, kvíz, B.U.B.L.I.N.A. = nezačato.


Přečti nejdřív tohle, pak `CLAUDE.md` (pravidla kódu) a `docs/WEB_PLAN.md` (zadání, tokeny, rozhodnutí).

## Kde to je

- **Repo:** https://github.com/JB-Wolfy/namydlena-web, větev `main`.
  Zatím **soukromé** - před nasazením přepnout na Public (jsDelivr soukromé repo neservíruje).
- **Lokální podklady:** iCloud `01 Projects/NAMYDLENÁ-V5` (hero fotky, fotka Eli z trhu, portrét, SVG z Recraftu).
- **Mockup (už se nepoužívá, jen pro kontext):** https://claude.ai/artifact/EG92MGZqdmr97KP2h5P5S2
- **Web Plan v2:** hlavní kopie v repu `docs/WEB_PLAN.md` (v2.5), zrcadlo v Claude Projectu. Projekty se při migraci
  na Team přenášejí, repo je pojistka.

## Rozhodnuto dnes

- **Konec mockupu.** Designuje se rovnou na živém e-shopu přes náhled `?eli=<sha>`, zákazníci nic nevidí.
- **Hero (finální, 15. 11. večer):** originální fotka z X1D II, stěna srovnaná do krémové, víc kontrastu,
  těsnější ořez (Eli větší). Desktop podle reference Lumière: text vlevo (kicker s linkou, nadpis 64 px, věta,
  podpis, tlačítka „Vybrat si péči“ + „Můj příběh“), Eli vpravo, fotka se prolne do stránky. Mobil: fotka 1:1
  (lokty celé), text pod ní. Kulatý odznak „S láskou z Beskyd i do Beskyd“ (badge-new + text po obvodu) -
  desktop ano; mobil Kuba rozhodne živě na iPhonu přes `?eli-badge=bez` / `?eli-badge=s`, pak natrvalo
  třídou `eli-badge--desktop-only`. Fotku si Kuba možná později vyladí v Phocusu - pak jen nové ořezy.
- **Úvodní stránka, pořadí:** hero → kategorie (Dárky / Denní péče / Rituály) → „Bez čeho se neobejdu“
  (Eliin výběr = nativní blok produktů Shoptetu, produkty se vybírají v adminu) → pilíře (ikony z Recraftu)
  → Jsem Eli (fotka z trhu) → hodnocení obchodu (5 skutečných Shoptet hodnocení, 5,0/5) → Znáte nás z médií
  → Instagram pruh nad patičkou (podle Papelote, z nativního widgetu Shoptetu) → patička.
- **Zápisník:** řeší šablona Classic, doladí se na dummy článku po přepnutí šablony.
- **Fotky produktů:** jen ze Shoptetu, v 4:5 tam; kód je jen styluje, nikdy se kvůli fotce nemění.
- **Recenze na produktu:** blok hodnocení se zobrazí až s prvním hodnocením.
- **Klub:** na webu se zatím nepropaguje.
- **Vydávání přes sha commitu** (cloudová session nesmí pushnout git tagy).
- **Admin:** model smí kód záhlaví/zápatí, texty a bloky úvodní stránky, stránky, popisy produktů.
  Ceny, doprava, platby, doplňky, tarify, objednávky, fotky produktů = vždy Kuba.

## Co je hotové v repu

- `snippets/shoptet-head.html` - loader (jediný kód v Shoptetu), `RELEASE = ''` = vypnuto pro zákazníky.
- `css/eli.css` - fonty (self-hosted), tokeny, komponenty úvodní stránky, Instagram pruh, skrytí starých bannerů.
- `js/eli.js` - Instagram pruh, přesun nativního bloku produktů do „Eliin výběr“, dělení názvů „Jméno - typ“.
- `modules/home/home.html` - celý blok úvodní stránky (vkládá se jako zdrojový HTML, je schovaný do vydání).
- `img/` (hero desktop/mobil, Eli z trhu, ikony), `fonts/`.
- Ověřeno jen lokálně na 390 / 1024 / 1440 / 1920 px, **na živém Classicu ne**.

## Další kroky (v tomto pořadí)

**Kuba (jednorázově):**
1. GitHub: repo → Settings → General → Change visibility → Public.
2. Shoptet: screenshoty menu, bannerů a textů úvodní stránky (záloha), pak přepnout šablonu na **Classic**.
3. Přihlásit se do adminu v prohlížeči, kde bude pracovat Claude (desktop app: panel prohlížeče Cmd+Shift+B).
4. Vypnout slevy a slevové bannery, „-14 %“ (Web Plan §4).

**Claude (kód):**
0. Poměr obrázků produktů: Nastavení → Produkty → Zobrazení → Poměr obrázků. Nabídka: výchozí šablony,
   4:3, 1:1 (teď), 3:4, 2:3 - **4:5 tam není**. Návrh (Kuba potvrdí): **3:4** a nové fotky produktů fotit
   rovnou 3:4 (nativní portrét X1D II, bez ořezu). Deo fotky 4:5 a staré 1:1 se do 3:4 doplní pruhy -
   ověřit na první zmenšenině, jestli Shoptet doplňuje (bílou?) nebo ořezává, a podle toho karty v CSS:
   rámeček 3:4, `object-fit: cover` (ořízne tenké pruhy u 4:5), u 1:1 krémové pozadí za fotkou.
   Karty: rámeček 4:5, `object-fit: contain` na krémové, aby šly 1:1 i 4:5 vedle sebe bez ořezu.
1. Vložit loader do Admin → Vzhled a obsah → Editor → HTML kód → Záhlaví (RELEASE prázdné).
2. Globální vrstva na živém Classicu (`eli.css` část 5): hlavička, menu, tlačítka, typografie,
   karty produktů (4:5 přes `aspect-ratio` + `object-fit`), patička, mobil, informační lišta.
3. Vložit `modules/home/home.html` do úvodní stránky; ověřit selektor nativního bloku produktů (`homepagePicks`
   v `eli.js`), že existuje H1, a že funguje Instagram pruh.
4. Review 390 + 1440 px s Kubou → vydat (`RELEASE = '<sha>'`).
5. Deo stránka (Letní podvečer pilot): moduly popisu podle Web Plan §6, přepínač 4 atmosfér
   (barvy proužků: Červnová louka #CD7A7C, Letní podvečer #DDB7B0, Před bouřkou #A8BB9F, Bezvětří #CBD18F),
   textové odznaky, lepicí lišta „Do košíku“, kotva `#co-je-uvnitr`. Pak zbylá 3 dea.
6. Košík: odpočet do dopravy zdarma (600 Kč), upsell, hláška k dárku. Otestovat celou pokladnu.
7. `/uvnitr` (rozcestník + kapitoly), kvíz B.U.B.L.I.N.A., Cloudflare Worker (Haiku).

## Otevřené / chybí od Kuby

- Datum poslední objednávky do Vánoc (informační lišta).
- Odkazy na články Patriot, Marianne, Deník; rok vysílání ČT; jednobarevná loga médií.
- Ověřit URL `/poukazy/` a `/zapisnik/dobre-rano/`.
- Fotky kategorií (3×, 4:5) - zatím blok kategorií bez fotek.
- Balzám na fotce Eli z trhu má starou etiketu (vyměnit, až bude nová fotka).
- Compliance: balzám měsíček má rizikové claimy (Web Plan §10) - přepsat přes Shoptet MCP.
- Shoptet MCP konektor potřebuje znovu přihlásit.

## Jak navázat v novém chatu

Vlož tohle:

> Pokračujeme v redesignu e-shopu Namydlená Eli. Připoj repo JB-Wolfy/namydlena-web, přečti `HANDOFF.md`
> a `CLAUDE.md`, pak `docs/WEB_PLAN.md`. Začni krokem „Claude (kód) 1“.
