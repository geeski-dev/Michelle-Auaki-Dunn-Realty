import { images } from '@/content/images';
import { services } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function HowIHelp() {
  return (
    <section id="how-i-help" className="bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="How I Help"
          title="Whatever stage you're at, I'll meet you there."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <img
            src={images.lifestyleHelp.src}
            width={images.lifestyleHelp.width}
            height={images.lifestyleHelp.height}
            alt={images.lifestyleHelp.alt}
            className="w-full rounded-2xl object-cover"
            loading="lazy"
          />

          <ul className="grid gap-6">
            {services.map((service) => (
              <li
                key={service.title}
                className="border-navy-900/10 bg-sand-50 rounded-2xl border p-6"
              >
                <h3 className="text-xl">{service.title}</h3>
                <p className="text-ink-700 mt-2">{service.summary}</p>
                <ul className="text-ink-700 mt-4 space-y-2 text-sm">
                  {service.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 24)} className="flex gap-2">
                      <span aria-hidden="true" className="text-seaglass-600">
                        &bull;
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
