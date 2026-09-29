import { Section } from '@/components/landing/section';
import type { HowItWorksProps } from './how-it-works.types';

export const HowItWorks = ({ eyebrow, title, steps }: HowItWorksProps) => (
  <Section id="how" eyebrow={eyebrow} title={title} className="bg-muted/40">
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="space-y-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {index + 1}
          </span>
          <h3 className="font-semibold">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
          {step.code && (
            <pre className="overflow-x-auto rounded-lg bg-background p-3 text-xs">
              <code>{step.code}</code>
            </pre>
          )}
        </li>
      ))}
    </ol>
  </Section>
);
