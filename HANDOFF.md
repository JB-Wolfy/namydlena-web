# Handoff - redesign e-shopu Namydlená Eli (17. 11. 2026 večer)

Přečti nejdřív tohle, pak `CLAUDE.md` (pravidla kódu) a `docs/WEB_PLAN.md` (zadání, tokeny). Historie vydání: `CHANGELOG.md`.

## Stav

- **Live od 16. 11.** na šabloně Classic + vrstva `eli` (CSS/JS z jsDelivr podle `RELEASE` v loaderu). Aktuální sha = první záznam v `CHANGELOG.md`.
- Hotovo: úvodní stránka, globální vrstva (hlavička, jedno menu, Lucide ikony, karty 3:4, patička, mobil), „Kde začít“ (čtvercové dlaždice),
  výpis kategorie, košík na mobilu, **produktová stránka** (viz níže).
- Repo je public (jsDelivr). Vydává se přes sha commitu, ne tagy.

## Jak vydávat (ověřený postup)

1. Push do `main`, náhled `https://www.namydlenaeli.cz/<stránka>/?eli=<sha>` (1440 px + mobil), `?eli=off` vypne.
2. Zahřát sha: `cdn.jsdelivr.net/gh/JB-Wolfy/namydlena-web@<sha>/css/eli.css` a `js/eli.js` musí vrátit 200.
3. Admin > `/admin/html-kody/` (HTML kódy, Záhlaví = CodeMirror): přepsat `RELEASE='<sha>'`, **Uložit**.
   V prohlížeči šlo přes JS: `CodeMirror.setValue(...)` + klik na Uložit. Ověřit fetchem `/` že HTML má nové sha.
4. Zápis do `CHANGELOG.md` (číslo vydání, datum, sha). Návrat = předchozí sha.
Návrhář se nepoužívá (po zveřejnění vytváří nový koncept).

## Produktová stránka - jak je poskládaná (rozhodnuto s Kubou 17. 11.)

Pravý sloupec (`productFrame` + `buyOrder` v `eli.js`), pořadí podle e-commerce praxe a Kubovy reference:
1. Název (velké, PT Serif) + typ, Novinka, hvězdičky (zlaté `--eli-gold`) + „Podrobnosti hodnocení“
2. **Krátký popis** (Shoptet „Krátký popis“: 1-2 věty + odrážky) + odkaz „Detailní informace“
3. Deodoranty: přepínač „Vyber si atmosféru“ = 4 odkazy na sesterské produkty (deo jsou samostatné produkty, ne varianty)
4. **Cena těsně nad košíkem**, za cenou za jednotku „· vydrží …“ (`T.lasts`, podle názvu produktu, ne u sad)
5. Množství + Přidat do košíku
6. Rámeček s ikonou truck-electric „Doprava zdarma při nákupu nad 600 Kč“ (`T.buyNote` - změní-li se limit v Shoptetu, přepsat i tady)
7. Skladem
8. Tři pilíře z úvodní stránky (Vlastní receptury / Ručně v Beskydech / Nejsem firma, jsem Eli)

Pod fotkami: **rejstřík** (`sectionIndex`) = kapitoly z H2 v popisu + Hodnocení + Diskuze, jen když popis má ≥ 2 H2.
Popis je vždy otevřený, Hodnocení a Diskuze vždy viditelné pod ním (lidé čtou starší hodnocení v diskuzi), „Podobné“ = sekce „Doplň si“.
Krátké názvy v rejstříku: `T.indexShort`.

Zrušeno: štítky „Bez sody / Papírová tuba / Ručně v malých várkách“ (jsou jako odrážky v krátkém popisu 4 deo),
text o předobjednávce (Kuba smazal, neplatí), řádek o dárku.

## Poučení (ať se neopakuje)

- **Fotky produktů nahrávat 3:4.** Fotka 4:5 se v Shoptetu doplní na 3:4 bílými pruhy uvnitř souboru (kód je neořízne) a název
  pak nesedí s horní hranou fotky. Bezvětří už je 3:4, ostatní deo zatím 4:5 (Kuba je vymění).
  Náhledy pod fotkou bere JS z plné fotky (Shoptetí 100×100 čtverce mají bílé pruhy).
- Výpočty pozic měř na **viditelné fotce**, ne na boxu. Kuba má Safari i Chrome na širokém monitoru (~2050 px).
- Produktové texty se nevymýšlí: výdrž je od Kuby (deo zhruba 2 měsíce z FAQ, peeling 2-3 m., balzám až rok, šampuk 2-3 m. podle délky vlasů, maska 2-3 m.).
- Krátký popis produktu jde upravit v `/admin/produkty-detail/?id=<id>` přes skrytý textarea `shortDescription` + Uložit
  (deo id: Červnová louka 241, Letní podvečer 244, Před bouřkou 238, Bezvětří 235).
- „Bez čeho se neobejdu“ na úvodní stránce = nativní skupina **Produkty > Titulní strana**, web ukáže první 4 v pořadí z adminu
  (teď DEO-PB, TP-01, B-02, TS-02). Přidat produkt do skupiny musí Kuba (modal v adminu z prohlížeče nešel).

## Další na řadě

1. Ostatní produkty: přepsat popisy do kostry s H2 (vzor deodoranty) - pak dostanou rejstřík. Navrženo začít šampukem citron.
2. Košík: odpočet do dopravy zdarma (600 Kč), upsell, hláška k dárku.
3. `/uvnitr` (Atlas), kvíz B.U.B.L.I.N.A., Worker.

## Otevřené od Kuby

- Fotky Červnová louka, Letní podvečer, Před bouřkou ve 3:4.
- Testovací článek v Zápisníku skrýt; datum poslední objednávky do Vánoc (lišta).

## Jak navázat v novém chatu

> Pokračujeme v redesignu e-shopu Namydlená Eli. Připoj repo JB-Wolfy/namydlena-web, přečti `HANDOFF.md`, `CLAUDE.md`
> a `docs/WEB_PLAN.md`. Pak <úkol>.
