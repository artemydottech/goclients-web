'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatusScreen } from '@/components/shared/status-screen';

interface DashboardErrorProps {
  reset: () => void;
}

export default function DashboardError({ reset }: DashboardErrorProps) {
  return (
    <StatusScreen
      code="Ошибка"
      title="Раздел не загрузился"
      description="Проверьте, что бэкенд goclients запущен и доступен по API_URL."
      actions={
        <>
          <Button onClick={reset}>Попробовать снова</Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Все компании</Link>
          </Button>
        </>
      }
    />
  );
}
