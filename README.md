# rasmusgustafsson.com

Statisk, beroendefri sajt (ren HTML/CSS/JS, inget byggsteg) för
rasmusgustafsson.com. Täcker digitalisering, webbutveckling &
kundanpassade säljsystem, annonsering, tjänstebilsrådgivning,
köksförsäljning och drönarfoto.

**Designsystem:** varm, sandfärgad "editorial" light mode. Display-font
[Fraunces](https://fonts.google.com/specimen/Fraunces) (serif, rubriker)
+ [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
(brödtext), laddade via Google Fonts i varje sidas `<head>`. Färgtokens
och komponenter (tjänstelista, case-kort, capabilities-taggar,
mörk footer) definieras i `assets/css/style.css`.

## Struktur

```
index.html                     Startsida: hero, tjänstelista, capabilities, case-teaser
case.html                      Case studies (Hemsidor / Annonsering / Konsultuppdrag / Affärssystem)
om.html                        Om mig
kontakt.html                   Kontaktformulär
tack.html                      Tacksida efter skickat formulär (noindex)
404.html                       Egen 404-sida
tjanster/
  digitalisering.html
  webb-och-kodning.html
  annonsering.html
  tjanstebil.html
  kok.html
  dronarfoto.html
kunder/
  proarb.html                  Kunddashboard (Looker Studio-inbäddning), ej publikt listad
assets/
  css/style.css                All styling, en fil
  js/main.js                   Mobilmeny, kontaktformulär, magnetiska knappar, case-filter
  img/                         Favicon (SVG), OG-bild, drönarfoto och foto-platshållare
robots.txt
sitemap.xml
CNAME                          Custom domain för GitHub Pages (ta bort om du inte kör Pages)
```

Ingen byggprocess krävs – filerna kan laddas upp direkt till valfritt
webbhotell (FTP, GitHub Pages, Netlify, Cloudflare Pages m.fl.).

## Google Analytics (GA4)

GA4-mätid `G-65WKL1PCGL` är inklistrat i `<head>` på **alla** sidor
(samma `gtag.js`-snippet överallt). Vill du byta mätid: sök och ersätt
`G-65WKL1PCGL` över samtliga `.html`-filer.

## Case studies (`case.html`)

Case-sidan har fyra platshållarkort (ett per kategori: Hemsidor,
Annonsering, Konsultuppdrag, Skräddarsydda affärssystem) med rubriken
"Case tillkommer" och fälten "Fylls i inom kort". De är medvetet
skrivna så att de läser som "kommer snart" och inte som trasiga
platshållare, men byt ut dem mot riktiga uppdrag så snart du kan —
en sajt med fyra tomma case i flera veckor ger fel intryck.

**Så fyller du i ett case**, i `case.html`:
1. Hitta rätt `<article class="case-card" ...>`-block (sök på
   kategorinamnet, t.ex. `id="hemsidor"`).
2. Byt `<h3>Case tillkommer</h3>` mot en riktig rubrik, t.ex.
   "Proarb — ny hemsida och kunddashboard".
3. Byt de tre `<li>`-raderna (Utmaning / Lösning / Resultat) mot
   riktig text. Skriv bara sådant som faktiskt hänt — inga
   uppskattade eller påhittade resultatsiffror.
4. Byt bildplatshållaren (`<div class="case-media-empty">...`) mot en
   `<img>` av en skärmdump/foto från projektet, och lägg till klassen
   `has-image` på den omgivande `<div class="case-media">`.
5. Upprepa för övriga kort. Fler case än fyra? Kopiera ett helt
   `<article class="case-card">`-block, ge det ett unikt `id`/`data-category`
   och lägg till en matchande `data-filter`-knapp om det är en ny kategori.

## Innan sajten går skarpt – checklista

1. **Kontaktformulär – Web3Forms.** ✅ Klart. Formuläret på `kontakt.html`
   skickas via [Web3Forms](https://web3forms.com) med en riktig access
   key redan inklistrad. Det har också ett dolt honeypot-fält och ett
   tidsbaserat skydd (blockerar inskick som sker orimligt snabbt) i
   `assets/js/main.js`, utöver Web3Forms egna spamfilter.

2. **Domän / hosting.**
   - **GitHub Pages:** aktivera Pages på detta repo (Settings → Pages →
     Deploy from branch), peka DNS för rasmusgustafsson.com mot GitHub
     Pages enligt deras guide. `CNAME`-filen i repot är redan förifylld.
   - **Vanligt webbhotell:** ladda upp alla filer i repots rot till
     dokumentroten via FTP/SFTP eller kontrollpanelens filhanterare. Om
     du inte använder GitHub Pages kan `CNAME`-filen tas bort (den gör
     ingen skada om den ligger kvar).

3. **Innehåll att se över.**
   - `om.html` har en allmän text om dig – fyll gärna på med bakgrund,
     tidigare uppdrag eller specifika samarbeten (t.ex. vilket
     kökssortiment du representerar) om du vill vara mer specifik.
   - `assets/img/rasmus-foto.jpg` är just nu en platshållarbild (ett
     genererat "foto kommer"-kort) för fotot på Om mig-sidan. Bilden
     visas liggande, beskuren till formatet 3:2 (`object-fit: cover`,
     så exakta pixelmått spelar mindre roll så länge bilden är
     liggande/bred). Ersätt filen med ditt riktiga foto – **samma
     filnamn** – så behövs ingen kodändring. Du kan antingen committa
     den nya filen till repot, eller ladda upp den direkt till samma
     sökväg på webbhotellet om du inte kör om
     hela sajten via git.
   - Telefonnummer visas inte längre offentligt någonstans på sajten –
     all kontakt går via formuläret på `kontakt.html`. Vill du visa ett
     nummer igen senare, sök efter `tel:` i `.html`-filerna för att se
     var det tidigare låg.

## Kunddashboards (`kunder/`)

Varje kund kan få en egen sida som visar deras Google Ads, Search Console
och Analytics-data via en inbäddad [Looker Studio](https://lookerstudio.google.com)-rapport.
Sidorna är **inte** länkade från huvudmenyn eller sitemap.xml, har
`<meta name="robots" content="noindex,nofollow">` och blockeras i
`robots.txt` – men det som faktiskt skyddar kunddatan är Looker Studios
egen delningsbehörighet, inte URL:ens hemlighet. Bygg alltid rapporten
så här:

1. Gå till https://lookerstudio.google.com, logga in med det Google-konto
   som har åtkomst till kundens GA4-egendom, Search Console-egendom och
   Google Ads-konto.
2. **Create → Report**, lägg till datakällor via respektive
   Google-koppling (Google Analytics, Search Console, Google Ads) och
   bygg de diagram/sidor ni vill visa.
3. **File → Share → Manage access** – lägg till kundens e-postadress
   som Viewer. Använd **inte** "Anyone with the link" om datan är
   känslig (annonsbudget, trafiksiffror) – det är den här inställningen
   som avgör vem som faktiskt kan se rapporten.
4. **File → Embed report → Enable embedding** – kopiera den genererade
   embed-URL:en.
5. Öppna `kunder/<kundnamn>.html` (kopiera `kunder/proarb.html` som mall
   för nya kunder) och byt ut `REPLACE_WITH_LOOKER_STUDIO_EMBED_URL`
   mot embed-URL:en i `<iframe src="...">`.
6. Skicka den unika sid-länken (t.ex.
   `https://rasmusgustafsson.com/kunder/proarb.html`) direkt till
   kunden – dela den inte offentligt.

**Ny kund:** duplicera `kunder/proarb.html`, uppdatera titel, rubriker
och embed-URL. Lägg **inte** till sidan i `sitemap.xml` eller
huvudmenyn.

## SEO

- Varje sida har unik `<title>`, `<meta name="description">` och
  `<link rel="canonical">`.
- Open Graph- och Twitter-metadata pekar mot `assets/img/og-image.png`
  (1200×630) för fina länkförhandsvisningar i sociala medier.
- JSON-LD strukturerad data: `ProfessionalService` på startsidan,
  `Service` på varje tjänstesida.
- `sitemap.xml` listar alla riktiga sidor och `robots.txt` pekar mot
  den. Uppdatera `<lastmod>` i sitemap.xml om du redigerar en sida
  längre fram.
- Semantisk HTML (rubrikhierarki, `<nav>`, `<main>`, brödsmulor) och en
  "skip to content"-länk för tillgänglighet.

## Lokal förhandsgranskning

Inget byggsteg behövs. Öppna `index.html` direkt i webbläsaren, eller
starta en enkel lokal server för att undvika CORS-kvirkar med
formuläret:

```bash
python3 -m http.server 8080
```

och besök `http://localhost:8080`.
