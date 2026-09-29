import { Section } from '@/components/landing/section';
import { BUSINESS_FEATURES } from './business-features.constants';

export const BusinessFeatures = () => (
  <Section
    id="features"
    eyebrow="Возможности"
    title="Всё, чтобы вести запись без тетрадки и таблиц"
    description="Функции, которые уже работают в бэкенде и панели."
  >
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {BUSINESS_FEATURES.map((feature) => (
        <li key={feature.title} className="rounded-xl border bg-card p-5">
          <feature.icon className="mb-4 size-6" />
          <h3 className="mb-1.5 font-semibold">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </li>
      ))}
    </ul>
  </Section>
);
