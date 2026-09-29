import { BusinessHero } from '@/components/landing/business-hero';
import { BusinessFeatures } from '@/components/landing/business-features';
import { HowItWorks } from '@/components/landing/how-it-works';
import { BUSINESS_STEPS } from './page.constants';

export default function BusinessLandingPage() {
  return (
    <>
      <BusinessHero />
      <BusinessFeatures />
      <HowItWorks
        eyebrow="Как начать"
        title="От клонирования репозитория до первой записи — вечер"
        steps={BUSINESS_STEPS}
      />
    </>
  );
}
