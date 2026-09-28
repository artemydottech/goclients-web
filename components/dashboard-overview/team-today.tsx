'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import dayjs from '@/lib/dayjs';
import { getInitials } from '@/utils';
import { inCompanyTimezone } from '@/utils/date';
import { isActiveAppointment } from '@/utils/appointments';
import type { OverviewSectionProps } from './dashboard-overview.types';

export const TeamToday = ({
  companyId,
  appointments,
  directory,
  timezone,
}: OverviewSectionProps) => {
  const today = dayjs().tz(timezone).format('YYYY-MM-DD');
  const todayAppointments = appointments.filter(
    (appointment) =>
      isActiveAppointment(appointment) &&
      inCompanyTimezone(appointment.starts_at, timezone).format(
        'YYYY-MM-DD',
      ) === today,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Команда сегодня</CardTitle>
        <CardDescription>Сколько записей у каждого мастера</CardDescription>
      </CardHeader>
      <CardContent>
        {directory.employees.length === 0 ? (
          <p className="text-sm text-muted-foreground">Сотрудников пока нет</p>
        ) : (
          <ul className="space-y-4">
            {directory.employees.map((employee) => {
              const fullName = `${employee.name} ${employee.surname}`.trim();
              const count = todayAppointments.filter(
                (appointment) => appointment.employee_id === employee.id,
              ).length;
              return (
                <li key={employee.id}>
                  <Link
                    href={`/dashboard/${companyId}/employees/${employee.id}/day`}
                    className="flex items-center gap-3 rounded-lg hover:bg-muted/50"
                  >
                    <Avatar>
                      <AvatarImage src={employee.avatar} alt={fullName} />
                      <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{fullName}</p>
                      <p className="truncate text-sm text-muted-foreground">
                        {employee.position || 'Мастер'}
                      </p>
                    </div>
                    <Badge variant={count ? 'secondary' : 'outline'}>
                      {count ? `Записей: ${count}` : 'Нет записей'}
                    </Badge>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
