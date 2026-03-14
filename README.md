# Dierenpaspoort

Pokédex voor echte dieren — een PWA voor kinderen (4–10 jaar). Maak een foto van een dier, AI herkent het en de app leest alles voor.

## Prototype vs React-app

- **dierenpaspoort.html** — werkend HTML-prototype (alleen openen in de browser).
- **React PWA** — start met `npm run dev`; build met `npm run build`.

## Starten

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & deploy

```bash
npm run build
```

De output staat in `dist/`. Deploy naar Vercel, Netlify of een andere static host (geen backend nodig).

## Instellingen

1. Ga naar ⚙️ Instellingen.
2. Kies **Anthropic** of **OpenAI** en plak je API-sleutel.
3. Optioneel: kies **ElevenLabs** voor betere stemmen en vul je ElevenLabs API-sleutel in.

Alle sleutels worden alleen lokaal in de browser opgeslagen.

## Tech stack

- React 18, Vite, TypeScript
- Tailwind CSS
- Zustand (state)
- React Router
- vite-plugin-pwa (PWA, offline)
