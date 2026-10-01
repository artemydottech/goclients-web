import { cn } from '@/lib/utils';
import type { OptionCardProps } from './booking-wizard.types';

export const OptionCard = ({
  isSelected,
  onClick,
  children,
}: OptionCardProps) => (
  <button
    type="button"
    aria-pressed={isSelected}
    onClick={onClick}
    className={cn(
      'flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      isSelected && 'border-primary bg-muted/50',
    )}
  >
    {children}
  </button>
);
