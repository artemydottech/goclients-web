import type { Metadata } from 'next';
import { ClientHero } from '@/components/landing/client-hero';
import { ClientBenefits } from '@/components/landing/client-benefits';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Faq } from '@/components/landing/faq';
import { CLIENT_FAQ, CLIENT_STEPS } from './page.constants';

export const metadata: Metadata = {
  title: 'Онлайн-запись к мастеру · goclients',
  description:
    'Выберите услугу, мастера и свободное время. Без звонков и регистрации.',
};

export default function ClientLandingPage() {
  return (
    <>
      <ClientHero />
      <div id="steps">
        <HowItWorks
          eyebrow="Четыре шага"
          title="Как записаться"
          steps={CLIENT_STEPS}
        />
      </div>
      <ClientBenefits />
      <Faq items={CLIENT_FAQ} />
    </>
  );
}
