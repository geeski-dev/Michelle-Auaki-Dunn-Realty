# Aukai Dunn Realty — Landing Page

A single-page marketing site for Aukai Dunn, a licensed Florida REALTOR® with
Keller Williams South Shore. Phase 1: a fast, content-driven landing page —
no CMS, no database, no auth.

## Stack

- Vite 8 + React 19 + TypeScript 7 (strict)
- Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`)
- Vitest + Testing Library
- Cloudflare Pages Function (`functions/api/contact.ts`) for the contact form, deployed on Cloudflare Pages

## Getting started

Requires Node 24 (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```bash
npm run build      # tsc -b && vite build -> dist/
npm run lint        # ESLint
npm run format       # Prettier (writes)
npm run test          # Vitest
npm run preview        # serve the production build locally
```

### Contact API locally

`functions/api/contact.ts` is a Cloudflare Pages Function — see
[Cloudflare's Pages Functions docs](https://developers.cloudflare.com/pages/functions/).
It isn't served by plain `vite dev`. To exercise it locally with the same
runtime Cloudflare deploys to, use Wrangler alongside Vite (two terminals):

```bash
# terminal 1
npm run dev                       # Vite on http://localhost:5173

# terminal 2
npx wrangler pages dev --proxy 5173
```

Wrangler proxies the Vite dev server for everything except `/api/*`, which it
serves from `functions/` using the real Workers runtime — matching
production. The validation logic itself (honeypot,
field checks) has a Vitest suite in `functions/api/contact.test.ts` that
runs with the rest of `npm run test` — no Wrangler needed for that part.

`api/contact.py` is kept for reference (see "Deploying to Cloudflare Pages"
above for why) and targets Vercel's Python runtime instead — see
[Vercel's Python runtime docs](https://vercel.com/docs/functions/runtimes/python)
if this project ever moves back there. It isn't served locally by either
`vite dev` or Wrangler; use `vercel dev`, or install `api/requirements.txt`
into a venv and hit the handler directly:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r api/requirements.txt
```

If the `/api/contact` request fails (network error or non-2xx), the form
falls back to showing the team's phone number, and a `mailto:` link once an
email address is confirmed (see `OPEN-QUESTIONS.md`).

## Deploying to Cloudflare Pages

The project deploys to Cloudflare Pages, connected directly to the GitHub repo:

1. Push this repo to GitHub.
2. In the Cloudflare Pages dashboard, connect the repo and set:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable `NODE_VERSION` = `24` (set it under **both**
     Production and Preview — Cloudflare Pages treats those as separate
     environments and won't share the value otherwise)
3. No other environment variables are required for Phase 1 (see `.env.example`).
4. Add a custom domain once one is confirmed, and update every
   `TODO-CONFIRM-DOMAIN.example` placeholder in `index.html`,
   `public/robots.txt`, and `public/sitemap.xml` first.

Cloudflare Pages Functions only run JavaScript/TypeScript — there's no Python
runtime there. `api/contact.py` (the original Vercel-targeted version) is
kept in the repo for reference but is **not** what's actually deployed;
`functions/api/contact.ts` is the real, currently-deployed backend for the
contact form. If this project ever moves back to Vercel, the Python version
is still there and up to date with the same validation/honeypot/rate-limit
logic.

## Changing content

**Every fact and string on the page lives in `src/content/site.ts`.** Nothing
user-facing is hardcoded in a component. To update her phone number, add a
service area, or edit the "Meet Aukai" copy, edit that file only.

- `src/content/site.ts` — name, license, brokerage, team, phones, nav, hero
  copy, services, areas, testimonials (empty until real reviews are added).
- `src/content/listings.ts` — typed, source-verified listing records. Empty
  array by default; see CLAUDE.md §8.1 for how to populate it (her MLS / KW
  Command export, never a scraper).
- `src/content/images.ts` — the image manifest (see below).

## Swapping a placeholder image for a real one

1. Drop the real file into `public/images/` (any format — JPG, PNG, WebP…).
2. Open `src/content/images.ts` and change that entry's `src` to the new
   filename. If the real photo's aspect ratio differs from the placeholder's,
   update `width`/`height` too so layout doesn't shift.

No component edits needed. See `ASSETS.md` for the full shopping list and
required dimensions.

## Compliance

This site is subject to Florida real-estate advertising rules and Keller
Williams brand guidelines. **`COMPLIANCE.md` is the pre-launch checklist** —
get it signed off by her Market Center's compliance reviewer before this goes
live.

## Open questions

Every fact that couldn't be verified while building this — her email, her
personal phone's public status, the production domain, and what her mom's MLS
export needs to contain — is tracked in `OPEN-QUESTIONS.md`.
