'use client';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ErrorText } from '@/components/shared/error-text';
import { EntitySelect } from '@/components/shared/entity-select';
import { SlotPicker } from '@/components/slot-picker';
import { useGetServiceEmployees } from '@/services/queries/services';
import { inCompanyTimezone } from '@/utils/date';
import {
  rescheduleFormSchema,
  type RescheduleFormValues,
} from './reschedule-form.validation';
import type { RescheduleFormProps } from './reschedule-form.types';

export const RescheduleForm = ({
  appointment,
  timezone,
  isPending,
  errorMessage,
  onSubmit,
  onCancel,
}: RescheduleFormProps) => {
  const { control, handleSubmit, setValue } = useForm<RescheduleFormValues>({
    resolver: zodResolver(rescheduleFormSchema),
    defaultValues: {
      employee_id: appointment.employee_id,
      date: inCompanyTimezone(appointment.starts_at, timezone).format(
        'YYYY-MM-DD',
      ),
      starts_at: '',
    },
  });
  const [employeeId, date] = useWatch({
    control,
    name: ['employee_id', 'date'],
  });
  const { data: employees = [] } = useGetServiceEmployees(
    appointment.service_id,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="employee_id"
          render={({ field, fieldState }) => (
            <EntitySelect
              id="reschedule_employee_id"
              label="Мастер"
              placeholder="Выберите мастера"
              options={employees.map((employee) => ({
                id: employee.id,
                label: `${employee.name} ${employee.surname}`.trim(),
              }))}
              value={field.value}
              error={fieldState.error?.message}
              onChange={(id) => {
                field.onChange(id);
                setValue('starts_at', '');
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <div className="grid gap-2">
              <Label htmlFor="reschedule_date">Дата</Label>
              <Input
                id="reschedule_date"
                type="date"
                value={field.value}
                onChange={(event) => {
                  field.onChange(event.target.value);
                  setValue('starts_at', '');
                }}
              />
            </div>
          )}
        />
      </div>
      <Controller
        control={control}
        name="starts_at"
        render={({ field, fieldState }) => (
          <div className="grid gap-2">
            <Label>Новое время</Label>
            <SlotPicker
              employeeId={employeeId}
              serviceId={appointment.service_id}
              date={date}
              timezone={timezone}
              value={field.value}
              onChange={field.onChange}
            />
            {fieldState.error && (
              <p className="text-xs text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Назад
        </Button>
        <Button type="submit" disabled={isPending}>
          Перенести
        </Button>
      </div>
    </form>
  );
};
