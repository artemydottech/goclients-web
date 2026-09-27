'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { ScheduleForm } from '@/forms/schedule-form';
import { useGetEmployeeSchedule } from '@/services/queries/schedule';
import { useUpdateEmployeeSchedule } from '@/services/mutations/schedule';
import type { EmployeeScheduleProps } from './employee-schedule.types';

const EmployeeScheduleContent = ({ employeeId }: EmployeeScheduleProps) => {
  const {
    data: schedule,
    isPending,
    error,
  } = useGetEmployeeSchedule(employeeId);
  const updateSchedule = useUpdateEmployeeSchedule();

  if (isPending) return <Skeleton className="h-72 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  return (
    <ScheduleForm
      key={dataUpdatedAt}
      schedule={schedule}
      isPending={updateSchedule.isPending}
      errorMessage={updateSchedule.error?.message}
      onSubmit={(days) => updateSchedule.mutate({ employeeId, days })}
    />
  );
};

export const EmployeeSchedule = (props: EmployeeScheduleProps) => (
  <Card>
    <CardHeader>
      <CardTitle>График работы</CardTitle>
      <CardDescription>
        Время указывается в часовом поясе компании
      </CardDescription>
    </CardHeader>
    <CardContent>
      <EmployeeScheduleContent {...props} />
    </CardContent>
  </Card>
);
