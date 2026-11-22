# Changelog

## Vydání 23 - 22. 11. 2026 - RELEASE `b06f2e57bb8ea4118d5b438511dede705de71e1a`
- Atlas, Výrobky: výrobek je vidět (ikona, název, krátký popis, Co umí), zbytek pod tlačítkem „Rozbalit více info“ / „Sbalit“.
  Oprava vydání 22: editor Shoptetu z `<summary>` vyhodil nadpis a na webu zbylo jen „Details“. V `<summary>` jsou teď jen textové `<span>`.

## Vydání 22 - 22. 11. 2026 - RELEASE `b1086bab582f8e3332489061c8553e16755c4bab`
- Atlas: kapitoly ve Výrobcích se rozbalují (`<details>`, otevře je i odkaz/QR na kapitolu nebo místo v ní), v Surovinách abeceda nahoře
  (česká, písmena s hesly odkazují na `#pismeno-…`), tab Jak číst INCI zapnutý (text schválil Kuba). Taby se na mobilu zalomí do dvou řádků.

## Vydání 21 - 22. 11. 2026 - RELEASE `ad80e934d23f12c11c2b6ea1e5b3afa305d4126a`
- Atlas surovin jako kniha ve 4 tabech (JS `atlasTabs`, řízené `#hash`): Co je uvnitř (dlaždice typů, hotové vedou na kapitolu, ostatní „Připravuji“),
  Výrobky (kapitola na typ: Proč bez sody, Z čeho, Vůně, odkazy do e-shopu), Suroviny (rejstřík A-Z s „Kde ji používám“), Jak číst INCI (připraveno, čeká na schválení textu).
- Texty doslova z deo popisů, rozdělené na „co to je“ (about) a „proč tady“ (why). `#deodorant`, `#zinek`, `#vyrobky` vedou přímo na místo.
- Patička: „Atlas surovin“ v menu Informace pro vás.

## Vydání 20 - 22. 11. 2026 - RELEASE `175742dd8b8c5d34049ca2fcee0ce029618e357b`
- Atlas surovin: nová stránka `/atlas-surovin/` (Shoptet stránka id 793), přesměrování 301 `/uvnitr/` a `/UVNITR/` -> `/atlas-surovin/` (QR z etiket).
  Rozcestník „Co držíš v ruce?“ = 8 typů výrobků (`<details>`), uvnitř varianty jako pilulky (deo na `#co-je-uvnitr`); `/atlas-surovin/#balzam` otevře typ (JS `atlasHash`).
  Kapitoly: 10 surovin z deodorantů + kapitola Vůně (texty doslova z deo popisů). Data `data/products.json` + `data/ingredients.json`, HTML generuje `node modules/atlas/build.mjs`.
- Nové ikony Lucide: hexagon, wheat, gem, citrus, chevron-down (tah 1,6 jako ostatní).

## Vydání 19 - 17. 11. 2026 - RELEASE `6f0c24423ceadfd633c91213831f05d2125cd49a`
- Karty produktů: stav skladu 14 px / 500, počet kusů 13 px / 400 tlumeně (detail zůstává 16 / 14).

## Vydání 18 - 17. 11. 2026 - RELEASE `7191c866b3900dc72ddc62be18e0ac8cf3e9afe2`
- Dostupnost: stav 16 px, počet kusů ze Skladového hospodářství 14 px tlumeně vedle. Backlog: mobilní menu podle flow-nutrition.cz (Kuba má screenshoty).

## Vydání 17 - 17. 11. 2026 - RELEASE `aa14a3e9233eaf340e0e7c14c1af629aa81a1920`
- Mobilní menu bez obrázků/ikon kategorií (kompaktní); desktop a pilulky podkategorií beze změny.

## Vydání 16 - 17. 11. 2026 - RELEASE `eed4e8b562a226ae2ac123a9fbd9a4873d2d4b97`
- Vlastní liniové ikony typů produktů (`img/icons/products/`: deodorant, peeling, šampuk, mýdlo, balzám, sůl, bomba, maska) místo fotek v pilulkách podkategorií i v rozbalovacím menu (podle URL; fotky v adminu zůstávají jako záloha). Pilulky už neořezávají text.

## Vydání 15 - 17. 11. 2026 - RELEASE `03fbe9ddb96ec2f834971d0f98c99d082781b039`
- Peeling: „vydrží 2-3 měsíce“ (stejný styl jako ostatní). HANDOFF a CLAUDE aktualizované.

## Vydání 14 - 17. 11. 2026 - RELEASE `36b52f73c4dabc499538559a0e29344ca58aa3fa`
- Produkt: výdrž u ceny i pro peeling, balzám, šampuk a masku (podle názvu, ne u dárkových sad). Rejstřík jen u popisů s kapitolami H2.

## Vydání 13 - 17. 11. 2026 - RELEASE `5db69945bd9de853e61f95c0e4fb91e84e328564`
- Produkt: rejstřík nad popisem (kapitoly popisu, Hodnocení, Diskuze; aktivní položka podtržená při scrollu, na mobilu posuvný). Diskuze zase viditelná.

## Vydání 12 - 17. 11. 2026 - RELEASE `a22de4687d714ec2f02a2f705c5536ca622a616f`
- Produkt: hodnocení vždy viditelné pod popisem (čtení i přidání, odkaz u hvězdiček na něj skočí); rámeček jen „Doprava zdarma při nákupu nad 600 Kč“.

## Vydání 11 - 17. 11. 2026 - RELEASE `03598e3b29f03c2afd4f979d21d772b9e0fe1e47`
- Produkt: cena těsně nad košíkem (u deo „vydrží zhruba 2 měsíce“ z FAQ), rámeček Doprava a dárek zdarma nad 600 Kč s ikonou truck-electric, pod ním dostupnost a tři pilíře z úvodní stránky.
- Nový token `--eli-gold` (#A87C2A) jen pro hvězdičky hodnocení.

## Vydání 10 - 17. 11. 2026 - RELEASE `a0dc9bc1fc6804518629896b605a834e3083f0af`
- Produkt: pořadí nákupního sloupce podle e-commerce praxe (název, hvězdy, cena, krátký popis, Detailní informace, další vůně, dostupnost, košík) + pod tlačítkem „Doprava a dárek zdarma nad 600 Kč“ (ikona Lucide gift).

## Vydání 9 - 17. 11. 2026 - RELEASE `4bb285c5a73b1a606a2c82275106ac911ac2a1d6`
- Produkt: Detailní informace pod krátkým popisem; náhledy fotek 3:4 z plné fotky (bez bílých pruhů ze čtvercového náhledu Shoptetu).

## Vydání 8 - 17. 11. 2026 - RELEASE `53adf3cef3a6494aa836b998224f66fbf5df019b`
- Produkt: krátký popis hned pod názvem (všechny produkty), přepínač vůní deodorantů těsně nad Přidat do košíku.

## Vydání 7 - 17. 11. 2026 - RELEASE `383719ea64590ef1af3c05c63dddd9d14fa87653`
- Produkt (desktop): fotka i název o 24 px níž pod drobečkovou navigací. Pryč měření z vydání 6 (příčina byly fotky 4:5 doplněné Shoptetem bílými pruhy; fotky produktů nahrávat 3:4).

## Vydání 6 - 17. 11. 2026 - RELEASE `8eb0036a9ef1a4d9d2097c2a22fe91dfe6a79ee9`
- Produkt: název se zarovnává s horní hranou fotky měřením (Safari měl pravý sloupec o ~30 px výš než Chrome).

## Vydání 5 - 17. 11. 2026 - RELEASE `ee8d0a98d0e8fd9137820874c8f69db9b5d5afce`
- Deodoranty: pryč štítky Bez sody / Papírová tuba / Ručně v malých várkách, jsou jako odrážky v krátkém popisu (Shoptet, 4 produkty).
- Produkt: nadpis opticky zarovnaný s horní hranou fotky na desktopu.
- Úvodní stránka: výběr produktů = skupina Produkty > Titulní strana (deo Před bouřkou, peeling mandle, balzám měsíček, šampuk citron).

## Vydání 4 - 16. 11. 2026 - RELEASE `17e1d95b36c93d7709216f80edeaf418f71f718d`
- Kde začít: tři čtvercové dlaždice s názvem na fotce (celá dlaždice je odkaz), bez podkategorií; mobil posuvný pás.

## Vydání 3 - 16. 11. 2026 - RELEASE `385d0e610d2eed822b6e45447f850909c8dc3e9e`
- Mobil: pryč plovoucí linka pod horní lištou (spodní okraj pevné hlavičky nulové výšky), na všech stránkách.

## Vydání 2 - 16. 11. 2026 - RELEASE `ff74589cfe03b4636f703cb9b1bb6b71823fb64c`
Opravy po vydání 1 (podle Kuby z iPhonu). Od teď se vydává v admin > Vzhled a obsah > Editor > HTML kód > Záhlaví.
- Lepicí lišta Do košíku je skrytá úplně (na iOS z ní vykukovala linka).
- Kategorie: řazení bez šedé plochy, podkategorie jako čitelné pilulky (celý název).
- Košík na mobilu: název kroku místo loga, nepřekrývají se.

## Vydání 1 - 16. 11. 2026 - RELEASE `6a7c0a278ae623eb955919eed25cc1b4799ed983`
Přepnutí ze Stepu na Classic s celou vrstvou (Kuba klikl na Zveřejnit v Návrháři).
- 16. 11.: produktová stránka deodorantů (všechna 4 dea): moduly popisu z H2/H3, přepínač atmosfér, odznaky, Doplň si, lepicí lišta Do košíku, hvězdy až s hodnocením.
- 16. 11.: loader v záhlaví konceptu Classic (Návrhář, RELEASE prázdné), blok úvodní stránky v Titulní strana > Popis (skrytý).
- 16. 11.: globální vrstva Classic (tokeny šablony, hlavička, jedno menu, ikony Lucide, karty 1:1, Skladem, patička, mobil).
- 16. 11.: úvodní stránka po review: fotky kategorií (dočasně produktové), nové ikony pilířů, Zápisník z rubriky /nase-novinky/.
- Hero z originální fotky, varianta A (upravené pozadí, bez boxu) vybrána 15. 11.
- Základ: loader s náhledem přes `?eli=`, tokeny, self-hosted fonty (PT Serif, Poppins, Raleway).
- Úvodní stránka: hero s textem vedle Eli, kategorie, Eliin výběr (nativní blok produktů), pilíře, Jsem Eli,
  hodnocení obchodu, média, Instagram pruh nad patičkou.
