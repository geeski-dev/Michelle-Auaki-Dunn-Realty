import type { ImageRef } from './images';

/**
 * Every number, address, price, and stat here must be traceable to a real
 * source — her MLS / KW Command export, or manual verified transcription
 * from her own public profiles (CLAUDE.md §8.1). No scraping, no invented
 * "example" properties. If a record's provenance can't be verified, it does
 * not belong in this file — the listings UI renders nothing when this array
 * is empty, which is the correct state until real data arrives.
 */

export type ListingStatus = 'active' | 'pending' | 'sold';
export type ListingRole = 'listing-agent' | 'buyer-agent';

export type ListingAddress = {
  street: string;
  city: string;
  state: 'FL';
  zip: string;
};

export type ListingSource = {
  url: string;
  /** ISO date the fact was last checked against the source. */
  verifiedOn: string;
};

export type Listing = {
  id: string;
  status: ListingStatus;
  address: ListingAddress;
  /** List price, or sold price when status is "sold". */
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  mlsNumber: string;
  /** Required attribution — see CLAUDE.md §8.3. */
  listingBrokerage: string;
  role: ListingRole;
  /** ISO date, sold listings only. */
  closedOn?: string;
  images: ImageRef[];
  source: ListingSource;
};

export class ListingValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ListingValidationError';
  }
}

const LISTING_STATUSES: ListingStatus[] = ['active', 'pending', 'sold'];
const LISTING_ROLES: ListingRole[] = ['listing-agent', 'buyer-agent'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function requireString(record: Record<string, unknown>, field: string, errors: string[]): string {
  const value = record[field];
  if (typeof value !== 'string' || value.trim() === '') {
    errors.push(`"${field}" must be a non-empty string`);
    return '';
  }
  return value;
}

function requireNumber(record: Record<string, unknown>, field: string, errors: string[]): void {
  const value = record[field];
  if (typeof value !== 'number' || Number.isNaN(value)) {
    errors.push(`"${field}" must be a number`);
  }
}

/**
 * Zod-style runtime parser: checks an unknown value is a well-formed
 * `Listing`, collecting every field-level problem before throwing so a bad
 * record is easy to fix in one pass rather than one error at a time.
 */
export function parseListing(value: unknown, index = 0): Listing {
  const errors: string[] = [];

  if (!isRecord(value)) {
    throw new ListingValidationError(`Listing at index ${index} is not an object`);
  }

  const id = requireString(value, 'id', errors);

  if (
    typeof value.status !== 'string' ||
    !LISTING_STATUSES.includes(value.status as ListingStatus)
  ) {
    errors.push(`"status" must be one of ${LISTING_STATUSES.join(', ')}`);
  }

  const address = value.address;
  if (!isRecord(address)) {
    errors.push('"address" is required');
  } else {
    requireString(address, 'street', errors);
    requireString(address, 'city', errors);
    if (address.state !== 'FL') errors.push('"address.state" must be "FL"');
    requireString(address, 'zip', errors);
  }

  requireNumber(value, 'price', errors);
  requireNumber(value, 'beds', errors);
  requireNumber(value, 'baths', errors);
  requireNumber(value, 'sqft', errors);
  requireString(value, 'mlsNumber', errors);
  requireString(value, 'listingBrokerage', errors);

  if (typeof value.role !== 'string' || !LISTING_ROLES.includes(value.role as ListingRole)) {
    errors.push(`"role" must be one of ${LISTING_ROLES.join(', ')}`);
  }

  if (!Array.isArray(value.images)) {
    errors.push('"images" must be an array');
  }

  const source = value.source;
  if (!isRecord(source)) {
    errors.push('"source" is required (with url and verifiedOn)');
  } else {
    requireString(source, 'url', errors);
    requireString(source, 'verifiedOn', errors);
  }

  if (errors.length > 0) {
    throw new ListingValidationError(
      `Listing at index ${index} (id: "${id || 'unknown'}") failed validation:\n  - ${errors.join('\n  - ')}`,
    );
  }

  return value as unknown as Listing;
}

export function parseListings(values: unknown[]): Listing[] {
  return values.map((value, index) => parseListing(value, index));
}

const rawListings: unknown[] = [
  {
    id: 'shearcrest-dr',
    status: 'sold',
    address: { street: '15126 Shearcrest Dr', city: 'Lithia', state: 'FL', zip: '33547' },
    price: 585000,
    beds: 4,
    baths: 2,
    sqft: 2581,
    // realtor.com's listing identifier for this property — its page does not
    // display a raw Stellar MLS number. Confirm against her MLS/KW Command
    // export before treating this as the official MLS#.
    mlsNumber: 'M66862-04664',
    // She represented the buyer; Compass Florida LLC held the listing.
    listingBrokerage: 'Compass Florida LLC',
    role: 'buyer-agent',
    closedOn: '2026-04-27',
    images: [
      {
        key: 'shearcrest-main',
        src: '/images/listings/shearcrest.webp',
        width: 960,
        height: 640,
        alt: 'Front exterior of the single-family home at 15126 Shearcrest Dr, Lithia, FL',
      },
    ],
    source: {
      url: 'https://www.realtor.com/realestateandhomes-detail/15126-Shearcrest-Dr_Lithia_FL_33547_M66862-04664',
      verifiedOn: '2026-08-24',
    },
  },
  {
    id: 'scuba-crest-st',
    status: 'sold',
    address: { street: '16818 Scuba Crest St', city: 'Wimauma', state: 'FL', zip: '33598' },
    price: 354482,
    beds: 2,
    baths: 2.5,
    sqft: 2239,
    mlsNumber: 'M65386-56505',
    listingBrokerage: 'Keller Williams South Shore',
    role: 'listing-agent',
    closedOn: '2026-07-13',
    images: [
      {
        key: 'scuba-crest-main',
        src: '/images/listings/scuba-crest.webp',
        width: 960,
        height: 639,
        alt: 'Front exterior of the single-family home at 16818 Scuba Crest St, Wimauma, FL',
      },
    ],
    source: {
      url: 'https://www.realtor.com/realestateandhomes-detail/16818-Scuba-Crest-St_Wimauma_FL_33598_M65386-56505',
      verifiedOn: '2026-08-24',
    },
  },
  {
    id: 'touch-gold-ln',
    status: 'active',
    address: { street: '14441 Touch Gold Ln', city: 'Sun City Center', state: 'FL', zip: '33573' },
    price: 289000,
    beds: 3,
    baths: 2,
    sqft: 1451,
    mlsNumber: 'M92849-67469',
    listingBrokerage: 'Keller Williams South Shore',
    role: 'listing-agent',
    images: [
      {
        key: 'touch-gold-main',
        src: '/images/listings/touch-gold.webp',
        width: 960,
        height: 639,
        alt: 'Front exterior of the single-family home at 14441 Touch Gold Ln, Sun City Center, FL',
      },
    ],
    source: {
      url: 'https://www.realtor.com/realestateandhomes-detail/14441-Touch-Gold-Ln_Ruskin_FL_33573_M92849-67469',
      verifiedOn: '2026-08-24',
    },
  },
  {
    id: 'timberlee-rd',
    status: 'active',
    address: { street: '3106 Timberlee Rd', city: 'Wimauma', state: 'FL', zip: '33598' },
    // Vacant land — no livable structure, so beds/baths/sqft are 0 rather
    // than fabricated. Lot is 2.76 acres (120,226 sqft).
    price: 229000,
    beds: 0,
    baths: 0,
    sqft: 0,
    mlsNumber: 'M63407-41124',
    listingBrokerage: 'Keller Williams South Shore',
    role: 'listing-agent',
    images: [],
    source: {
      url: 'https://www.realtor.com/realestateandhomes-detail/3106-Timberlee-Rd_Wimauma_FL_33598_M63407-41124',
      verifiedOn: '2026-08-24',
    },
  },
];

export const listings: Listing[] = parseListings(rawListings);
