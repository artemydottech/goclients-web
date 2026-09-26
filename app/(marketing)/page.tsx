import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        goclients
      </h1>
      <p className="text-lg text-muted-foreground">
        Онлайн-запись и управление салоном на своём сервере
      </p>
      <Button asChild size="lg">
        <Link href="/dashboard">Открыть панель</Link>
      </Button>
    </main>
  );
}
