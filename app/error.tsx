'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatusScreen } from '@/components/shared/status-screen';

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <StatusScreen
      code="Ошибка"
      title="Что-то пошло не так"
      description="Страница не загрузилась. Попробуйте ещё раз — если не поможет, проверьте, что бэкенд запущен."
      actions={
        <>
          <Button onClick={reset}>Попробовать снова</Button>
          <Button variant="outline" asChild>
            <Link href="/">На главную</Link>
          </Button>
        </>
      }
    />
  );
}
