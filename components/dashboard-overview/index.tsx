'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { PageHeader } from '@/components/shared/page-header';
import { CreateAppointmentDialog } from '@/components/create-appointment-dialog';
import { useGetCompany } from '@/services/queries/companies';
import { useGetCompanyAppointments } from '@/services/queries/appointments';
import { useCompanyDirectory } from '@/hooks/use-company-directory';
import dayjs from '@/lib/dayjs';
import { formatPrice } from '@/utils';
import { DEFAULT_TIMEZONE, inCompanyTimezone } from '@/utils/date';
import { isActiveAppointment } from '@/utils/appointments';
import { MetricCard } from './metric-card';
import { UpcomingList } from './upcoming-list';
import { PopularServices } from './popular-services';
import { TeamToday } from './team-today';
import type { DashboardOverviewProps } from './dashboard-overview.types';

const HISTORY_DAYS = 30;
const LOOKAHEAD_DAYS = 14;
const WEEK_DAYS = 7;

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

  const todayKey = todayStart.format('YYYY-MM-DD');
  const today = appointments.filter(
    (appointment) =>
      inCompanyTimezone(appointment.starts_at, timezone).format(
        'YYYY-MM-DD',
      ) === todayKey,
  );
  const weekAgo = todayStart.subtract(WEEK_DAYS, 'day').valueOf();
  const completedWeek = appointments.filter(
    (appointment) =>
      appointment.status === 'completed' &&
      Date.parse(appointment.starts_at) >= weekAgo,
  );
  const upcomingCount = appointments.filter(
    (appointment) =>
      isActiveAppointment(appointment) &&
      Date.parse(appointment.starts_at) >= todayStart.valueOf(),
  ).length;
  const sum = (items: typeof appointments) =>
    items.reduce((total, appointment) => total + appointment.price, 0);
  const sectionProps = { companyId, appointments, directory, timezone };

  return (
    <div className="space-y-6">
      {header}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Записей сегодня"
          value={String(today.filter(isActiveAppointment).length)}
          hint={`Ожидают подтверждения: ${today.filter(({ status }) => status === 'pending').length}`}
        />
        <MetricCard
          label="Ожидаемая выручка сегодня"
          value={formatPrice(sum(today.filter(isActiveAppointment)))}
          hint="По ценам на момент записи"
        />
        <MetricCard
          label="Выручка за 7 дней"
          value={formatPrice(sum(completedWeek))}
          hint={`Завершённых визитов: ${completedWeek.length}`}
        />
        <MetricCard
          label="Впереди записей"
          value={String(upcomingCount)}
          hint={`Клиентов в базе: ${directory.clientsById.size}`}
        />
      </div>
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
