# Compliance Checklist

For review by Aukai's Keller Williams South Shore Market Center compliance
reviewer before this site goes live. Sourced from CLAUDE.md §2 and §8.3.
Nothing here is legal advice — confirm the specifics with the broker and with
Stellar MLS directly.

## Florida / FREC advertising rules

- [ ] **Brokerage name adjacent to every point of contact.** "Keller Williams
      South Shore" appears beside every phone number, email, and contact form
      on the page. Currently implemented in: `Contact.tsx` (above the form),
      `Footer.tsx` (beside every listed contact method).
- [ ] **Team name never larger than the brokerage name (FREC 61J2-10.026).**
      Enforced in `CredibilityStrip.tsx` and `Footer.tsx` — both explicitly
      comment where the sizing is set. Re-verify after any redesign touches
      those files.
- [ ] **Licensed name appears correctly.** Full legal name "Michelle Lee
      Kelahuna Aukai-Dunn" and license number "SL3643355" appear in the
      footer (`Footer.tsx`).
- [ ] **Nickname formatting.** "Michelle 'Aukai' Dunn" — quotes around the
      nickname — used wherever the legal and brand names appear together.
- [ ] **No false, deceptive, or unverifiable claims.** No "top producer,"
      invented years of experience, invented statistics, or fabricated
      testimonials appear anywhere on the site. Testimonials render only from
      real, sourced quotes (`src/content/site.ts` → `testimonials`, empty
      until she supplies real reviews).
- [ ] **Equal Housing Opportunity + REALTOR® marks in the footer.** Present in
      `Footer.tsx`. Confirm the hand-drawn EHO icon is acceptable, or replace
      it with HUD's official mark before launch.

## Keller Williams brand review

- [ ] Site reviewed against the KW Identity & Style Guide (colors, logo
      usage, required disclosures) — this has not been checked against the
      actual KW guide, only against the rules stated in CLAUDE.md.
- [ ] Approved by the Market Center compliance reviewer prior to launch.
- [ ] Exact Keller Williams brand red confirmed — `--color-kw-red` in
      `src/index.css` is a placeholder hex and is not currently used
      anywhere on the page. If a KW-red element is required by the style
      guide, source the exact value first.

## MLS / IDX attribution (CLAUDE.md §8.3)

`src/content/listings.ts` now has four real records and a "Recent Activity"
strip (`RecentActivity.tsx`) renders them. Confirm exact wording with
Stellar MLS and the broker before launch — the items below are the floor,
not confirmed final copy.

- [x] Listing brokerage name displayed at a size no smaller than the median
      size of the listing data itself, in visible color — implemented as
      `font-semibold` in each Recent Activity card.
- [x] "Listing courtesy of {brokerage}" shown for any property she did not
      list herself — see the `shearcrest-dr` record (buyer's agent; Compass
      Florida LLC held the listing).
- [x] MLS disclaimer text and a "data last updated" timestamp shown wherever
      listings render — placeholder wording in `RecentActivity.tsx`, marked
      `TODO:CONFIRM` pending Stellar MLS's exact required language.
- [ ] No compensation-related fields displayed, except where Stellar MLS
      specifically directs otherwise. (N/A currently — no compensation data
      was ever collected, since realtor.com's public pages don't show it.)
- [x] Every sold-property claim states her actual role (listing agent vs.
      buyer's agent) — `RecentActivity.tsx`'s status line says "Sold" for
      listings she listed and "Purchased" for ones where she represented the
      buyer.
- [ ] Listing photo rights confirmed per property before publishing. Per the
      site owner, these are cleared to use pending a final legal check before
      launch (rights usually sit with the photographer or listing brokerage,
      not the agent — see `ASSETS.md`). **Get that final confirmation before
      launch, not just before this session.**
- [ ] **No Stellar MLS number is confirmed for any of the four records** —
      realtor.com's public pages don't display one, so each uses realtor.com's
      own listing ID as a stand-in (flagged in a code comment in
      `listings.ts`). Confirm the real MLS# against her KW Command export.

## Not yet implemented — will need a compliance pass when built

- [ ] Three properties from her original list are **not yet added**
      (6702 Clair Shore Dr, 6828 Park Strand Dr, 809 Seminole Sky Dr) because
      their source pages didn't show a confirmed listing brokerage or her
      role. See `OPEN-QUESTIONS.md` for what's needed to add them — re-run
      this MLS/IDX section once they're in.
