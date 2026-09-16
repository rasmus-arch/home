# rasmusgustafsson.com

Statisk, beroendefri sajt (ren HTML/CSS/JS, inget byggsteg) för
rasmusgustafsson.com. Täcker digitalisering, webbutveckling &
kundanpassade säljsystem, annonsering, tjänstebilsrådgivning,
köksförsäljning och drönarfoto.

## Struktur

```
index.html                     Startsida med tjänsteöversikt
om.html                        Om mig
kontakt.html                   Kontaktformulär + telefonnummer
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
  js/main.js                   Mobilmeny + kontaktformulär (fetch + spamskydd)
  img/                         Favicon (SVG), OG-bild och SVG-illustrationer
robots.txt
sitemap.xml
CNAME                          Custom domain för GitHub Pages (ta bort om du inte kör Pages)
```

Ingen byggprocess krävs – filerna kan laddas upp direkt till valfritt
webbhotell (FTP, GitHub Pages, Netlify, Cloudflare Pages m.fl.).

## Innan sajten går skarpt – checklista

1. **Kontaktformulär – Web3Forms-nyckel.**
   Formuläret på `kontakt.html` skickas via [Web3Forms](https://web3forms.com)
   (gratis, ingen egen server behövs, inbyggt spamskydd). Just nu pekar det
   mot en platshållarnyckel. Gör så här:
   1. Gå till https://web3forms.com och skapa en gratis "Access Key" med
      din e-postadress (den mottagande adressen visas **aldrig** i
      sidkällan).
   2. Öppna `kontakt.html` och byt ut
      `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` mot din riktiga nyckel.
   3. Klart – formuläret har redan ett dolt honeypot-fält samt ett
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
   - Telefonnumret `079-104 30 83` är inbakat i alla sidfötter och på
     kontaktsidan – uppdatera på ett ställe i taget om det ändras
     (sök/ersätt över alla `.html`-filer).

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
