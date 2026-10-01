'use client';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetCompany } from '@/services/queries/companies';
import { DEFAULT_TIMEZONE } from '@/utils/date';
import { CreateTimeOffDialog } from './create-time-off-dialog';
import { TimeOffList } from './time-off-list';
import type { EmployeeTimeOffProps } from './employee-time-off.types';

export const EmployeeTimeOff = ({
  companyId,
  employeeId,
}: EmployeeTimeOffProps) => {
  const { data: company } = useGetCompany(companyId);
  const timezone = company?.timezone || DEFAULT_TIMEZONE;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Отпуска и больничные</CardTitle>
        <CardDescription>Периоды, когда мастер не принимает</CardDescription>
        <CardAction>
          <CreateTimeOffDialog employeeId={employeeId} timezone={timezone} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <TimeOffList
          companyId={companyId}
          employeeId={employeeId}
          timezone={timezone}
        />
      </CardContent>
    </Card>
  );
};
