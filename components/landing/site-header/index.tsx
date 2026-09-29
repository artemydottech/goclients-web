'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { cn } from '@/lib/utils';
import { GITHUB_URL, SITE_NAV } from './site-header.constants';

export const SiteHeader = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
        <Logo />
        <nav className="hidden items-center gap-1 sm:flex">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground',
                pathname === item.href && 'bg-muted text-foreground',
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Исходный код на GitHub"
            >
              <FaGithub className="size-5" />
            </a>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Открыть панель</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
