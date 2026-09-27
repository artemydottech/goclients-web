'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { useGetServices } from '@/services/queries/services';
import { useGetEmployeeServices } from '@/services/queries/employees';
import { EmployeeServicesForm } from './employee-services-form';
import type { EmployeeServicesProps } from './employee-services.types';

const EmployeeServicesContent = ({
  companyId,
  employeeId,
}: EmployeeServicesProps) => {
  const servicesQuery = useGetServices(companyId);
  const employeeServicesQuery = useGetEmployeeServices(employeeId);

  if (servicesQuery.isPending || employeeServicesQuery.isPending) {
    return <Skeleton className="h-40 w-full" />;
  }
  if (servicesQuery.error) {
    return <ErrorText errorMessage={servicesQuery.error.message} />;
  }
  if (employeeServicesQuery.error) {
    return <ErrorText errorMessage={employeeServicesQuery.error.message} />;
  }

  if (servicesQuery.data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">В компании ещё нет услуг</p>
    );
  }

  return (
    <EmployeeServicesForm
      employeeId={employeeId}
      services={servicesQuery.data}
      initialServiceIds={employeeServicesQuery.data.map(({ id }) => id)}
    />
  );
};

export const EmployeeServices = (props: EmployeeServicesProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Услуги</CardTitle>
      <CardDescription>
        Что мастер делает и на что к нему записывать
      </CardDescription>
    </CardHeader>
    <CardContent>
      <EmployeeServicesContent {...props} />
    </CardContent>
  </Card>
);
