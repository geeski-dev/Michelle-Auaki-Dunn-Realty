import { testimonials } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Testimonials() {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="bg-sand-50 py-20">
      <Container>
        <SectionHeading eyebrow="Client Stories" title="What clients say" />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.author}
              className="border-navy-900/10 rounded-2xl border bg-white p-6"
            >
              <p className="text-ink-700">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="text-navy-900 mt-4 text-sm font-semibold">{testimonial.author}</p>
              <a
                href={testimonial.source.url}
                target="_blank"
                rel="noreferrer"
                className="text-seaglass-600 text-sm underline"
              >
                {testimonial.source.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
