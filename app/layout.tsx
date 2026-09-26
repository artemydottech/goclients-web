import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'dayjs/locale/ru';

import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClientProviderComponent } from '@/components/providers/query-client.provider';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'goclients',
  description: 'Онлайн-запись и управление салоном на своём сервере',
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
        <QueryClientProviderComponent>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryClientProviderComponent>
      </body>
    </html>
  );
}
