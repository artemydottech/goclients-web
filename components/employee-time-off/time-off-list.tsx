'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { ConfirmDeleteButton } from '@/components/shared/confirm-delete-button';
import { useGetEmployeeTimeOff } from '@/services/queries/time-off';
import { useDeleteTimeOff } from '@/services/mutations/time-off';
import { inCompanyTimezone } from '@/utils/date';
import type { TimeOffListProps } from './employee-time-off.types';

const DATE_FORMAT = 'D MMM YYYY';

export const TimeOffList = ({ employeeId, timezone }: TimeOffListProps) => {
  const { data: periods, isPending, error } = useGetEmployeeTimeOff(employeeId);
  const { mutate: deleteTimeOff, isPending: isDeleting } = useDeleteTimeOff();

  if (isPending) return <Skeleton className="h-24 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  if (periods.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Отпусков и больничных нет</p>
    );
  }

  return (
    <ul className="divide-y">
      {periods.map((period) => {
        const startsAt = inCompanyTimezone(period.starts_at, timezone);
        const lastDay = inCompanyTimezone(period.ends_at, timezone).subtract(
          1,
          'minute',
        );

        return (
          <li key={period.id} className="flex items-center gap-3 py-2">
            <div className="flex-1">
              <p className="text-sm font-medium">
                {startsAt.format(DATE_FORMAT)} — {lastDay.format(DATE_FORMAT)}
              </p>
              <p className="text-xs text-muted-foreground">{period.reason}</p>
            </div>
            <ConfirmDeleteButton
              title="Удалить период?"
              description="Мастер снова станет доступен для записи в эти дни."
              isPending={isDeleting}
              onConfirm={() => deleteTimeOff({ id: period.id, employeeId })}
            />
          </li>
        );
      })}
    </ul>
  );
};
