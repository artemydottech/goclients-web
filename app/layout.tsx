// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip'; // ← добавь это

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
        className={
          inter.className + ' antialiased bg-background text-foreground'
        }
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
