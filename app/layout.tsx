import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';
import 'dayjs/locale/ru';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { QueryClientProviderComponent } from '@/components/providers/query-client.provider';
import { ThemeProviderComponent } from '@/components/providers/theme.provider';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — онлайн-запись для салона на своём сервере`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-background text-foreground`}
      >
        <ThemeProviderComponent>
          <QueryClientProviderComponent>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="top-center" />
          </QueryClientProviderComponent>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
