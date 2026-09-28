'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import dayjs from '@/lib/dayjs';
import { inCompanyTimezone } from '@/utils/date';
import { STATUS_STYLES } from '@/utils/appointments';
import { DATE_PARAM_FORMAT } from './appointments-calendar.constants';
import type { WeekViewProps } from './appointments-calendar.types';

const DAYS_IN_WEEK = 7;

export const WeekView = ({
  companyId,
  weekStart,
  today,
  appointments,
  directory,
  timezone,
  onSelect,
}: WeekViewProps) => {
  const days = Array.from({ length: DAYS_IN_WEEK }, (_, index) =>
    dayjs(weekStart).add(index, 'day').format(DATE_PARAM_FORMAT),
  );
  const sorted = [...appointments].sort(
    (left, right) => Date.parse(left.starts_at) - Date.parse(right.starts_at),
  );

  return (
    <div className="grid gap-3 md:grid-cols-7">
      {days.map((day) => {
        const dayAppointments = sorted.filter(
          (appointment) =>
            inCompanyTimezone(appointment.starts_at, timezone).format(
              DATE_PARAM_FORMAT,
            ) === day,
        );

        return (
          <section
            key={day}
            className={cn(
              'flex min-h-40 flex-col gap-2 rounded-xl border bg-card p-2',
              day === today && 'border-primary',
            )}
          >
            <Link
              href={`/dashboard/${companyId}/appointments?date=${day}`}
              className="px-1 text-sm font-medium first-letter:uppercase hover:underline"
            >
              {dayjs(day).format('dd, D MMM')}
            </Link>
            {dayAppointments.length === 0 && (
              <p className="px-1 text-xs text-muted-foreground">Нет записей</p>
            )}
            {dayAppointments.map((appointment) => {
              const client = directory.clientsById.get(appointment.client_id);
              const employee = directory.employeesById.get(
                appointment.employee_id,
              );
              return (
                <button
                  type="button"
                  key={appointment.id}
                  onClick={() => onSelect(appointment.id)}
                  className={cn(
                    'cursor-pointer rounded-md border px-2 py-1 text-left text-xs transition-shadow hover:shadow-md',
                    STATUS_STYLES[appointment.status],
                  )}
                >
                  <p className="font-medium tabular-nums">
                    {inCompanyTimezone(appointment.starts_at, timezone).format(
                      'HH:mm',
                    )}{' '}
                    · {client?.name ?? 'Клиент'}
                  </p>
                  <p className="truncate opacity-80">{employee?.name}</p>
                </button>
              );
            })}
          </section>
        );
      })}
    </div>
  );
};
