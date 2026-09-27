'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { useGetEmployees } from '@/services/queries/employees';
import { getInitials } from '@/utils';
import type { EmployeesListProps } from './employees-list.types';

const SKELETON_COUNT = 6;

export const EmployeesList = ({ companyId }: EmployeesListProps) => {
  const { data: employees, isPending, error } = useGetEmployees(companyId);

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
          <Skeleton key={idx} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (error) return <ErrorText errorMessage={error.message} />;

  if (employees.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Сотрудников пока нет
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {employees.map((employee) => {
        const fullName = `${employee.name} ${employee.surname}`.trim();

        return (
          <li key={employee.id}>
            <Link href={`/dashboard/${companyId}/employees/${employee.id}`}>
              <Card className="py-4 transition-colors hover:bg-muted/50">
                <CardContent className="flex items-center gap-3">
                  <Avatar className="size-11">
                    <AvatarImage src={employee.avatar} alt={fullName} />
                    <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{fullName}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {employee.position || 'Мастер'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
