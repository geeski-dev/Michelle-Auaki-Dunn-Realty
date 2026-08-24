import { images } from '@/content/images';
import { nav, team } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function Header() {
  return (
    <>
      <header className="border-navy-900/10 bg-sand-50/90 sticky top-0 z-40 border-b backdrop-blur">
        <Container className="flex items-center justify-between py-3">
          <a href="#top" className="shrink-0">
            <img
              src={images.wordmark.src}
              width={images.wordmark.width}
              height={images.wordmark.height}
              alt={images.wordmark.alt}
              className="h-10 w-auto"
            />
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-navy-900 hover:text-seaglass-600 text-sm font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/*
            Visibility lives on this wrapper, not on the Button itself —
            Button's own className already hardcodes `inline-flex`, and
            `hidden` fighting `inline-flex` at equal specificity on the same
            element is order-dependent in Tailwind's generated stylesheet.
            A wrapper sidesteps the conflict entirely.
          */}
          <div className="hidden sm:block">
            <Button href={team.phoneHref} variant="primary">
              Call/Text {team.phone}
            </Button>
          </div>
        </Container>
      </header>

      {/* Bottom sticky call bar, mobile only — keeps the primary contact action in the thumb zone. */}
      <div className="border-navy-900/10 bg-sand-50/95 fixed inset-x-0 bottom-0 z-40 border-t p-3 backdrop-blur sm:hidden">
        <Button href={team.phoneHref} variant="primary" className="w-full">
          Call/Text {team.phone}
        </Button>
      </div>
    </>
  );
}
