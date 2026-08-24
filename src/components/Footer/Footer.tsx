import { agent, brokerage, externalProfiles, team } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { EqualHousingIcon } from './EqualHousingIcon';
import { StructuredData } from './StructuredData';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-sand-100 pb-24 sm:pb-10">
      <StructuredData />

      <Container className="grid gap-10 py-14 sm:grid-cols-2">
        <div>
          <p className="font-medium text-white">{agent.nicknameDisplay}</p>
          <p className="mt-1 text-sm">
            {agent.title}, {agent.licenseState} Lic. {agent.licenseNumber}
          </p>

          {/*
            FREC 61J2-10.026: the team name must never render larger than the
            brokerage name. Brokerage is text-sm font-semibold; team is
            text-sm font-normal — same size, lighter weight, never bigger.
          */}
          <p className="mt-4 text-sm font-semibold text-white">{brokerage.name}</p>
          <p className="text-sm font-normal">{team.name}</p>
          <p className="mt-1 text-sm">
            {brokerage.office.street}
            <br />
            {brokerage.office.city}, {brokerage.office.state} {brokerage.office.zip}
          </p>
          <p className="mt-1 text-sm">
            <a href={team.phoneHref} className="underline">
              {team.phone}
            </a>
          </p>
        </div>

        <div>
          <p className="font-medium text-white">Find Aukai elsewhere</p>
          <ul className="mt-3 space-y-2 text-sm">
            {externalProfiles.map((profile) => (
              <li key={profile.url}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-white"
                >
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-4 border-t border-white/15 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <EqualHousingIcon />
            <span>Equal Housing Opportunity &middot; REALTOR®</span>
          </div>
          <p>
            &copy; {new Date().getFullYear()} {agent.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
