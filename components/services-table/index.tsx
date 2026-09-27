'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { ConfirmDeleteButton } from '@/components/shared/confirm-delete-button';
import { useGetServices } from '@/services/queries/services';
import { useDeleteService } from '@/services/mutations/services';
import { formatDuration, formatPrice } from '@/utils';
import type { ServicesTableProps } from './services-table.types';

export const ServicesTable = ({ companyId }: ServicesTableProps) => {
  const { data: services, isPending, error } = useGetServices(companyId);
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();

  if (isPending) return <Skeleton className="h-64 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  if (services.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Услуг пока нет
      </p>
    );
  }

  return (
    <Card className="py-0">
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Услуга</TableHead>
              <TableHead>Длительность</TableHead>
              <TableHead className="text-right">Цена</TableHead>
              <TableHead className="w-12 pr-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="pl-6">
                  <p className="font-medium">{service.name}</p>
                  {service.description && (
                    <p className="max-w-md truncate text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDuration(service.duration)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatPrice(service.price)}
                </TableCell>
                <TableCell className="pr-6">
                  <ConfirmDeleteButton
                    title={`Удалить «${service.name}»?`}
                    description="Услуга пропадёт из прайса и у мастеров. Будущие записи на неё тоже удалятся."
                    isPending={isDeleting}
                    onConfirm={() => deleteService(service.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
