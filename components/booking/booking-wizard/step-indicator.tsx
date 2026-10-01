import { cn } from '@/lib/utils';
import { BOOKING_STEPS } from './booking-wizard.constants';
import type { StepIndicatorProps } from './booking-wizard.types';

export const StepIndicator = ({ current }: StepIndicatorProps) => {
  const currentIndex = BOOKING_STEPS.findIndex(
    ({ value }) => value === current,
  );

  return (
    <ol className="flex flex-wrap gap-2 text-sm">
      {BOOKING_STEPS.map((step, index) => (
        <li
          key={step.value}
          aria-current={index === currentIndex ? 'step' : undefined}
          className={cn(
            'flex items-center gap-2 rounded-full border px-3 py-1 text-muted-foreground',
            index === currentIndex && 'border-primary text-foreground',
            index < currentIndex && 'bg-muted text-foreground',
          )}
        >
          <span className="tabular-nums">{index + 1}</span>
          {step.label}
        </li>
      ))}
    </ol>
  );
};
