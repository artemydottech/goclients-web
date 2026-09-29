import { LuChevronDown } from 'react-icons/lu';
import { Section } from '@/components/landing/section';
import type { FaqProps } from './faq.types';

export const Faq = ({ items }: FaqProps) => (
  <Section id="faq" eyebrow="Вопросы" title="Частые вопросы">
    <div className="mx-auto max-w-3xl divide-y rounded-xl border">
      {items.map((item) => (
        <details key={item.question} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <LuChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-4 text-sm text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  </Section>
);
