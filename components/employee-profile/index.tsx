'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LuArrowLeft, LuCalendarDays } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { ConfirmDeleteButton } from '@/components/shared/confirm-delete-button';
import { useGetEmployee } from '@/services/queries/employees';
import { useDeleteEmployee } from '@/services/mutations/employees';
import { getInitials } from '@/utils';
import type { EmployeeProfileProps } from './employee-profile.types';

export const EmployeeProfile = ({
  companyId,
  employeeId,
}: EmployeeProfileProps) => {
  const router = useRouter();
  const { data: employee, isPending, error } = useGetEmployee(employeeId);
  const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee();
  const listUrl = `/dashboard/${companyId}/employees`;

  if (isPending) return <Skeleton className="h-20 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  const fullName = `${employee.name} ${employee.surname}`.trim();

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href={listUrl}>
          <LuArrowLeft className="size-4" />
          Все сотрудники
        </Link>
      </Button>
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={employee.avatar} alt={fullName} />
          <AvatarFallback className="text-lg">
            {getInitials(fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold tracking-tight">
            {fullName}
          </h1>
          <p className="text-muted-foreground">
            {employee.position || 'Мастер'}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href={`${listUrl}/${employeeId}/day`}>
            <LuCalendarDays className="size-4" />
            Мой день
          </Link>
        </Button>
        <ConfirmDeleteButton
          title={`Удалить сотрудника ${fullName}?`}
          description="Вместе с ним удалятся график, отпуска и его записи."
          isPending={isDeleting}
          onConfirm={() =>
            deleteEmployee(employeeId, {
              onSuccess: () => router.push(listUrl),
            })
          }
        />
      </div>
    </div>
  );
};
