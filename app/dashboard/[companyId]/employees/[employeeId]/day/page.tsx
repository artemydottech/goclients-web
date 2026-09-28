import { MasterDay } from '@/components/master-day';

const DATE_PARAM_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

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
      companyId={Number(companyId)}
      employeeId={Number(employeeId)}
      date={date && DATE_PARAM_PATTERN.test(date) ? date : null}
    />
  );
}
