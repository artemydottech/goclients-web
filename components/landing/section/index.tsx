import { cn } from '@/lib/utils';
import type { SectionProps } from './section.types';

export const Section = ({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) => (
  <section id={id} className={cn('scroll-mt-20 py-16 sm:py-24', className)}>
    <div className="mx-auto max-w-6xl px-4">
      <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="text-balance text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  </section>
);
