import type { CtaBandProps } from './cta-band.types';

export const CtaBand = ({ title, description, action }: CtaBandProps) => (
  <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
    <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
      <h2 className="text-balance text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="max-w-xl text-balance opacity-80">{description}</p>
      {action}
    </div>
  </section>
);
