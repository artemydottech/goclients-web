import type { Metadata } from 'next';
import { SalonList } from '@/components/booking/salon-list';

export const metadata: Metadata = {
  title: 'Выберите салон',
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Онлайн-запись</h1>
        <p className="text-muted-foreground">
          Выберите салон, чтобы посмотреть услуги и свободное время
        </p>
      </div>
      <SalonList />
    </div>
  );
}
