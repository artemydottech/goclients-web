import { PageHeader } from '@/components/shared/page-header';
import { AppointmentsCalendar } from '@/components/appointments-calendar';
import { CreateAppointmentDialog } from '@/components/create-appointment-dialog';

const DATE_PARAM_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

interface AppointmentsPageProps {
  params: Promise<{ companyId: string }>;
  searchParams: Promise<{ date?: string; view?: string }>;
}

export default async function AppointmentsPage({
  params,
  searchParams,
}: AppointmentsPageProps) {
  const { companyId } = await params;
  const { date, view } = await searchParams;
  const validDate = date && DATE_PARAM_PATTERN.test(date) ? date : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Записи"
        description="Календарь мастеров"
        action={
          <CreateAppointmentDialog
            companyId={Number(companyId)}
            date={validDate}
          />
        }
      />
      <AppointmentsCalendar
        companyId={Number(companyId)}
        date={validDate}
        view={view === 'week' ? 'week' : 'day'}
      />
    </div>
  );
}
