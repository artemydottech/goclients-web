import { PageHeader } from '@/components/shared/page-header';
import { EmployeesList } from '@/components/employees-list';
import { CreateEmployeeDialog } from '@/components/create-employee-dialog';

interface EmployeesPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function EmployeesPage({ params }: EmployeesPageProps) {
  const { companyId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Сотрудники"
        description="Мастера и администраторы"
        action={<CreateEmployeeDialog companyId={Number(companyId)} />}
      />
      <EmployeesList companyId={Number(companyId)} />
    </div>
  );
}
