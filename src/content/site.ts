/**
 * Single source of truth for every fact, string, and link on the site.
 * Nothing user-facing should be hardcoded in a component — add it here instead.
 *
 * Fields marked TODO:CONFIRM are unverified placeholders. See OPEN-QUESTIONS.md
 * for the full list and what's needed to resolve each one.
 */

export type Address = {
  street: string;
  city: string;
  state: 'FL';
  zip: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type ExternalProfile = {
  label: string;
  url: string;
};

export type ServiceCard = {
  title: string;
  summary: string;
  bullets: string[];
};

export type AreaCard = {
  name: string;
  tier: 'primary' | 'secondary';
  blurb: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  source: { label: string; url: string };
};

export const agent = {
  legalName: 'Michelle Lee Kelahuna Aukai-Dunn',
  brandName: 'Aukai Dunn',
  /** Use when introducing both the legal and brand name together. */
  nicknameDisplay: 'Michelle "Aukai" Dunn',
  pronunciation: 'ow-KYE',
  title: 'REALTOR®',
  licenseState: 'FL' as const,
  licenseNumber: 'SL3643355',
  origin: 'Originally from Hawaii, now serving Tampa Bay’s South Shore.',
} as const;

export const brokerage = {
  name: 'Keller Williams South Shore',
  office: {
    street: '109 Harbor Village Lane',
    city: 'Apollo Beach',
    state: 'FL',
    zip: '33572',
  } satisfies Address,
} as const;

export const team = {
  name: 'Frankenstein Home Team',
  leadAgent: 'Christie Frankenstein',
  phone: '813-704-8748',
  phoneHref: 'tel:+18137048748',
} as const;

export const contact = {
  /** TODO:CONFIRM — she has not yet confirmed this is the number she wants public. */
  directPhone: '656-214-7701',
  directPhoneHref: 'tel:+16562147701',
  /** TODO:CONFIRM — no email has been published anywhere public yet. */
  email: null as string | null,
} as const;

export const serviceAreas = {
  primary: ['Apollo Beach', 'Ruskin', 'Sun City Center', 'Riverview', 'Wimauma', 'Parrish'],
  secondary: ['Brandon', 'Lithia', 'Tampa', 'Bradenton', 'Sarasota'],
} as const;

export const specialties = [
  'Waterfront homes',
  'New construction',
  'Active-adult / 55+ communities',
  'Family neighborhoods',
  'Relocation',
  'First-time buyers',
  'Downsizing',
  'Investment properties',
] as const;

export const voice = {
  positioning:
    'I listen carefully, communicate honestly, and guide you through every step — easy to talk to, never pushy.',
  tagline: 'South Shore Real Estate Without the Sales Pitch',
} as const;

export const externalProfiles: ExternalProfile[] = [
  { label: 'Frankenstein Home Team', url: 'https://www.frankenteam.com/' },
  { label: 'Zillow', url: 'https://www.zillow.com/profile/aukai2' },
  {
    label: 'realtor.com',
    url: 'https://www.realtor.com/realestateagents/68c515d7744263f9b671002c',
  },
  {
    label: 'sold.com',
    url: 'https://www.sold.com/agent-profile/Michelle%20Lee%20Kelahuna%20Aukai-Dunn-246951',
  },
  { label: 'Facebook', url: 'https://www.facebook.com/MichelleAukaiDunnRealEstate/' },
  { label: 'Instagram', url: 'https://www.instagram.com/aukai_dunn/' },
];

export const nav: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'How I Help', href: '#how-i-help' },
  { label: 'Areas', href: '#areas' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  headline: "Buying or selling on Tampa Bay's South Shore?",
  headlineEmphasis: "You'll get straight answers — not a sales pitch.",
  subhead:
    'Serving Apollo Beach, Ruskin, Sun City Center, and Riverview with the Frankenstein Home Team at Keller Williams South Shore.',
  primaryCta: { label: "Let's talk about your move", href: '#contact' },
  secondaryCta: { label: 'Text Aukai', href: contact.directPhoneHref },
} as const;

/**
 * TODO:REVIEW — strong first draft in her voice, written from the facts in
 * CLAUDE.md §1. She should read this and edit it into her own words before launch.
 */
export const meetAukai = {
  heading: 'Meet Aukai',
  paragraphs: [
    "I grew up in Hawaii, so when people ask if I understand what it's like to move somewhere brand new, the answer is yes — I've done it myself. I fell for Tampa Bay's South Shore the same way a lot of my clients do: the water, the pace, neighbors who still wave.",
    'Today I help people buy and sell homes from Apollo Beach to Sun City Center, Ruskin, Riverview, Wimauma, and Parrish, working alongside the Frankenstein Home Team at Keller Williams South Shore.',
    "My approach is simple: I listen carefully, communicate honestly, and guide you through every step — no pressure, no sales pitch, just straight answers. Whether you're buying your first home, relocating from somewhere new, downsizing, or looking at an active-adult community, I'll tell you what I'd tell my own family.",
  ],
} as const;

export const services: ServiceCard[] = [
  {
    title: 'Buying',
    summary: 'First-time buyers, relocation, and new construction across the South Shore.',
    bullets: [
      'First-time buyers get a plain-English walkthrough of every step, no jargon assumed.',
      'Relocating from out of state? I moved here from Hawaii — I know the disorientation.',
      'New construction: I review builder contracts and site visits with you before you sign.',
    ],
  },
  {
    title: 'Selling',
    summary: 'Pricing, prep, marketing, and negotiation — handled honestly.',
    bullets: [
      'Pricing grounded in real comps, not an inflated number to win the listing.',
      'A prep and staging plan sized to your budget and timeline.',
      'Negotiation that keeps you informed at every offer, not just the final one.',
    ],
  },
  {
    title: 'Life transitions',
    summary: 'Downsizing, 55+ communities, and investment properties.',
    bullets: [
      'Downsizing handled with patience — timing the sale around your next move.',
      'Active-adult, 55+ community searches focused on lifestyle fit, not just square footage.',
      'Investment property guidance grounded in South Shore rental and resale trends.',
    ],
  },
];

export const areas: AreaCard[] = [
  {
    name: 'Apollo Beach',
    tier: 'primary',
    blurb: 'Canal-front living with direct boating access to Tampa Bay.',
  },
  {
    name: 'Ruskin',
    tier: 'primary',
    blurb: 'A working waterfront town with some of the area’s best value per square foot.',
  },
  {
    name: 'Sun City Center',
    tier: 'primary',
    blurb: 'A well-established active-adult community with an amenity-rich, golf-cart lifestyle.',
  },
  {
    name: 'Riverview',
    tier: 'primary',
    blurb: 'Fast-growing family neighborhoods with easy access to Tampa via I-75.',
  },
  {
    name: 'Wimauma',
    tier: 'primary',
    blurb: 'New construction communities on what was, until recently, open farmland.',
  },
  {
    name: 'Parrish',
    tier: 'primary',
    blurb: 'Manatee County’s fastest-growing town, still close to Tampa Bay.',
  },
];

/**
 * Testimonials are rendered only when this array is non-empty. Source real
 * quotes from her Zillow reviews — never fabricate a name or a quote.
 */
export const testimonials: Testimonial[] = [];

export const siteMeta = {
  title: 'Aukai Dunn | REALTOR® | South Shore Tampa Bay, FL',
  description:
    'Aukai Dunn is a licensed REALTOR® with Keller Williams South Shore, serving Apollo Beach, Ruskin, Sun City Center, Riverview, Wimauma, and Parrish. Straight answers, no sales pitch.',
} as const;
