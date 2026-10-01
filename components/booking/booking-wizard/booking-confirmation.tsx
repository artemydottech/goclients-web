import Link from 'next/link';
import { LuCircleCheck, LuMapPin } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils';
import { inCompanyTimezone } from '@/utils/date';
import type { BookingConfirmationProps } from './booking-wizard.types';

export const BookingConfirmation = ({
  company,
  selection,
  timezone,
  onRestart,
}: BookingConfirmationProps) => {
  const { service, employee, slot } = selection;
  const startsAt = inCompanyTimezone(slot, timezone);

  return (
    <div
      role="status"
      className="mx-auto flex max-w-lg flex-col items-center gap-5 rounded-2xl border bg-card px-6 py-10 text-center"
    >
      <LuCircleCheck className="size-14 text-emerald-500" />
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Вы записаны</h2>
        <p className="text-muted-foreground first-letter:uppercase">
          {startsAt.format('dddd, D MMMM, HH:mm')}
        </p>
      </div>
      <dl className="w-full space-y-2 rounded-xl bg-muted/60 p-4 text-left text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Услуга</dt>
          <dd className="text-right font-medium">{service?.name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Мастер</dt>
          <dd className="text-right font-medium">
            {employee && `${employee.name} ${employee.surname}`.trim()}
          </dd>
        </div>
        {service && (
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Стоимость</dt>
            <dd className="font-medium tabular-nums">
              {formatPrice(service.price)}
            </dd>
          </div>
        )}
      </dl>
      {company?.address && (
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <LuMapPin className="size-4" />
          {company.address}
        </p>
      )}
      <p className="text-sm text-muted-foreground">
        Администратор увидит запись в календаре и свяжется, если что-то
        изменится.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={onRestart}>Записаться ещё</Button>
        <Button variant="outline" asChild>
          <Link href="/book">Другие салоны</Link>
        </Button>
      </div>
    </div>
  );
};
