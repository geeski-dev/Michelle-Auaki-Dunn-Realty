import { agent, brokerage, externalProfiles, team } from '@/content/site';
import { Container } from '@/components/ui/Container';

const zillow = externalProfiles.find((profile) => profile.label === 'Zillow');

export function CredibilityStrip() {
  return (
    <div className="border-navy-900/10 border-b bg-white py-4">
      <Container>
        <ul className="text-ink-700 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm sm:justify-between">
          <li className="text-navy-900 font-medium">{agent.title}</li>
          <li aria-hidden="true" className="text-navy-900/30 hidden sm:inline">
            &middot;
          </li>
          {/*
            FREC 61J2-10.026: the team name must never render larger than the
            brokerage name. Brokerage is text-sm font-semibold; team is
            text-sm font-normal — same size, lighter weight, never bigger.
          */}
          <li className="text-navy-900 text-sm font-semibold">{brokerage.name}</li>
          <li aria-hidden="true" className="text-navy-900/30 hidden sm:inline">
            &middot;
          </li>
          <li className="text-ink-700 text-sm font-normal">{team.name}</li>
          <li aria-hidden="true" className="text-navy-900/30 hidden sm:inline">
            &middot;
          </li>
          <li>FL Lic. {agent.licenseNumber}</li>
          {zillow && (
            <>
              <li aria-hidden="true" className="text-navy-900/30 hidden sm:inline">
                &middot;
              </li>
              <li>
                <a
                  href={zillow.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-seaglass-600 underline"
                >
                  Read reviews on Zillow
                </a>
              </li>
            </>
          )}
        </ul>
      </Container>
    </div>
  );
}
