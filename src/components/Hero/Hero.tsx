import { images } from '@/content/images';
import { hero } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <img
        src={images.hero.src}
        width={images.hero.width}
        height={images.hero.height}
        alt={images.hero.alt}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="bg-navy-900/50 absolute inset-0" aria-hidden="true" />

      <Container className="relative py-24 sm:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl text-white sm:text-5xl">
            {hero.headline} <span className="text-coral-400">{hero.headlineEmphasis}</span>
          </h1>
          <p className="text-sand-100 mt-6 max-w-prose text-lg">{hero.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
