'use client';
import { CsvExportButton } from '@/components/shared/csv-export-button';
import { useGetCompanyReport } from '@/services/queries/reports';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { formatPrice } from '@/utils';
import { getReportPeriods } from './report-periods';
import { MetricCard } from './metric-card';
export const ReportCards = ({
  companyId,
  timezone,
}: {
  companyId: number;
  timezone: string;
}) => {
  const periods = getReportPeriods(timezone);
  const daily = useGetCompanyReport(
    companyId,
    periods.daily.from,
    periods.daily.to,
  );
  const weekly = useGetCompanyReport(
    companyId,
    periods.weekly.from,
    periods.weekly.to,
  );
  const upcoming = useGetCompanyReport(
    companyId,
    periods.upcoming.from,
    periods.upcoming.to,
  );
  const error = daily.error ?? weekly.error ?? upcoming.error;
  if (error) return <ErrorText errorMessage={error.message} />;
  if (!daily.data || !weekly.data || !upcoming.data)
    return <Skeleton className="h-32 w-full" />;
  return (
    <div className="space-y-3">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Записей сегодня"
          value={String(daily.data.summary.active)}
          hint="Активные записи"
        />
        <MetricCard
          label="Ожидаемая выручка сегодня"
          value={formatPrice(daily.data.summary.expected_revenue)}
          hint="По ценам на момент записи"
        />
        <MetricCard
          label="Выручка за 7 дней"
          value={formatPrice(weekly.data.summary.revenue)}
          hint={`Завершённых визитов: ${weekly.data.summary.completed}`}
        />
        <MetricCard
          label="Впереди записей"
          value={String(upcoming.data.summary.active)}
          hint="Сегодня и ближайшие 14 дней"
        />
      </div>
      <CsvExportButton
        path={`/companies/${companyId}/report/export`}
        params={{ from: periods.weekly.from, to: periods.weekly.to }}
        filename="report.csv"
      />
    </div>
  );
};
