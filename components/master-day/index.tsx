'use client';
import Link from 'next/link';
import { LuArrowLeft, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { useGetCompany } from '@/services/queries/companies';
import { useGetEmployee } from '@/services/queries/employees';
import dayjs from '@/lib/dayjs';
import {
  DATE_KEY_FORMAT,
  DEFAULT_TIMEZONE,
  getCompanyToday,
} from '@/utils/date';
import { MasterDayContent } from './master-day-content';
import type { MasterDayProps } from './master-day.types';

export const MasterDay = ({ companyId, employeeId, date }: MasterDayProps) => {
  const { data: company } = useGetCompany(companyId);
  const { data: employee } = useGetEmployee(employeeId);
  const timezone = company?.timezone || DEFAULT_TIMEZONE;
  const currentDate = date ?? getCompanyToday(timezone);
  const from = dayjs.tz(currentDate, timezone);

  const baseUrl = `/dashboard/${companyId}/employees/${employeeId}`;
  const dayHref = (days: number) =>
    `${baseUrl}/day?date=${from.add(days, 'day').format(DATE_KEY_FORMAT)}`;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href={baseUrl}>
          <LuArrowLeft className="size-4" />
          Профиль мастера
        </Link>
      </Button>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {employee ? `День · ${employee.name}` : 'День мастера'}
          </h1>
          <p className="text-muted-foreground first-letter:uppercase">
            {from.format('dddd, D MMMM')}
          </p>
        </div>
        <Button variant="outline" size="icon" asChild>
          <Link href={dayHref(-1)} aria-label="Предыдущий день">
            <LuChevronLeft className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link href={dayHref(1)} aria-label="Следующий день">
            <LuChevronRight className="size-4" />
          </Link>
        </Button>
      </div>

      <MasterDayContent
        companyId={companyId}
        employeeId={employeeId}
        timezone={timezone}
        from={from.format()}
        to={from.add(1, 'day').format()}
      />
    </div>
  );
};
