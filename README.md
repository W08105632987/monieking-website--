# MonieKing Landing & Support App

The MonieKing marketing site: a landing page for the digital Adashi/Ajo/Esusu
contribution savings platform, built with TanStack Start (React 19) and an
AI-powered support chat widget.

## Requirements

- Node.js 20+ and npm (or pnpm/yarn)
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) for the support chat

## Development

```sh
npm install
cp .env.example .env   # then add your GEMINI_API_KEY
npm run dev
```

## Build & run in production

```sh
npm run build
npm run start
```

See `DEPLOYMENT.md` for hosting notes (Railway, Vercel, or any Node host).
