'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { useGetClientStats } from '@/services/queries/clients';
import dayjs from '@/lib/dayjs';
import { formatPrice } from '@/utils';
import { StatTile } from './stat-tile';
import type { ClientStatsProps } from './client-stats.types';

const DATE_FORMAT = 'D MMM, HH:mm';

const formatVisit = (value: Nullable<string>): string =>
  value ? dayjs(value).format(DATE_FORMAT) : '—';

export const ClientStats = ({ clientId }: ClientStatsProps) => {
  const { data: stats, isPending, error } = useGetClientStats(clientId);

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-24 w-full" />
        ))}
      </div>
    );
  }
  if (error) return <ErrorText errorMessage={error.message} />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile
        label="Сумма визитов"
        value={formatPrice(stats.total_spent)}
        hint="По завершённым визитам"
      />
      <StatTile
        label="Визитов"
        value={String(stats.completed_visits)}
        hint={`Всего записей: ${stats.appointments}`}
      />
      <StatTile
        label="Неявки"
        value={String(stats.no_shows)}
        hint={`Отменено: ${stats.cancelled}`}
      />
      <StatTile
        label="Следующий визит"
        value={formatVisit(stats.next_visit_at)}
        hint={`Прошлый: ${formatVisit(stats.last_visit_at)}`}
      />
    </div>
  );
};
