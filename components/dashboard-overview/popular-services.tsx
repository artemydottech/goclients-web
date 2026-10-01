'use client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPrice } from '@/utils';
import type { OverviewSectionProps } from './dashboard-overview.types';

const TOP_LIMIT = 5;

export const PopularServices = ({
  appointments,
  directory,
}: OverviewSectionProps) => {
  const counts = new Map<number, number>();
  appointments
    .filter((appointment) => appointment.status !== 'cancelled')
    .forEach((appointment) =>
      counts.set(
        appointment.service_id,
        (counts.get(appointment.service_id) ?? 0) + 1,
      ),
    );
  const top = [...counts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, TOP_LIMIT);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Популярные услуги</CardTitle>
        <CardDescription>По записям за 30 дней</CardDescription>
      </CardHeader>
      <CardContent>
        {top.length === 0 ? (
          <p className="text-sm text-muted-foreground">Пока нет записей</p>
        ) : (
          <ul className="space-y-4">
            {top.map(([serviceId, count]) => {
              const service = directory.servicesById.get(serviceId);
              return (
                <li key={serviceId} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {service?.name ?? 'Удалённая услуга'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Записей: {count}
                    </p>
                  </div>
                  {service && (
                    <Badge variant="outline">
                      {formatPrice(service.price)}
                    </Badge>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
