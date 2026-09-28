'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDuration } from '@/utils';
import { inCompanyTimezone } from '@/utils/date';
import { isActiveAppointment } from '@/utils/appointments';
import type { OverviewSectionProps } from './dashboard-overview.types';

const UPCOMING_LIMIT = 6;

export const UpcomingList = ({
  companyId,
  appointments,
  directory,
  timezone,
}: OverviewSectionProps) => {
  const [now] = useState(Date.now);
  const upcoming = appointments
    .filter(
      (appointment) =>
        isActiveAppointment(appointment) &&
        Date.parse(appointment.ends_at) > now,
    )
    .sort(
      (left, right) => Date.parse(left.starts_at) - Date.parse(right.starts_at),
    )
    .slice(0, UPCOMING_LIMIT);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ближайшие записи</CardTitle>
        <CardDescription>Активные записи, которые ещё впереди</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/${companyId}/appointments`}>Календарь</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">Впереди записей нет</p>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((appointment) => {
              const startsAt = inCompanyTimezone(
                appointment.starts_at,
                timezone,
              );
              const client = directory.clientsById.get(appointment.client_id);
              const service = directory.servicesById.get(
                appointment.service_id,
              );
              const employee = directory.employeesById.get(
                appointment.employee_id,
              );
              return (
                <li
                  key={appointment.id}
                  className="flex items-start gap-4 rounded-lg border p-3"
                >
                  <div className="w-16 shrink-0 text-center">
                    <p className="text-lg font-bold tabular-nums">
                      {startsAt.format('HH:mm')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {startsAt.format('D MMM')}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{client?.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {service?.name}
                      {service && ` · ${formatDuration(service.duration)}`}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium">
                    {employee?.name}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
