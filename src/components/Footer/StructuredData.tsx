import { agent, brokerage, serviceAreas, team } from '@/content/site';

/** Escapes "</script" so static, developer-controlled JSON can't break out of the script tag. */
function toSafeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/<\/script/gi, '<\\/script');
}

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: agent.legalName,
    alternateName: agent.brandName,
    telephone: team.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: brokerage.office.street,
      addressLocality: brokerage.office.city,
      addressRegion: brokerage.office.state,
      postalCode: brokerage.office.zip,
      addressCountry: 'US',
    },
    areaServed: [...serviceAreas.primary, ...serviceAreas.secondary].map((name) => ({
      '@type': 'City',
      name: `${name}, FL`,
    })),
    worksFor: {
      '@type': 'Organization',
      name: brokerage.name,
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Florida Real Estate License',
      value: agent.licenseNumber,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toSafeJsonLd(structuredData) }}
    />
  );
}
