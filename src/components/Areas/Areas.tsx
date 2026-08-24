import { images } from '@/content/images';
import { areas, serviceAreas } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Areas() {
  return (
    <section id="areas" className="bg-navy-900 relative overflow-hidden py-20 text-white">
      <img
        src={images.lifestyleAreas.src}
        width={images.lifestyleAreas.width}
        height={images.lifestyleAreas.height}
        alt={images.lifestyleAreas.alt}
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        loading="lazy"
      />

      <Container className="relative">
        <SectionHeading
          tone="light"
          eyebrow="Areas I Serve"
          title="Tampa Bay's South Shore, from the water to the highway."
          description={`Also working with buyers and sellers in ${serviceAreas.secondary.join(', ')}.`}
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <li key={area.name} className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h3 className="text-xl text-white">{area.name}</h3>
              <p className="text-sand-100 mt-2">{area.blurb}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
