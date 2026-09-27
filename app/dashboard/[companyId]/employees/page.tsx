import { PageHeader } from '@/components/shared/page-header';
import { EmployeesList } from '@/components/employees-list';

interface EmployeesPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function EmployeesPage({ params }: EmployeesPageProps) {
  const { companyId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader title="Сотрудники" description="Мастера и администраторы" />
      <EmployeesList companyId={Number(companyId)} />
    </div>
  );
}
