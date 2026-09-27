import { EmployeeProfile } from '@/components/employee-profile';
import { EmployeeServices } from '@/components/employee-services';
import { EmployeeSchedule } from '@/components/employee-schedule';
import { EmployeeTimeOff } from '@/components/employee-time-off';

interface EmployeePageProps {
  params: Promise<{ companyId: string; employeeId: string }>;
}

export default async function EmployeePage({ params }: EmployeePageProps) {
  const { companyId, employeeId } = await params;
  const ids = { companyId: Number(companyId), employeeId: Number(employeeId) };

  return (
    <div className="space-y-6">
      <EmployeeProfile {...ids} />
      <div className="grid gap-6 xl:grid-cols-2">
        <EmployeeSchedule employeeId={ids.employeeId} />
        <div className="space-y-6">
          <EmployeeServices {...ids} />
          <EmployeeTimeOff {...ids} />
        </div>
      </div>
    </div>
  );
}
