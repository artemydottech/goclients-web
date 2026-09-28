'use client';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { useGetCompany } from '@/services/queries/companies';
import { useGetCompanyAppointments } from '@/services/queries/appointments';
import { useCompanyDirectory } from '@/hooks/use-company-directory';
import dayjs from '@/lib/dayjs';
import { DEFAULT_TIMEZONE, getCompanyToday } from '@/utils/date';
import { AppointmentDetails } from '@/components/appointment-details';
import { CalendarToolbar } from './calendar-toolbar';
import { DayView } from './day-view';
import { WeekView } from './week-view';
import { getWeekStart } from './appointments-calendar.utils';
import type { AppointmentsCalendarProps } from './appointments-calendar.types';

export const AppointmentsCalendar = ({
  companyId,
  date,
  view,
}: AppointmentsCalendarProps) => {
  const [selectedId, setSelectedId] = useState<Nullable<number>>(null);
  const { data: company } = useGetCompany(companyId);
  const timezone = company?.timezone || DEFAULT_TIMEZONE;
  const today = getCompanyToday(timezone);
  const currentDate = date ?? today;
  const weekStart = getWeekStart(currentDate);
  const from = dayjs.tz(view === 'day' ? currentDate : weekStart, timezone);
  const to = from.add(view === 'day' ? 1 : 7, 'day');

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
    if (view === 'week') {
      return (
        <WeekView
          companyId={companyId}
          weekStart={weekStart}
          today={today}
          appointments={appointments}
          directory={directory}
          timezone={timezone}
          onSelect={setSelectedId}
        />
      );
    }
    return (
      <DayView
        appointments={appointments}
        directory={directory}
        timezone={timezone}
        onSelect={setSelectedId}
      />
    );
  };

  return (
    <div className="space-y-4">
      <CalendarToolbar
        companyId={companyId}
        date={currentDate}
        today={today}
        view={view}
      />
      {renderContent()}
      <AppointmentDetails
        companyId={companyId}
        appointment={appointments?.find(({ id }) => id === selectedId) ?? null}
        directory={directory}
        timezone={timezone}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
};
