import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Audience, AudienceSwitchProps } from './audience-switch.types';

const OPTIONS: { value: Audience; label: string; href: string }[] = [
  { value: 'business', label: 'У меня салон', href: '/' },
  { value: 'clients', label: 'Хочу записаться', href: '/for-clients' },
];

export const AudienceSwitch = ({ active }: AudienceSwitchProps) => (
  <nav
    aria-label="Для кого страница"
    className="inline-flex rounded-full border bg-muted/60 p-1 text-sm"
  >
    {OPTIONS.map((option) => (
      <Link
        key={option.value}
        href={option.href}
        aria-current={option.value === active ? 'page' : undefined}
        className={cn(
          'rounded-full px-4 py-1.5 text-muted-foreground transition-colors hover:text-foreground',
          option.value === active && 'bg-background text-foreground shadow-sm',
        )}
      >
        {option.label}
      </Link>
    ))}
  </nav>
);
