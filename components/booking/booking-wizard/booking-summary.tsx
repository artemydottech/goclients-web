import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDuration, formatPrice } from '@/utils';
import { inCompanyTimezone } from '@/utils/date';
import type { BookingSummaryProps } from './booking-wizard.types';

export const BookingSummary = ({
  company,
  selection,
  timezone,
}: BookingSummaryProps) => {
  const { service, employee, slot } = selection;

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader>
        <CardTitle>Ваша запись</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Салон</dt>
            <dd className="font-medium">{company?.name ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Услуга</dt>
            <dd className="font-medium">
              {service
                ? `${service.name} · ${formatDuration(service.duration)}`
                : 'Не выбрана'}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Мастер</dt>
            <dd className="font-medium">
              {employee
                ? `${employee.name} ${employee.surname}`.trim()
                : 'Не выбран'}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Время</dt>
            <dd className="font-medium first-letter:uppercase">
              {slot
                ? inCompanyTimezone(slot, timezone).format(
                    'dddd, D MMMM, HH:mm',
                  )
                : 'Не выбрано'}
            </dd>
          </div>
          {service && (
            <div className="flex items-center justify-between border-t pt-3">
              <dt className="text-muted-foreground">Стоимость</dt>
              <dd className="text-lg font-semibold tabular-nums">
                {formatPrice(service.price)}
              </dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
};
