# Atlas surovin - jak ho rozšiřovat

Návod pro každý chat, který přidává výrobek, surovinu nebo mění rozcestník „Co je uvnitř“.
Rozhodnutí a zadání jsou ve `docs/WEB_PLAN.md` §9 bod 9, historie vydání v `CHANGELOG.md` (vydání 20-23).

## Co to je

- Stránka **https://www.namydlenaeli.cz/atlas-surovin/** = Shoptet stránka **id 793** (admin > Vzhled a obsah > Stránky > Atlas surovin).
- **QR z etiket** vede na `/uvnitr`: přesměrování 301 `/uvnitr/` a `/UVNITR/` -> `/atlas-surovin/`
  (admin > Marketing > Základní SEO > Přesměrování URL). Neměnit, jsou na tom vytištěné etikety.
- Odkaz v patičce: admin > Vzhled a obsah > Menu > Informace pro vás > „Atlas surovin“.
- Je to **kniha ve 4 tabech** (Kuba, 22. 11. 2026). Cíl: každý se tu naučí o surovinách a o tom, jak a proč je používáme.
  1. **CO JE UVNITŘ** - rozcestník „Co držíš v ruce?“: dlaždice typů výrobků podle kategorií. Hotový typ vede na svou kapitolu
     na téže stránce (ne na produkt!), nehotový je šedý s nápisem „Připravuji“ a není to odkaz.
  2. **VÝROBKY** - kapitola na typ výrobku: ikona + název + krátký popis + Co umí jsou vidět, zbytek
     (Proč…, Z čeho, Vůně, odkazy do e-shopu) je pod tlačítkem „Rozbalit více info“.
  3. **SUROVINY** - rejstřík A-Z (druhá část knihy): nahoře česká abeceda, písmena s hesly odkazují dolů.
     Heslo: název, skupina, INCI, co to je, „Kde ji používám“ s odkazem na kapitolu.
  4. **JAK ČÍST INCI** - schválený text (Kuba 22. 11.), fakta z nařízení 1223/2009 čl. 19 a 2023/1545.

## Soubory

| Soubor | Co v něm je |
|---|---|
| `data/products.json` | `categories` (pořadí sekcí rozcestníku) a `types` = typy výrobků s variantami (URL produktů v e-shopu) |
| `data/ingredients.json` | `groups`, `ingredients` (hesla rejstříku), `chapters` (kapitoly Výrobků), `inciGuide` |
| `modules/atlas/build.mjs` | generátor; texty stránky (nadpisy, tlačítka) jsou v objektu `T` nahoře |
| `modules/atlas/atlas.html` | **vygenerované**, needitovat ručně; tohle se vkládá do stránky 793 |
| `css/eli.css` část **3.9** | vzhled Atlasu (`.eli-atlas__*`), ikony surovin a typů |
| `js/eli.js` funkce `atlasTabs` | taby podle `#hash`, otevře `<details>` kolem cíle |

Ikony: typy výrobků `img/icons/products/<icon>.svg` (třída `eli-ico--p-<icon>`), suroviny Lucide `img/icons/lucide/<icon>.svg`
(třída `eli-ico--<icon>`). Nová ikona = SVG s tahem 1,6 + řádek třídy v `eli.css` 3.9 (pak je potřeba vydání, viz níže).

## Pravidla obsahu (blokující)

- **Texty se nevymýšlí.** Každý text je doslova z ověřeného zdroje (schválený popis produktu v Shoptetu, CPSR, text od Eli/Kuby).
  Smí se jen rozdělit na „co to je“ (`about`) a „proč tady“ (`why`). Zdroj zapiš do `source`.
- **Claims-check** před `status: "ok"`: žádná léčebná tvrzení, žádné „antibakteriální“, „bez alergenů / bez alergických reakcí“,
  „detox“, „non-toxic“, „hypoalergenní“, „dermatologicky testováno“, „Testováno dle EU směrnic“, „podporuje růst vlasů“,
  „aknózní“ (-> „pleť se sklonem k pupínkům“). Staré sekce „Složení“ v popisech produktů mimo deo tyhle claimy mají - **nepřebírat**.
- INCI přesně podle etikety/CPSR (každá vůně má jiné alergeny, nekopírovat mezi variantami).
- Na web jde jen kapitola / průvodce se `status: "ok"`. Rozpracované nech `"draft"`.
- Tykání, hlas Eli v první osobě, jen pomlčka ` - `, žádné dlouhé.

## Postupy

### A. Nový výrobek (typ) = nová kapitola ve Výrobcích

1. `data/products.json`: typ už většinou existuje (deodorant, balzam, sampuk, peeling, maska, sul, bomba, donut). Zkontroluj varianty a URL.
   Doplň `"plural"` (název kapitoly a štítku v rejstříku, např. „Šampuky“), jinak se použije `name`.
2. `data/ingredients.json` > `ingredients`: každou surovinu výrobku, která v rejstříku ještě není, přidej (postup B).
3. `data/ingredients.json` > `chapters`: přidej objekt (vzor = kapitola `deodorant`):

```json
{
  "type": "sampuk", "status": "draft", "source": "odkud jsou texty",
  "title": "Z čeho dělám šampuky a proč",
  "short": "Jedna věta krátkého popisu.",
  "benefits": [ { "title": "…", "text": "…" } ],
  "intro": { "title": "Proč …", "text": "…" },
  "ingredients": [ { "id": "mandlovy-olej", "why": "proč je v tomhle výrobku" } ],
  "scents": { "items": [ { "product": "<id varianty>", "text": "…" } ], "notes": ["…"] }
}
```

   - `ingredients[].id` musí existovat v `ingredients`. V kapitole se zobrazí `about` + `why` za sebou (malým písmenem po pomlčce).
   - Volitelné: `short`, `benefits`, `intro`, `scents` (Vůně = jen rozpis, žádné benefity). Co chybí, generátor vynechá. Povinné: `type`, `status`, `ingredients`. `title` („Z čeho dělám … a proč“) se zatím nezobrazuje, nadpis kapitoly je `plural` typu.
4. Po claims-checku a odklepnutí Kubou `"status": "ok"`. Tím se zároveň **dlaždice v „Co je uvnitř“ sama přepne** ze „Připravuji“ na odkaz na kapitolu.
5. Build a nasazení (postup E).

### B. Nová surovina (heslo rejstříku)

```json
{ "id": "mandlovy-olej", "name": "Mandlový olej", "inci": ["Prunus Amygdalus Dulcis Oil"],
  "group": "baze", "icon": "droplet", "about": "co to je (volitelné, doslova ze zdroje)" }
```

- `id` = slug bez diakritiky, je zároveň kotva `#mandlovy-olej` (nikdy neměnit, můžou na ni vést odkazy a QR).
- `group` z `groups` (baze, pudr, pomocnici, vune; novou skupinu přidej do `groups`).
- Heslo se v rejstříku objeví, **jen když ho používá aspoň jedna kapitola se `status: "ok"`**. Abecedu a písmena dopočítá generátor
  (Č, Ř, Š, Ž a Ch jsou samostatná písmena, É, Á… patří pod E, A…).
- Surovina ve více výrobcích = jeden záznam, „Kde ji používám“ vypíše všechny kapitoly s jejich `why`.
- Éterické oleje jsou jedno heslo `etericke-oleje` s odkazem `see` na rozpis vůní v kapitole (`"see": "deodorant-vune"`).
  U dalšího výrobku s vůní rozšiř `inci` a zvaž přepnutí `see` na seznam (uprav `build.mjs`).

### C. Rozcestník „Co je uvnitř“

- Nic se v něm ručně nepíše: dlaždice = `types` z `products.json`, seskupené podle `categories` v jejich pořadí.
- Nový typ výrobku = nový záznam v `types` (`id`, `name`, `plural`, `category`, `icon`, `variants`). Bez kapitoly je šedý „Připravuji“.
- Nová kategorie = záznam v `categories`. Pořadí dlaždic = pořadí v souboru.
- Zrušený výrobek: odeber variantu / typ (pozor na odkazy ze `scents` a z QR na `#<typ>`).

### D. Texty stránky

Nadpisy, tlačítka a úvod jsou v `T` v `modules/atlas/build.mjs`. Úvodní věta a „Zatím tu jsou suroviny z…“ jsou schválené (22. 11.);
až budou kapitoly všech výrobků, smaž `productsNote`.

### E. Build a nasazení

1. `node modules/atlas/build.mjs` - vypíše počet kapitol, hesel a jestli je INCI průvodce zapnutý. Chyba „Unknown …“ = překlep v id.
2. Commit + push do `main`, zapamatuj si sha.
3. **Měnila se jen data** (`data/*.json`, `atlas.html`): stačí vložit nový `atlas.html` do stránky 793, **RELEASE se nemění**.
   **Měnil se `css/eli.css` nebo `js/eli.js`** (nová ikona, vzhled): po vložení obsahu ještě vydat nové sha v loaderu (CLAUDE.md, Vydání).
4. **Náhled bez zásahu do živé stránky** (ve vestavěném prohlížeči na `/atlas-surovin/?eli=<sha>`): stáhni `atlas.html` z jsDelivr
   `https://cdn.jsdelivr.net/gh/JB-Wolfy/namydlena-web@<sha>/modules/atlas/atlas.html`, nahraď jím `.eli-atlas` v DOM
   a pošli `document.dispatchEvent(new Event('ShoptetDOMPageContentLoaded'))`, aby se znovu pustil `atlasTabs`. Zkontroluj 390 a 1440 px.
5. **Kontrola editorem před uložením:** editor Shoptetu (TinyMCE) mění HTML. Na `/admin/stranka-detail/?id=793` udělej
   `ed = tinymce.get('description'); old = ed.getContent(); ed.setContent(html); out = ed.getContent(); ed.setContent(old)`
   a ověř v `out`, že zůstaly `<details>`, `<summary>` s textem, `<nav class="eli-atlas__abc">`, `<dl>`.
   **Do `<summary>` nikdy nadpis (h3/h4)** - editor ho smaže (stalo se ve vydání 22, na webu zbylo „Details“). Jen text a `<span>`.
6. Uložení: `tinymce.get('description').setContent(html); tinymce.triggerSave();` + tlačítko Uložit. Ověř „Záznam byl v pořádku uložen.“
7. Ověř živě: `/uvnitr` skončí na `/atlas-surovin/`, taby fungují, `#<typ>` otevře Výrobky, `#<surovina>` heslo, konzole bez `[eli]` chyb.
8. Zápis do `CHANGELOG.md` (i když se nevydávalo sha, napiš „obsah stránky 793“), krátce do `HANDOFF.md`.

## Kotvy (odkazy a QR na nových etiketách)

| Kotva | Kam vede |
|---|---|
| `/atlas-surovin/` nebo `/uvnitr` | tab Co je uvnitř |
| `#vyrobky`, `#suroviny`, `#jak-cist-inci` | tab |
| `#<typ>` (např. `#deodorant`, `#sampuk`) | kapitola výrobku (sbalená), u nehotového typu jeho dlaždice |
| `#<typ>-vune` | rozpis vůní, kapitolu rozbalí |
| `#<surovina>` (např. `#jojobovy-olej`) | heslo v rejstříku |
| `#pismeno-e`, `#pismeno-c-hacek` | písmeno rejstříku |

Id typů a surovin jsou trvalá - mohou na ně vést tištěné QR. Přejmenovat jde jen `name`, ne `id`.

## Stav (22. 11. 2026)

- Hotová kapitola: **Deodoranty** (texty z deo popisů v Shoptetu). 11 hesel v rejstříku.
- Čeká: INCI ostatních výrobků - Kuba ho dohledá v záloze (bylo v parametrech produktů). Výrobky se budou stejně předělávat.
- Ilustrace surovin (tenkolinkové SVG) později, zatím ikony Lucide podle skupin.
