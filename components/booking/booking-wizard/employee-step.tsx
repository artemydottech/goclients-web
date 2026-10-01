'use client';
import { LuArrowLeft, LuUsers } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { EmptyState } from '@/components/shared/empty-state';
import { useGetServiceEmployees } from '@/services/queries/services';
import { getInitials } from '@/utils';
import { OptionCard } from './option-card';
import type { EmployeeStepProps } from './booking-wizard.types';

export const EmployeeStep = ({
  serviceId,
  selectedId,
  onSelect,
  onBack,
}: EmployeeStepProps) => {
  const {
    data: employees,
    isPending,
    error,
  } = useGetServiceEmployees(serviceId);

  const backButton = (
    <Button variant="ghost" size="sm" className="-ml-2" onClick={onBack}>
      <LuArrowLeft className="size-4" />
      Другая услуга
    </Button>
  );

  if (isPending) return <Skeleton className="h-48 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  if (employees.length === 0) {
    return (
      <div className="space-y-4">
        {backButton}
        <EmptyState
          icon={LuUsers}
          title="Эту услугу сейчас никто не оказывает"
          description="Выберите другую услугу или свяжитесь с салоном."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {backButton}
      <ul className="grid gap-3 sm:grid-cols-2">
        {employees.map((employee) => {
          const fullName = `${employee.name} ${employee.surname}`.trim();
          return (
            <li key={employee.id}>
              <OptionCard
                isSelected={employee.id === selectedId}
                onClick={() => onSelect(employee)}
              >
                <Avatar className="size-12">
                  <AvatarImage src={employee.avatar} alt={fullName} />
                  <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-medium">{fullName}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {employee.position || 'Мастер'}
                  </p>
                </div>
              </OptionCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
