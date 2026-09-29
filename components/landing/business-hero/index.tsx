import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import { FaGithub } from 'react-icons/fa6';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AudienceSwitch } from '@/components/landing/audience-switch';
import { ProductPreview } from '@/components/landing/product-preview';
import { GITHUB_URL } from '@/components/landing/site-header/site-header.constants';

export const BusinessHero = () => (
  <section className="relative overflow-hidden">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[36rem] max-w-4xl rounded-full bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent blur-3xl"
    />
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 pb-16 pt-12 text-center sm:pt-20">
      <AudienceSwitch active="business" />
      <Badge variant="outline" className="gap-1.5 px-3 py-1">
        Открытый код · Go + SQLite
      </Badge>
      <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
        Онлайн-запись для салона, которая живёт на вашем сервере
      </h1>
      <p className="max-w-2xl text-balance text-lg text-muted-foreground">
        Календарь мастеров, свободные слоты, графики с перерывами, отпуска и
        история каждого клиента. Без абонентской платы и без передачи базы
        третьим лицам.
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button size="lg" asChild>
          <Link href="/dashboard">
            Открыть демо-панель
            <LuArrowRight className="size-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <FaGithub className="size-4" />
            Развернуть у себя
          </a>
        </Button>
      </div>
    </div>
    <div className="px-4 pb-8">
      <ProductPreview />
    </div>
  </section>
);
