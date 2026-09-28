'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { useGetCompany } from '@/services/queries/companies';
import { useGetCompanyAppointments } from '@/services/queries/appointments';
import { useCompanyDirectory } from '@/hooks/use-company-directory';
import dayjs from '@/lib/dayjs';
import { DEFAULT_TIMEZONE } from '@/utils/date';
import { CalendarToolbar } from './calendar-toolbar';
import { DayView } from './day-view';
import { DATE_PARAM_FORMAT } from './appointments-calendar.constants';
import type { AppointmentsCalendarProps } from './appointments-calendar.types';

export const AppointmentsCalendar = ({
  companyId,
  date,
}: AppointmentsCalendarProps) => {
  const { data: company } = useGetCompany(companyId);
  const timezone = company?.timezone || DEFAULT_TIMEZONE;
  const today = dayjs().tz(timezone).format(DATE_PARAM_FORMAT);
  const currentDate = date ?? today;
  const from = dayjs.tz(currentDate, timezone);
  const to = from.add(1, 'day');

  const directory = useCompanyDirectory(companyId);
  const {
    data: appointments,
    isPending,
    error,
  } = useGetCompanyAppointments(companyId, from.format(), to.format());

  const renderContent = () => {
    if (isPending || directory.isPending) {
      return <Skeleton className="h-[32rem] w-full" />;
    }
    if (error) return <ErrorText errorMessage={error.message} />;
    if (directory.error) {
      return <ErrorText errorMessage={directory.error.message} />;
    }
    return (
      <DayView
        appointments={appointments}
        directory={directory}
        timezone={timezone}
      />
    );
  };

  return (
    <div className="space-y-4">
      <CalendarToolbar companyId={companyId} date={currentDate} today={today} />
      {renderContent()}
    </div>
  );
};
