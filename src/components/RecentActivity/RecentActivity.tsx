import { listings, type Listing } from '@/content/listings';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

// ISO date-only strings ("2026-04-27") parse as UTC midnight; formatting in
// the viewer's local zone without pinning timeZone: 'UTC' can roll the date
// back a day for anyone west of UTC.
const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

function statusLine(listing: Listing): string {
  const closed = listing.closedOn ? dateFormatter.format(new Date(listing.closedOn)) : undefined;
  if (listing.status === 'sold') {
    const soldVerb = listing.role === 'listing-agent' ? 'Sold' : 'Purchased';
    return closed ? `${soldVerb} ${closed}` : soldVerb;
  }
  return listing.role === 'listing-agent' ? 'For sale' : 'Representing buyer';
}

export function RecentActivity() {
  if (listings.length === 0) {
    return null;
  }

  const featured = listings.slice(0, 3);
  const lastUpdated = listings.reduce<string>((latest, listing) => {
    return listing.source.verifiedOn > latest ? listing.source.verifiedOn : latest;
  }, featured[0]?.source.verifiedOn ?? '');

  return (
    <section id="recent-activity" className="bg-sand-50 py-20">
      <Container>
        <SectionHeading eyebrow="Recent Activity" title="A few recent transactions" />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => {
            const image = listing.images[0];
            return (
              <li
                key={listing.id}
                className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white"
              >
                {image && (
                  <img
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-wide text-seaglass-600 uppercase">
                    {statusLine(listing)}
                  </p>
                  <p className="mt-1 font-medium text-navy-900">
                    {listing.address.street}, {listing.address.city}
                  </p>
                  <p className="text-ink-700 mt-1 text-sm">
                    {priceFormatter.format(listing.price)}
                    {listing.beds > 0 && (
                      <>
                        {' '}
                        &middot; {listing.beds} bd &middot; {listing.baths} ba &middot;{' '}
                        {listing.sqft.toLocaleString()} sqft
                      </>
                    )}
                  </p>
                  {/*
                    CLAUDE.md §8.3: brokerage name must be at least as
                    prominent as the listing data, and any property she
                    didn't list herself must say so explicitly.
                  */}
                  <p className="mt-3 text-sm font-semibold text-navy-900">
                    {listing.role === 'buyer-agent'
                      ? `Listing courtesy of ${listing.listingBrokerage}`
                      : listing.listingBrokerage}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="text-ink-700 mt-8 text-xs">
          Listing information is believed accurate but not guaranteed and is subject to change.
          Data last updated {lastUpdated ? dateFormatter.format(new Date(lastUpdated)) : 'recently'}.
          {/* TODO:CONFIRM exact MLS disclaimer wording with Stellar MLS and the broker — see COMPLIANCE.md. */}
        </p>
      </Container>
    </section>
  );
}
