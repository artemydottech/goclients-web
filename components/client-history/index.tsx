'use client';
import { LuHistory } from 'react-icons/lu';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { EmptyState } from '@/components/shared/empty-state';
import { useGetAppointments } from '@/services/queries/appointments';
import { useGetCompany } from '@/services/queries/companies';
import { useCompanyDirectory } from '@/hooks/use-company-directory';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils';
import { DEFAULT_TIMEZONE, inCompanyTimezone } from '@/utils/date';
import { STATUS_LABELS, STATUS_STYLES } from '@/utils/appointments';
import type { ClientHistoryProps } from './client-history.types';

const ClientHistoryContent = ({ companyId, clientId }: ClientHistoryProps) => {
  const { data: company } = useGetCompany(companyId);
  const directory = useCompanyDirectory(companyId);
  const { data, isPending, error } = useGetAppointments({
    client_id: clientId,
  });
  const timezone = company?.timezone || DEFAULT_TIMEZONE;

  if (isPending || directory.isPending) {
    return <Skeleton className="h-40 w-full" />;
  }
  if (error) return <ErrorText errorMessage={error.message} />;

  if (data.length === 0) {
    return (
      <EmptyState
        icon={LuHistory}
        title="Визитов ещё не было"
        description="Здесь появятся все записи клиента: прошедшие и будущие."
      />
    );
  }

  const appointments = [...data].sort(
    (left, right) => Date.parse(right.starts_at) - Date.parse(left.starts_at),
  );

  return (
    <ul className="divide-y">
      {appointments.map((appointment) => {
        const service = directory.servicesById.get(appointment.service_id);
        const employee = directory.employeesById.get(appointment.employee_id);
        return (
          <li key={appointment.id} className="flex items-center gap-4 py-3">
            <div className="w-36 shrink-0 whitespace-nowrap text-sm tabular-nums">
              {inCompanyTimezone(appointment.starts_at, timezone).format(
                'D MMM YYYY, HH:mm',
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {service?.name ?? 'Удалённая услуга'}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {employee ? `${employee.name} ${employee.surname}`.trim() : '—'}
              </p>
            </div>
            <p className="hidden text-sm tabular-nums sm:block">
              {formatPrice(appointment.price)}
            </p>
            <Badge
              variant="outline"
              className={cn(STATUS_STYLES[appointment.status])}
            >
              {STATUS_LABELS[appointment.status]}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
};

export const ClientHistory = (props: ClientHistoryProps) => (
  <Card>
    <CardHeader>
      <CardTitle>История визитов</CardTitle>
      <CardDescription>Цена фиксируется на момент записи</CardDescription>
    </CardHeader>
    <CardContent>
      <ClientHistoryContent {...props} />
    </CardContent>
  </Card>
);
