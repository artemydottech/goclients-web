import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'dayjs/locale/ru';

import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/components/navigation/sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/shared/header';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Goclients Dashboard',
  description: 'Панель управления организацией',
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
        <TooltipProvider>
          <SidebarProvider defaultOpen={true}>
            <div className="w-full flex min-h-screen bg-background">
              <AppSidebar />
              <SidebarInset className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                  {children}
                </main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
