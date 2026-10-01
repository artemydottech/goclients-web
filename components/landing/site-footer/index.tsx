import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import {
  GITHUB_URL,
  SITE_NAV,
} from '@/components/landing/site-header/site-header.constants';

export const SiteFooter = () => (
  <footer className="border-t">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
      <div className="space-y-3">
        <Logo />
        <p className="text-sm text-muted-foreground">
          Онлайн-запись и учёт клиентов для салонов, которые хотят держать
          данные у себя.
        </p>
      </div>
      <nav className="space-y-2 text-sm">
        <p className="font-medium">Продукт</p>
        {SITE_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-muted-foreground hover:text-foreground"
          >
            {item.title}
          </Link>
        ))}
        <Link
          href="/dashboard"
          className="block text-muted-foreground hover:text-foreground"
        >
          Панель управления
        </Link>
      </nav>
      <div className="space-y-2 text-sm">
        <p className="font-medium">Открытый код</p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-muted-foreground hover:text-foreground"
        >
          Бэкенд на Go
        </a>
        <a
          href="https://github.com/artemydottech/goclients-web"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-muted-foreground hover:text-foreground"
        >
          Веб-интерфейс
        </a>
      </div>
    </div>
    <div className="border-t py-4 text-center text-xs text-muted-foreground">
      goclients · selfhosted-аналог yclients
    </div>
  </footer>
);
