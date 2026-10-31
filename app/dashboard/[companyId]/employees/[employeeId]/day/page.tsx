import { requireRouteId } from '@/lib/route-id';
import { parseDateParam } from '@/utils/date';
import { MasterDay } from '@/components/master-day';

interface MasterDayPageProps {
  params: Promise<{ companyId: string; employeeId: string }>;
  searchParams: Promise<{ date?: string }>;
}

export default async function MasterDayPage({
  params,
  searchParams,
}: MasterDayPageProps) {
  const { companyId, employeeId } = await params;
  const { date } = await searchParams;

  return (
    <MasterDay
      companyId={requireRouteId(companyId)}
      employeeId={requireRouteId(employeeId)}
      date={parseDateParam(date)}
    />
  );
}
