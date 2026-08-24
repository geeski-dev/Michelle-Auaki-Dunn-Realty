import { brokerage, contact, team } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <section id="contact" className="bg-white py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about your move"
            description="Tell me a little about what you're looking to do — I'll follow up personally."
          />

          <div className="text-ink-700 mt-8 space-y-3">
            <p>
              Prefer to talk? Call or text{' '}
              <a href={team.phoneHref} className="text-navy-900 font-medium underline">
                {team.phone}
              </a>
              {contact.directPhone && (
                <>
                  {' '}
                  or text Aukai directly at{' '}
                  <a href={contact.directPhoneHref} className="text-navy-900 font-medium underline">
                    {contact.directPhone}
                  </a>
                </>
              )}
              .
            </p>

            {/* Florida brokerage-adjacency rule: this must sit beside every contact point on the page. */}
            <p className="text-sm">
              {brokerage.name} &middot; {brokerage.office.street}, {brokerage.office.city},{' '}
              {brokerage.office.state} {brokerage.office.zip}
            </p>
          </div>
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
