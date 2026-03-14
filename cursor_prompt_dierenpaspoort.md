# Cursor Prompt — Dierenpaspoort webapp

## Wat je gaat bouwen

Een **Progressive Web App (PWA)** genaamd "Dierenpaspoort" — een Pokédex voor echte dieren, gericht op kinderen van 4–10 jaar. Kids maken een foto van een dier, AI herkent het, en de app leest alles voor met een echte stem. Geen lezen vereist.

De bijgevoegde `dierenpaspoort.html` is het werkende prototype. Gebruik dit als functionele referentie en visuele basis. Bouw het opnieuw als een volwaardige React PWA.

---

## Tech stack

- **React 18** met Vite
- **TypeScript**
- **Tailwind CSS** (voor styling, zelfde groen kleurpalet als prototype)
- **PWA** via vite-plugin-pwa (installeerbaar op telefoon + werkt offline)
- **React Router** voor navigatie tussen tabs
- **Zustand** voor state management (collectie, XP, settings)
- **localStorage** voor persistentie van collectie, XP en API keys

---

## Projectstructuur

```
src/
  components/
    Header.tsx
    TabBar.tsx
    ScanPanel.tsx
    ResultCard.tsx
    CollectionGrid.tsx
    BadgeList.tsx
    SettingsPanel.tsx
  hooks/
    useSpeak.ts       # ElevenLabs + browser fallback
    useAnimalScan.ts  # API call naar Anthropic of OpenAI
  store/
    useAppStore.ts    # Zustand store
  types/
    index.ts
  App.tsx
  main.tsx
```

---

## Features (exact overnemen uit prototype)

### Scannen
- Camera input (`capture="environment"`) + file upload fallback
- Foto preview tijdens laden
- AI herkent dier via foto → geeft JSON terug
- Ondersteunt twee providers: **Anthropic Claude** (`claude-sonnet-4-20250514`) en **OpenAI GPT-4o**

### Resultaatkaart
- Groot dier-emoji bovenaan
- Naam + zeldzaamheidsbadge (Gewoon / Bijzonder / Zeldzaam / Superschaars)
- 3 stat-tiles (gewicht ⚖️, lengte 📏, leeftijd 🎂) — tik = voorlezen
- 3 vergelijkingstiles (snelheid 🏃, gewicht ⚖️, lengte 📏) met kindvriendelijke omschrijving
- 3 weetjes-tiles (groen / blauw / oranje) — tik = voorlezen
- Automatisch voorlezen zodra resultaat verschijnt (600ms delay)
- 🔊 knop om opnieuw voor te lezen

### Gamification
- XP systeem: nieuw dier = full XP, al gezien = 40% XP
- Level berekening: elke 100 XP = level omhoog
- XP bar in header
- Streak teller
- Stats: Gezien / Soorten / Streak

### Collectie
- Grid van gevonden dieren (emoji + naam + aantal keer gezien)
- Gekleurde dot per zeldzaamheid
- Tik = stem leest naam voor

### Badges (6 stuks)
- 🌱 Eerste stap — 1 dier gescand
- ⭐ Vijf soorten — 5 unieke soorten
- 🏆 Tien soorten — 10 unieke soorten
- 💎 Geluksvogel — zeldzaam/superschaars gevonden
- 🔥 Op rij! — streak ≥ 3
- 🌟 XP Meester — 500 XP totaal
- Voortgangsbalk per niet-behaalde badge
- Stem leest badge voor bij behalen

### Spraak
- Twee modes: **Browser TTS** (fallback) en **ElevenLabs**
- ElevenLabs: model `eleven_multilingual_v2`, Nederlands
- 6 stemkeuzes met naam + korte omschrijving
- Test-knop in settings
- Bij fout: fallback naar browser stem
- Taal: `nl-NL`

### Settings (⚙️ rechtsboven)
- AI provider toggle: Anthropic / OpenAI
- API key invoer (gemaskerd, toggle zichtbaar)
- Stem toggle: Browser / ElevenLabs
- ElevenLabs key invoer (alleen zichtbaar als ElevenLabs geselecteerd)
- Stemkeuze grid (6 opties)
- Test stem knop
- Reset collectie & XP (met confirm)
- Alle keys opgeslagen in localStorage

---

## AI prompt (stuur dit naar de API bij elke scan)

```
Je bent een natuur-AI voor jonge kinderen. Herken het dier en stuur ALLEEN geldige JSON terug, geen uitleg, geen backticks.

{
  "naam": "Nederlandse naam",
  "emoji": "één emoji",
  "zeldzaamheid": "Gewoon / Bijzonder / Zeldzaam / Superschaars",
  "gewicht": "bijv. 300 kg",
  "lengte": "bijv. 3 meter",
  "leeftijd": "bijv. 15 jaar",
  "vergelijking_gewicht": "vergelijking voor kind van 6, bijv: zo zwaar als 10 kinderen samen",
  "vergelijking_snelheid": "vergelijking voor kind van 6, bijv: zo snel als een brommer",
  "vergelijking_lengte": "vergelijking voor kind van 6, bijv: zo lang als 3 bedden achter elkaar",
  "weetjes": [
    "kort grappig weetje voor kinderen, max 10 woorden",
    "kort verbazingwekkend weetje, max 10 woorden",
    "kort weetje over gevaar of bescherming, max 10 woorden"
  ],
  "xp": 25,
  "gevonden": true
}

Als er geen dier zichtbaar is: {"gevonden": false}
```

---

## ElevenLabs voice IDs

```ts
const VOICES = [
  { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', desc: 'Warm, vriendelijk' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella',   desc: 'Zacht, rustig' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam',    desc: 'Helder, jong' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel',  desc: 'Enthousiast' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', desc: 'Speels' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian',   desc: 'Avontuurlijk' },
]
```

---

## Kleurpalet (exact overnemen)

```css
--green-dark:   #1a5c2a   /* header, knoppen, accenten */
--green-mid:    #2d8a45   /* hover states */
--green-light:  #eaf5ec   /* groene weetje achtergrond */
--xp-bar:       #a8ff78   /* XP balk kleur */

/* Zeldzaamheid badges */
--gewoon:       bg #eaf5ec  text #27500a
--bijzonder:    bg #e6f1fb  text #0c447c
--zeldzaam:     bg #faeeda  text #633806
--superschaars: bg #fcebeb  text #791f1f
```

---

## PWA vereisten

- `manifest.json` met naam, icoon (pootafdruk 🐾), theme_color `#1a5c2a`
- Service worker voor offline caching van de app shell
- `viewport` meta tag voor mobiel
- iOS splash screen + icon support
- `display: standalone` zodat het als echte app voelt

---

## Deploy

- Bouw met `vite build`
- Deploybaar op **Vercel** (aanbevolen), Netlify of elke static host
- Geen backend nodig — alle API calls gaan direct vanuit de browser naar Anthropic/OpenAI/ElevenLabs met de keys uit localStorage

---

## Wat je NIET hoeft te bouwen

- Geen user accounts / auth
- Geen database
- Geen backend
- Geen betalingen
- Geen social features (voor nu)

---

## Startcommando's

```bash
npm create vite@latest dierenpaspoort -- --template react-ts
cd dierenpaspoort
npm install
npm install -D tailwindcss postcss autoprefixer
npm install zustand
npm install vite-plugin-pwa
npx tailwindcss init -p
npm run dev
```
