// src/app/(dashboard)/layout.tsx
import type { ReactNode } from 'react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'; // ← если shadcn уже имеет Sidebar (новинка 2025+)
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FiMenu } from 'react-icons/fi'; // hamburger icon

import { DashboardSidebar } from '@/components/dashboard-sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="w-full flex min-h-screen bg-background">
        {/* Десктопная боковая панель */}
        <DashboardSidebar />

        {/* Основной контент */}
        <SidebarInset className="flex flex-col flex-1">
          {/* Мобильный header с кнопкой меню */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <FiMenu className="h-5 w-5" />
                  <span className="sr-only">Открыть меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <DashboardSidebar mobile />
              </SheetContent>
            </Sheet>

            <div className="font-semibold">Lumina Beauty Studio</div>
          </header>

          {/* Контент страницы */}
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
