import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'dayjs/locale/ru';

import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/components/navigation/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { LuMenu } from 'react-icons/lu'; // Используем Lu вместо Fi для консистентности

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
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <LuMenu className="size-5" />
                        <span className="sr-only">Открыть меню</span>
                      </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-72 p-0">
                      <AppSidebar />
                    </SheetContent>
                  </Sheet>

                  <div className="font-semibold">Lumina Beauty Studio</div>
                </header>

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
