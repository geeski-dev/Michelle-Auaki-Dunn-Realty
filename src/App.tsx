import { Areas } from '@/components/Areas/Areas';
import { Contact } from '@/components/Contact/Contact';
import { CredibilityStrip } from '@/components/CredibilityStrip/CredibilityStrip';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { Hero } from '@/components/Hero/Hero';
import { HowIHelp } from '@/components/HowIHelp/HowIHelp';
import { MeetAukai } from '@/components/MeetAukai/MeetAukai';
import { RecentActivity } from '@/components/RecentActivity/RecentActivity';
import { Testimonials } from '@/components/Testimonials/Testimonials';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredibilityStrip />
        <MeetAukai />
        <HowIHelp />
        <Areas />
        <Testimonials />
        <RecentActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
