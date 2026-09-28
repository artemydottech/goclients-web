'use client';
import { Controller, useWatch } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TextareaField } from '@/components/shared/textarea-field';
import { SlotPicker } from '@/components/slot-picker';
import { useGetServiceEmployees } from '@/services/queries/services';
import { formatPhone, formatPrice } from '@/utils';
import { EntitySelect } from './entity-select';
import type { AppointmentFormFieldsProps } from './appointment-form.types';

const AppointmentFormFields = ({
  control,
  setValue,
  clients,
  services,
  timezone,
}: AppointmentFormFieldsProps) => {
  const [serviceId, employeeId, date] = useWatch({
    control,
    name: ['service_id', 'employee_id', 'date'],
  });
  const { data: serviceEmployees = [], isPending: isEmployeesPending } =
    useGetServiceEmployees(serviceId || null);

  const resetSlot = () => setValue('starts_at', '');

  return (
    <>
      <Controller
        control={control}
        name="client_id"
        render={({ field, fieldState }) => (
          <EntitySelect
            id="client_id"
            label="Клиент"
            placeholder="Выберите клиента"
            options={clients.map((client) => ({
              id: client.id,
              label: `${client.name} · ${formatPhone(client.phone)}`,
            }))}
            value={field.value}
            error={fieldState.error?.message}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="service_id"
        render={({ field, fieldState }) => (
          <EntitySelect
            id="service_id"
            label="Услуга"
            placeholder="Выберите услугу"
            options={services.map((service) => ({
              id: service.id,
              label: `${service.name} · ${formatPrice(service.price)}`,
            }))}
            value={field.value}
            error={fieldState.error?.message}
            onChange={(id) => {
              field.onChange(id);
              setValue('employee_id', 0);
              resetSlot();
            }}
          />
        )}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="employee_id"
          render={({ field, fieldState }) => (
            <EntitySelect
              id="employee_id"
              label="Мастер"
              placeholder={
                serviceId && !isEmployeesPending && !serviceEmployees.length
                  ? 'Никто не оказывает'
                  : 'Выберите мастера'
              }
              options={serviceEmployees.map((employee) => ({
                id: employee.id,
                label: `${employee.name} ${employee.surname}`.trim(),
              }))}
              value={field.value}
              error={fieldState.error?.message}
              disabled={!serviceId}
              onChange={(id) => {
                field.onChange(id);
                resetSlot();
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Label htmlFor="date">Дата</Label>
              <Input
                id="date"
                type="date"
                value={field.value}
                aria-invalid={Boolean(fieldState.error)}
                onChange={(event) => {
                  field.onChange(event.target.value);
                  resetSlot();
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
            <Label>Время</Label>
            <SlotPicker
              employeeId={employeeId || null}
              serviceId={serviceId || null}
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
      <TextareaField control={control} name="comment" label="Комментарий" />
      <Controller
        control={control}
        name="isConfirmed"
        render={({ field }) => (
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={field.value}
              onCheckedChange={(state) => field.onChange(state === true)}
            />
            Сразу подтвердить запись
          </label>
        )}
      />
    </>
  );
};

export default AppointmentFormFields;
