# Open Questions

Everything below is either an unverified fact (`TODO:CONFIRM` in the code) or
a judgment call made in the absence of one. Nothing fabricated made it onto
the page — where a fact wasn't available, the site either omits it or shows
a clearly marked placeholder.

## Facts that need confirmation from Aukai

1. **Her direct phone (656-214-7701).** CLAUDE.md flagged this as unconfirmed
   for public display. It's currently used for the hero's "Text Aukai" CTA
   and as a secondary contact option in the Contact section
   (`src/content/site.ts` → `contact.directPhone`). Everywhere else (header,
   footer, primary contact line) uses the team number (813-704-8748), which
   is unambiguously public. **If she doesn't want the direct number shown,**
   the two spots above need to fall back to the team number, and the "Text
   Aukai" CTA copy should change to something like "Call/Text the team."
2. **Her email address.** Not published anywhere public yet, per CLAUDE.md.
   `contact.email` is `null`. Until it's set: the contact form's error-state
   fallback only shows a phone number, not a `mailto:` link (see
   `ContactForm.tsx`) — that link appears automatically once an email is
   added to `site.ts`.
3. **Production domain.** Every reference is a literal placeholder,
   `TODO-CONFIRM-DOMAIN.example`, in `index.html` (canonical, `og:url`,
   `og:image`, `twitter:image`), `public/robots.txt`, and
   `public/sitemap.xml`. Replace all of them together once a domain exists.
4. **Exact Keller Williams brand red.** `--color-kw-red` in `src/index.css`
   is set to `#c41230` — a reasonable guess, not sourced from KW's actual
   style guide. It isn't used anywhere on the page yet (the design leans on
   the coastal palette per CLAUDE.md §7), so this only matters if the KW
   style guide requires red somewhere specific.
5. **"Meet Aukai" bio.** `src/content/site.ts` → `meetAukai.paragraphs` is a
   full first-person draft in her voice, built from the facts in CLAUDE.md
   §1 (Hawaii origin, "listen carefully, communicate honestly, never
   pushy"). It's marked `TODO:REVIEW` — she should read it and edit it into
   her own words before launch.
6. **Testimonials.** `testimonials` in `site.ts` is empty by design — the
   component renders nothing until it's populated. Real quotes need to come
   from her Zillow reviews, along with her okay to publish the reviewer's
   name.
7. **Wordmark / logo.** No formal logo was supplied, so `public/images/wordmark.svg`
   is a styled text lockup, not a designed mark. Fine to ship as-is, or
   swap for a real logo if one exists or gets made.
8. **License number discrepancy.** CLAUDE.md §1 states her FL license as
   `SL3643355`, and that's what's used throughout the site
   (`agent.licenseNumber` in `site.ts`, the footer, and the JSON-LD). A
   screenshot of her own realtor.com profile provided during this session
   shows **`3643356`** instead — one digit different. This wasn't changed
   anywhere, since a license number is exactly the kind of fact that
   shouldn't be silently edited on a one-digit discrepancy between two
   sources. Please confirm the correct number (her physical license or FREC's
   lookup is the authoritative source) before launch.

## Placeholder assets that need a real swap before launch

See `ASSETS.md` for the full list and dimensions. Two are worth calling out
specifically:

- **`public/og-image.svg`** should become a raster file (JPG/PNG) before
  launch — most link-preview crawlers (Facebook, iMessage, etc.) don't
  reliably render SVG `og:image`s.
- **The Equal Housing Opportunity mark** in the footer (`EqualHousingIcon.tsx`)
  is a hand-drawn approximation, not HUD's official logo. Confirm with her
  broker's compliance reviewer whether the official mark is required.

## Listings: what's done, and what's still needed from her MLS / KW Command export

`src/content/listings.ts` now has four real records, manually transcribed
from screenshots of her own realtor.com listing pages (not scraped — see
CLAUDE.md §8.1's sanctioned path):

- **15126 Shearcrest Dr, Lithia** — sold $585,000, she represented the buyer;
  Compass Florida LLC held the listing.
- **16818 Scuba Crest St, Wimauma** — sold $354,482, she was the listing agent.
- **14441 Touch Gold Ln, Sun City Center** — active $289,000, she's the listing agent.
- **3106 Timberlee Rd, Wimauma** — active $229,000, vacant land, she's the listing agent.

Three properties from the original set of seven were **left out** because
their realtor.com pages don't show a listing brokerage or confirm her role
(the validator requires both, and guessing would risk exactly the misattribution
CLAUDE.md §8.3 exists to prevent — Shearcrest already proved the "assume her
own brokerage" shortcut wrong, since she was the *buyer's* agent there):

- **6702 Clair Shore Dr, Apollo Beach** — shows as "Off Market"; no agent/brokerage info on the page.
- **6828 Park Strand Dr, Apollo Beach** — same "Off Market" situation.
- **809 Seminole Sky Dr, Ruskin** — confirmed active, 4bd/3ba/2,651 sqft, but no top-of-page screenshot was provided showing the "Listed by" banner.

To add these three: either her MLS / KW Command export (the authoritative
source anyway), or a screenshot of each property's realtor.com page scrolled
to the very top, which shows the "Seller represented by / Buyer represented
by" (sold) or "Listed by / Brokered by" (active) banner just above the photos.

None of the four added records have a confirmed Stellar MLS number — realtor.com's
public pages don't display one. Each uses realtor.com's own listing ID (e.g.
`M66862-04664`) as a stand-in, flagged in a code comment. Confirm the real
MLS# against her KW Command export before this is compliance-final.

Photo rights: three of the four have a real primary photo, copied from the
photos on her own realtor.com listing pages, per her confirmation that these
are hers to use pending a final legal check before launch (see `ASSETS.md`).
`timberlee-rd` (land) has no photo yet.

## Technical notes

- **The project moved from Vercel to Cloudflare Pages.** The real, deployed
  contact-form backend is now `functions/api/contact.ts` (a Cloudflare Pages
  Function), not `api/contact.py`. Cloudflare Pages Functions only run
  JavaScript/TypeScript — Python isn't supported there — so `api/contact.py`
  is kept in the repo purely as a reference in case this ever moves back to
  Vercel, but it is not what actually runs in production. Its validation
  logic has never been runtime-tested (this dev environment had no
  `pip`/`venv`), while `functions/api/contact.ts`'s equivalent logic does
  have a Vitest suite (`functions/api/contact.test.ts`).
- **`functions/api/contact.ts`'s in-memory rate limit is weaker than a typical
  server's.** Cloudflare Workers isolates are created and destroyed per
  request across a globally distributed edge network, so the in-memory map
  it uses often won't persist between two requests from the same visitor.
  Fine as a phase-1 stopgap; a durable store (Cloudflare KV or Durable
  Objects) would be needed for a real guarantee.
- **TypeScript is pinned to `~6.0.2`**, not the newest `7.0.2` release, matching
  what the current `create-vite` React+TS template ships by default. Not a
  business decision — just noting it in case a future bump is wanted.
