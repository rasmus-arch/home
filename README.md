# rasmusgustafsson.com

Statisk, beroendefri sajt (ren HTML/CSS/JS, inget byggsteg) för
rasmusgustafsson.com. Täcker digitalisering, webbutveckling &
kundanpassade säljsystem, annonsering, tjänstebilsrådgivning och
köksförsäljning.

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
assets/
  css/style.css                All styling, en fil
  js/main.js                   Mobilmeny + kontaktformulär (fetch + spamskydd)
  img/                         Favicon (SVG) och OG-bild
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
   - Telefonnumret `079-104 30 83` är inbakat i alla sidfötter och på
     kontaktsidan – uppdatera på ett ställe i taget om det ändras
     (sök/ersätt över alla `.html`-filer).

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
