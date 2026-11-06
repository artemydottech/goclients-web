'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { PageHeader } from '@/components/shared/page-header';
import { CreateAppointmentDialog } from '@/components/create-appointment-dialog';
import { useGetCompany } from '@/services/queries/companies';
import { useGetCompanyAppointments } from '@/services/queries/appointments';
import { useCompanyDirectory } from '@/hooks/use-company-directory';
import dayjs from '@/lib/dayjs';
import { DEFAULT_TIMEZONE } from '@/utils/date';
import {ReportCards} from './report-cards';
import { UpcomingList } from './upcoming-list';
import { PopularServices } from './popular-services';
import { TeamToday } from './team-today';
import type { DashboardOverviewProps } from './dashboard-overview.types';

const HISTORY_DAYS = 30;
const LOOKAHEAD_DAYS = 14;

export const DashboardOverview = ({ companyId }: DashboardOverviewProps) => {
  const { data: company } = useGetCompany(companyId);
  const timezone = company?.timezone || DEFAULT_TIMEZONE;
  const todayStart = dayjs().tz(timezone).startOf('day');
  const directory = useCompanyDirectory(companyId);
  const {
    data: appointments,
    isPending,
    error,
  } = useGetCompanyAppointments(
    companyId,
    todayStart.subtract(HISTORY_DAYS, 'day').format(),
    todayStart.add(LOOKAHEAD_DAYS, 'day').format(),
  );

  const header = (
    <PageHeader
      title="Обзор"
      description={`${company?.name ?? ''} · ${todayStart.format('D MMMM YYYY')}`}
      action={<CreateAppointmentDialog companyId={companyId} date={null} />}
    />
  );

  if (isPending || directory.isPending) {
    return (
      <div className="space-y-6">
        {header}
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }
  if (error) return <ErrorText errorMessage={error.message} />;
  if (directory.error)
    return <ErrorText errorMessage={directory.error.message} />;

  const sectionProps = { companyId, appointments, directory, timezone };

  return (
    <div className="space-y-6">
      {header}
      <ReportCards companyId={companyId} timezone={timezone}/>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <UpcomingList {...sectionProps} />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <TeamToday {...sectionProps} />
          <PopularServices {...sectionProps} />
        </div>
      </div>
    </div>
  );
};
