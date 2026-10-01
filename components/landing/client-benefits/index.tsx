import { Section } from '@/components/landing/section';
import { CLIENT_BENEFITS } from './client-benefits.constants';

export const ClientBenefits = () => (
  <Section
    eyebrow="Почему удобно"
    title="Запись, которая не заставляет ждать ответа"
  >
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CLIENT_BENEFITS.map((benefit) => (
        <li key={benefit.title} className="rounded-xl border bg-card p-5">
          <benefit.icon className="mb-4 size-6" />
          <h3 className="mb-1.5 font-semibold">{benefit.title}</h3>
          <p className="text-sm text-muted-foreground">{benefit.description}</p>
        </li>
      ))}
    </ul>
  </Section>
);
