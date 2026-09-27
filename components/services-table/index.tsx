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
import { useGetServices } from '@/services/queries/services';
import { formatDuration, formatPrice } from '@/utils';
import type { ServicesTableProps } from './services-table.types';

export const ServicesTable = ({ companyId }: ServicesTableProps) => {
  const { data: services, isPending, error } = useGetServices(companyId);

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
              <TableHead className="pr-6 text-right">Цена</TableHead>
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
                <TableCell className="pr-6 text-right tabular-nums">
                  {formatPrice(service.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
