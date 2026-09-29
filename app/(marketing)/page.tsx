import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        goclients
      </h1>
      <p className="text-lg text-muted-foreground">
        Онлайн-запись и управление салоном на своём сервере
      </p>
      <Button asChild size="lg">
        <Link href="/dashboard">Открыть панель</Link>
      </Button>
    </section>
  );
}
