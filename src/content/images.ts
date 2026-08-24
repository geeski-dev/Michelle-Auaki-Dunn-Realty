/**
 * Typed image manifest. Every image the site renders is declared here with a
 * stable key, a root-relative path, and fixed dimensions so layout never
 * shifts when a placeholder is swapped for a real photo.
 *
 * To replace a placeholder: drop the real file into `public/images/` and
 * change the `src` (and `width`/`height` if the real photo's aspect ratio
 * differs from the placeholder) for that one key below. No component edits
 * needed. See ASSETS.md for the full shopping list.
 */

export type ImageRef = {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ImageManifest = {
  hero: ImageRef;
  headshot: ImageRef;
  wordmark: ImageRef;
  lifestyleAreas: ImageRef;
  lifestyleHelp: ImageRef;
};

export const images: ImageManifest = {
  hero: {
    key: 'hero',
    src: '/images/hero.svg',
    width: 1600,
    height: 900,
    alt: 'Waterfront homes along a canal in Apollo Beach, Florida at golden hour',
  },
  headshot: {
    key: 'headshot',
    // Real headshot, sourced from her own Frankenstein Home Team profile
    // page. Native resolution is only 170x210 — on the small side for a
    // large display; a higher-res version would look sharper. See ASSETS.md.
    src: '/images/headshot.png',
    width: 170,
    height: 210,
    alt: 'Aukai Dunn, REALTOR® with Keller Williams South Shore',
  },
  wordmark: {
    key: 'wordmark',
    src: '/images/wordmark.svg',
    width: 240,
    height: 64,
    alt: 'Aukai Dunn',
  },
  lifestyleAreas: {
    key: 'lifestyleAreas',
    src: '/images/lifestyle-areas.svg',
    width: 1200,
    height: 800,
    alt: 'A quiet South Shore neighborhood street lined with palm trees',
  },
  lifestyleHelp: {
    key: 'lifestyleHelp',
    src: '/images/lifestyle-help.svg',
    width: 1200,
    height: 800,
    alt: 'A family unpacking boxes in the doorway of their new home',
  },
};
