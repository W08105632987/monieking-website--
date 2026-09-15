# Running this site locally, then hosting it

This is a TanStack Start (React 19) app with server-side rendering — it needs
a Node.js process to run, not just static file hosting. It builds to a plain
Node server, so it runs the same way on your laptop, Railway, or Vercel.

## 1. Install dependencies

```sh
npm install
```

(The project previously used `bun`; `bun.lock` has been removed and a
regular `package-lock.json` will be created by npm. If you prefer bun,
`bun install` also works — the `package.json` scripts are the same either
way.)

## 2. Set up your environment variables

```sh
cp .env.example .env
```

Then open `.env` and fill in:

- **`GEMINI_API_KEY`** — powers the "MonieKing support guide" chat widget at
  the bottom of the page. Get a free key at
  https://aistudio.google.com/app/apikey, paste it in. Without this, the
  chat widget will show an error when someone tries to use it — the rest of
  the site works fine either way.
- **`VITE_GA_MEASUREMENT_ID`** — your Google Analytics 4 measurement ID
  (looks like `G-XXXXXXXXXX`), found in GA4 under Admin → Data Streams →
  your web stream. Leave it blank while developing locally so your dev
  traffic doesn't pollute your analytics; set it in your host's environment
  variables once you deploy.

`.env` is already in `.gitignore` — never commit it.

## 3. Run it locally

```sh
npm run dev
```

Opens at http://localhost:3000 by default, with hot reload.

## 4. Build and run the production version locally (recommended before deploying)

```sh
npm run build
npm run start
```

This is exactly what your host will run. If it works here, it'll work
there.

## 5. Before you go live

- **Domain**: `src/routes/__root.tsx` has a `SITE_URL` constant currently
  set to `https://www.monieking.com` as a placeholder, used for the
  canonical URL, Open Graph/Twitter image URLs, and structured data. Update
  it to your real domain once you've chosen one.
- **`public/sitemap.xml`** and **`public/robots.txt`** also reference
  `https://www.monieking.com` — update the domain there too.
- **OG image**: `public/og-image.jpg` was generated from your hero photo at
  the standard 1200×630 social-share size. Swap it for a different image any
  time — just keep the same filename or update the reference in
  `__root.tsx`.

## 6. Hosting on Railway

1. Push this project to a GitHub repo.
2. In Railway, "New Project" → "Deploy from GitHub repo".
3. Railway auto-detects Node; set the **Start Command** to `npm run start`
   if it isn't picked up automatically (it reads `package.json`'s `start`
   script, so it usually just works).
4. Add your environment variables (`GEMINI_API_KEY`, `VITE_GA_MEASUREMENT_ID`)
   under the service's "Variables" tab.
5. Railway assigns a `PORT` automatically — the app already reads
   `process.env.PORT`, so no changes needed.

## 7. Hosting on Vercel

1. Push this project to a GitHub repo, then import it in Vercel.
2. Vercel will detect it as a Node/Vite project. Build command: `npm run
   build`. Output: the app builds to `.output/`, and the `node-server`
   preset means Vercel runs it as a standard Node server process — this
   works out of the box, no extra config needed for a straightforward
   deploy.
3. Add your environment variables in the Vercel project's Settings →
   Environment Variables.
4. If you want Vercel's edge functions/CDN features specifically (rather
   than a plain Node server), that requires switching the Nitro preset in
   `vite.config.ts` from `"node-server"` to `"vercel"` — ask me if you want
   this switched before you deploy.

## What changed from the original Lovable-built project (recap)

- Removed all Lovable editor metadata, docs branding, and the dev-only
  error-reporting hook.
- Replaced the `@lovable.dev/vite-tanstack-config` build wrapper with a
  plain `vite.config.ts` using the underlying open-source packages directly.
- Rewired the support chat from Lovable's AI Gateway to call Google Gemini
  directly (same `@ai-sdk/openai-compatible` client, different endpoint).
- Added Google Analytics (conditional on `VITE_GA_MEASUREMENT_ID`), expanded
  SEO meta/Open Graph/Twitter tags, JSON-LD structured data, a generated
  `og-image.jpg`, `sitemap.xml`, and an updated `robots.txt`.

Everything above was built and run end-to-end in a Node 22 sandbox before
this zip was created — `npm install`, `npm run build`, and `npm run start`
all succeeded and served the real page correctly.
