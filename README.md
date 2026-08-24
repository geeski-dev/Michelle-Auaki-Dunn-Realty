# Aukai Dunn Realty — Landing Page

A single-page marketing site for Aukai Dunn, a licensed Florida REALTOR® with
Keller Williams South Shore. Phase 1: a fast, content-driven landing page —
no CMS, no database, no auth.

## Stack

- Vite 8 + React 19 + TypeScript 7 (strict)
- Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`)
- Vitest + Testing Library
- Python serverless function (`api/contact.py`) for the contact form, deployed on Vercel

## Getting started

Requires Node 24 (see `.nvmrc`) and Python 3.12+.

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

`api/contact.py` is a Vercel Function (file-based, `BaseHTTPRequestHandler`
style — see [Vercel's Python runtime docs](https://vercel.com/docs/functions/runtimes/python)).
It isn't served by `vite dev`. To exercise it locally, install the Vercel CLI
and run `vercel dev`, or install `api/requirements.txt` into a venv and hit
the handler directly. This repo's sandbox didn't have `pip`/`venv` available,
so the endpoint has been reviewed but not runtime-executed — test it with
`vercel dev` before launch.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r api/requirements.txt
```

If the `/api/contact` request fails (network error or non-2xx), the form
falls back to showing the team's phone number, and a `mailto:` link once an
email address is confirmed (see `OPEN-QUESTIONS.md`).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel. It auto-detects the Vite build (`npm run build` →
   `dist/`) and the Python function in `api/`.
3. No environment variables are required for Phase 1 (see `.env.example`).
4. Add a custom domain once one is confirmed, and update every
   `TODO-CONFIRM-DOMAIN.example` placeholder in `index.html`,
   `public/robots.txt`, and `public/sitemap.xml` first.

If Vercel's Python runtime ever causes friction, Cloudflare Pages is the
fallback — see CLAUDE.md §4. That switch hasn't been needed.

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
