'use client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { useGetSlots } from '@/services/queries/slots';
import { inCompanyTimezone } from '@/utils/date';
import { SLOT_STEP_MINUTES } from './slot-picker.constants';
import type { SlotPickerProps } from './slot-picker.types';

export const SlotPicker = ({
  employeeId,
  serviceId,
  date,
  timezone,
  value,
  onChange,
}: SlotPickerProps) => {
  const params =
    employeeId && serviceId && date
      ? {
          employee_id: employeeId,
          service_id: serviceId,
          date,
          step: SLOT_STEP_MINUTES,
        }
      : null;
  const { data: slots, isPending, error } = useGetSlots(params);

  if (!params) {
    return (
      <p className="text-sm text-muted-foreground">
        Выберите услугу, мастера и дату
      </p>
    );
  }
  if (isPending) return <Skeleton className="h-24 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  if (slots.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        На этот день свободного времени нет
      </p>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Свободное время"
      className="grid max-h-48 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6"
    >
      {slots.map((slot) => (
        <Button
          key={slot}
          type="button"
          role="radio"
          aria-checked={slot === value}
          size="sm"
          variant={slot === value ? 'default' : 'outline'}
          className="tabular-nums"
          onClick={() => onChange(slot)}
        >
          {inCompanyTimezone(slot, timezone).format('HH:mm')}
        </Button>
      ))}
    </div>
  );
};
