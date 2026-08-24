import { describe, expect, it } from 'vitest';
import { ListingValidationError, listings, parseListing, parseListings } from './listings';

const validListing = {
  id: 'test-1',
  status: 'sold',
  address: { street: '123 Main St', city: 'Apollo Beach', state: 'FL', zip: '33572' },
  price: 400000,
  beds: 3,
  baths: 2,
  sqft: 1800,
  mlsNumber: 'T1234567',
  listingBrokerage: 'Keller Williams South Shore',
  role: 'listing-agent',
  images: [],
  source: { url: 'https://www.zillow.com/profile/aukai2', verifiedOn: '2026-08-24' },
};

describe('parseListing', () => {
  it('accepts a fully-formed record', () => {
    expect(() => parseListing(validListing)).not.toThrow();
  });

  it('rejects a record missing source', () => {
    const { source: _source, ...withoutSource } = validListing;
    expect(() => parseListing(withoutSource)).toThrow(ListingValidationError);
  });

  it('rejects a record missing mlsNumber', () => {
    const { mlsNumber: _mlsNumber, ...withoutMls } = validListing;
    expect(() => parseListing(withoutMls)).toThrow(ListingValidationError);
  });

  it('rejects a record with an incomplete source', () => {
    expect(() => parseListing({ ...validListing, source: { url: 'https://example.com' } })).toThrow(
      ListingValidationError,
    );
  });
});

describe('listings seed data', () => {
  it('contains only records that pass validation', () => {
    expect(listings.length).toBeGreaterThan(0);
    expect(() => parseListings(listings)).not.toThrow();
  });

  it('every record carries source provenance', () => {
    for (const listing of listings) {
      expect(listing.source.url).toMatch(/^https:\/\//);
      expect(listing.source.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
