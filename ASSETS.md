# Asset Shopping List

Every image on the site is currently a generated placeholder SVG in
`public/images/`. Swapping one in is a one-line change — see "Swapping a
placeholder image" in `README.md`. All dimensions below are final; keep the
aspect ratio when supplying a replacement so nothing shifts layout.

| Manifest key (`src/content/images.ts`) | Current placeholder | Needed | Dimensions | Aspect | Notes |
|---|---|---|---|---|---|
| `hero` | `public/images/hero.svg` | Full-bleed hero photo | 1600 × 900 | 16:9 | Waterfront / South Shore, warm light. This is the first thing visitors see — make it count. |
| `headshot` | ✅ `public/images/headshot.png` (real, from her Frankenstein Home Team page) | A higher-res version | 170 × 210 native | 4:5 | Works, but 170×210 is low-res for large display — a sharper original would hold up better if the photo is ever shown bigger than it is today. |
| `wordmark` | `public/images/wordmark.svg` | Logo / wordmark | 240 × 64 | ~3.75:1 | Horizontal lockup for the header. Can stay a styled text SVG if no formal logo exists. |
| `lifestyleAreas` | `public/images/lifestyle-areas.svg` | Local/lifestyle photo | 1200 × 800 | 3:2 | Used as a background accent behind the "Areas I Serve" section. A neighborhood street, waterfront, or similar. |
| `lifestyleHelp` | `public/images/lifestyle-help.svg` | Local/lifestyle photo | 1200 × 800 | 3:2 | Used beside the "How I Help" section. Buyers/movers/keys-in-hand — something human. |

## Also needed (not in the typed manifest — referenced directly in `index.html` / `public/`)

| File | Current placeholder | Needed | Dimensions | Notes |
|---|---|---|---|---|
| `public/favicon.svg` | Generated wave mark | Real favicon | 64 × 64 | Fine to keep as a simple SVG mark. |
| `public/og-image.svg` | Generated text card | Real OG/social-share image | 1200 × 630 | **Should become a raster file (JPG/PNG) before launch** — Facebook, iMessage, and most other link-preview crawlers don't reliably render SVG `og:image`s. Update the `og:image` / `twitter:image` URLs in `index.html` to match once replaced. |

## Per-listing photos

Four real listings are now in `src/content/listings.ts`, manually transcribed
from her own realtor.com listing pages (screenshots she provided directly —
not scraped). Three have a real primary photo in `public/images/listings/`
(`shearcrest.webp`, `scuba-crest.webp`, `touch-gold.webp`, all ~960×639,
copied from her own listing photos). `timberlee-rd` (vacant land) has no
photo yet — only browser screenshots were provided, no clean listing photo.

Three properties from the original set of seven were **not** added:
6702 Clair Shore Dr, 6828 Park Strand Dr, and 809 Seminole Sky Dr. Their
realtor.com pages don't show a listing brokerage or confirm her role
(listing vs. buyer's agent) in the screenshots provided, and the validator
requires both — see `OPEN-QUESTIONS.md` for what's needed to add them.

**Rights note:** photo rights for a *listing* photo usually belong to the
photographer or the listing brokerage, not the agent — even for a property
she listed herself. Confirm per-property before publishing. Her own headshot
and personal/lifestyle photos are unambiguous — she owns those.

## Ground rules

- Never hotlink or commit third-party or stock images, including anything
  pulled from Zillow, realtor.com, Facebook, or Instagram.
- Optimize real photos as AVIF/WebP with a fallback, responsive `srcset`
  where the layout benefits from it, lazy-load everything below the fold,
  and keep the hero eager-loaded.
- Always keep `alt` text meaningful — see the existing manifest entries for
  the tone/specificity to match.
