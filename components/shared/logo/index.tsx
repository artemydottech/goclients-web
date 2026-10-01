import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { LogoProps } from './logo.types';

export const Logo = ({ className }: LogoProps) => (
  <Link
    href="/"
    className={cn('flex items-center gap-2 font-semibold', className)}
  >
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true" fill="none">
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M9 12.5h14M12.5 8v3M19.5 8v3"
        className="stroke-primary-foreground"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m12 18.5 3 3 5.5-5.5"
        className="stroke-primary-foreground"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="text-lg tracking-tight">goclients</span>
  </Link>
);
