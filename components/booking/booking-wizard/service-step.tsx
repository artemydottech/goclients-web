'use client';
import { LuScissors } from 'react-icons/lu';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { EmptyState } from '@/components/shared/empty-state';
import { useGetServices } from '@/services/queries/services';
import { formatDuration, formatPrice } from '@/utils';
import { OptionCard } from './option-card';
import type { ServiceStepProps } from './booking-wizard.types';

export const ServiceStep = ({
  companyId,
  selectedId,
  onSelect,
}: ServiceStepProps) => {
  const { data: services, isPending, error } = useGetServices(companyId);

  if (isPending) return <Skeleton className="h-64 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  if (services.length === 0) {
    return (
      <EmptyState
        icon={LuScissors}
        title="Услуг пока нет"
        description="Салон ещё не заполнил прайс. Попробуйте позже или позвоните."
      />
    );
  }

  return (
    <ul className="space-y-3">
      {services.map((service) => (
        <li key={service.id}>
          <OptionCard
            isSelected={service.id === selectedId}
            onClick={() => onSelect(service)}
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium">{service.name}</p>
              {service.description && (
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              )}
              <p className="mt-1 text-sm text-muted-foreground">
                {formatDuration(service.duration)}
              </p>
            </div>
            <p className="shrink-0 font-semibold tabular-nums">
              {formatPrice(service.price)}
            </p>
          </OptionCard>
        </li>
      ))}
    </ul>
  );
};
