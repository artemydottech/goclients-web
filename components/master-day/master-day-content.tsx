'use client';
import { LuPhone } from 'react-icons/lu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { AppointmentStatusActions } from '@/components/appointment-details/appointment-status-actions';
import { useGetAppointments } from '@/services/queries/appointments';
import { useCompanyDirectory } from '@/hooks/use-company-directory';
import { cn } from '@/lib/utils';
import { formatPhone, formatPrice } from '@/utils';
import { inCompanyTimezone } from '@/utils/date';
import {
  isActiveAppointment,
  STATUS_LABELS,
  STATUS_STYLES,
} from '@/utils/appointments';
import type { MasterDayContentProps } from './master-day.types';

export const MasterDayContent = ({
  companyId,
  employeeId,
  timezone,
  from,
  to,
}: MasterDayContentProps) => {
  const directory = useCompanyDirectory(companyId);
  const { data, isPending, error } = useGetAppointments({
    employee_id: employeeId,
    from,
    to,
  });

  if (isPending || directory.isPending) {
    return <Skeleton className="h-64 w-full" />;
  }
  if (error) return <ErrorText errorMessage={error.message} />;

  const appointments = [...data].sort(
    (left, right) => Date.parse(left.starts_at) - Date.parse(right.starts_at),
  );
  const plannedRevenue = appointments
    .filter((appointment) => appointment.status !== 'cancelled')
    .reduce((sum, appointment) => sum + appointment.price, 0);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className="py-4">
          <CardContent>
            <p className="text-sm text-muted-foreground">Записей</p>
            <p className="text-2xl font-semibold tabular-nums">
              {appointments.filter(isActiveAppointment).length}
            </p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent>
            <p className="text-sm text-muted-foreground">По прайсу</p>
            <p className="text-2xl font-semibold tabular-nums">
              {formatPrice(plannedRevenue)}
            </p>
          </CardContent>
        </Card>
      </div>

      {appointments.length === 0 && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          На этот день записей нет
        </p>
      )}

      <ol className="space-y-3">
        {appointments.map((appointment) => {
          const client = directory.clientsById.get(appointment.client_id);
          const service = directory.servicesById.get(appointment.service_id);
          return (
            <li key={appointment.id}>
              <Card className="py-4">
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="w-16 shrink-0 text-lg font-semibold tabular-nums">
                      {inCompanyTimezone(
                        appointment.starts_at,
                        timezone,
                      ).format('HH:mm')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{client?.name ?? 'Клиент'}</p>
                      <p className="text-sm text-muted-foreground">
                        {service?.name} · {formatPrice(appointment.price)}
                      </p>
                      {client && (
                        <a
                          href={`tel:+${client.phone}`}
                          className="mt-1 inline-flex items-center gap-1.5 text-sm hover:underline"
                        >
                          <LuPhone className="size-3.5" />
                          {formatPhone(client.phone)}
                        </a>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(STATUS_STYLES[appointment.status])}
                    >
                      {STATUS_LABELS[appointment.status]}
                    </Badge>
                  </div>
                  {appointment.comment && (
                    <p className="rounded-lg bg-muted px-3 py-2 text-sm">
                      {appointment.comment}
                    </p>
                  )}
                  <AppointmentStatusActions appointment={appointment} />
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ol>
    </>
  );
};
