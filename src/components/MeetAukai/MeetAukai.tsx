import { images } from '@/content/images';
import { agent, meetAukai } from '@/content/site';
import { Container } from '@/components/ui/Container';

export function MeetAukai() {
  return (
    <section id="about" className="bg-sand-50 py-20">
      <Container className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
        <img
          src={images.headshot.src}
          width={images.headshot.width}
          height={images.headshot.height}
          alt={images.headshot.alt}
          className="w-full max-w-[280px] rounded-2xl object-cover"
          loading="lazy"
        />

        <div className="max-w-prose">
          <h2 className="text-3xl sm:text-4xl">{meetAukai.heading}</h2>
          <p className="text-ink-700 mt-2 text-sm">
            {agent.title}, {agent.licenseState} Lic. {agent.licenseNumber} &middot; (
            {agent.pronunciation})
          </p>
          <div className="text-ink-700 mt-6 space-y-4 text-lg">
            {meetAukai.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
