import Link from 'next/link';
import { LuArrowRight, LuCheck } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { AudienceSwitch } from '@/components/landing/audience-switch';

const SLOT_EXAMPLES = ['10:00', '10:15', '11:30', '12:45', '14:00', '16:30'];

export const ClientHero = () => (
  <section className="relative overflow-hidden">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-40 right-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-gradient-to-bl from-primary/15 to-transparent blur-3xl"
    />
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:pt-20 lg:grid-cols-2">
      <div className="flex flex-col items-start gap-6">
        <AudienceSwitch active="clients" />
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Запишитесь к мастеру за минуту, без звонков
        </h1>
        <p className="text-balance text-lg text-muted-foreground">
          Выберите услугу, мастера и удобное окно — показываем только реально
          свободное время. Регистрация не нужна: достаточно имени и телефона.
        </p>
        <Button size="lg" asChild>
          <Link href="#steps">
            Как это работает
            <LuArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div
        aria-hidden="true"
        className="mx-auto w-full max-w-sm rounded-3xl border bg-card p-5 shadow-2xl shadow-primary/10"
      >
        <p className="text-xs text-muted-foreground">Lumina Beauty Studio</p>
        <p className="mt-1 font-semibold">Маникюр + гель-лак</p>
        <p className="text-sm text-muted-foreground">Мария · 1 ч 30 мин</p>
        <p className="mt-5 text-sm font-medium">Четверг, 1 октября</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {SLOT_EXAMPLES.map((slot) => (
            <span
              key={slot}
              className={
                slot === '12:45'
                  ? 'rounded-md bg-primary py-2 text-center text-sm font-medium text-primary-foreground'
                  : 'rounded-md border py-2 text-center text-sm'
              }
            >
              {slot}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200">
          <LuCheck className="size-4 shrink-0" />
          Вы записаны на 12:45
        </div>
      </div>
    </div>
  </section>
);
