'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ErrorText } from '@/components/shared/error-text';
import { useUpdateEmployeeServices } from '@/services/mutations/employees';
import { formatDuration, formatPrice } from '@/utils';
import type { EmployeeServicesFormProps } from './employee-services.types';

const isSameSelection = (left: Set<number>, right: Set<number>): boolean =>
  left.size === right.size && [...left].every((id) => right.has(id));

export const EmployeeServicesForm = ({
  employeeId,
  services,
  initialServiceIds,
}: EmployeeServicesFormProps) => {
  const [saved, setSaved] = useState(() => new Set(initialServiceIds));
  const [selected, setSelected] = useState(() => new Set(initialServiceIds));
  const { mutate, isPending, error } = useUpdateEmployeeServices();

  const toggle = (serviceId: number, isChecked: boolean) =>
    setSelected((current) => {
      const next = new Set(current);
      if (isChecked) next.add(serviceId);
      else next.delete(serviceId);
      return next;
    });

  const handleSave = () =>
    mutate(
      { employeeId, serviceIds: [...selected] },
      { onSuccess: () => setSaved(new Set(selected)) },
    );

  return (
    <div className="space-y-4">
      <ul className="divide-y">
        {services.map((service) => (
          <li key={service.id}>
            <label className="flex cursor-pointer items-center gap-3 py-3">
              <Checkbox
                checked={selected.has(service.id)}
                onCheckedChange={(state) => toggle(service.id, state === true)}
              />
              <span className="flex-1 text-sm font-medium">{service.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatDuration(service.duration)} ·{' '}
                {formatPrice(service.price)}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {error && <ErrorText errorMessage={error.message} />}
      <Button
        onClick={handleSave}
        disabled={isPending || isSameSelection(saved, selected)}
      >
        Сохранить услуги
      </Button>
    </div>
  );
};
