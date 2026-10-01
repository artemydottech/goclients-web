import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BusinessHero } from '@/components/landing/business-hero';
import { BusinessFeatures } from '@/components/landing/business-features';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Pricing } from '@/components/landing/pricing';
import { Faq } from '@/components/landing/faq';
import { CtaBand } from '@/components/landing/cta-band';
import { BUSINESS_FAQ, BUSINESS_STEPS } from './page.constants';

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
      <Pricing />
      <Faq items={BUSINESS_FAQ} />
      <CtaBand
        title="Посмотрите панель на демо-данных"
        description="Календарь, карточки клиентов и графики мастеров — всё как у вас будет после установки."
        action={
          <Button size="lg" variant="secondary" asChild>
            <Link href="/dashboard">Открыть демо-панель</Link>
          </Button>
        }
      />
    </>
  );
}
