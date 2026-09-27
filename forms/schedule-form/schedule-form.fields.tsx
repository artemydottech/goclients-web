'use client';
import { Controller, useWatch } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { WEEKDAY_ORDER, WEEKDAY_SHORT_NAMES } from './schedule-form.constants';
import type { ScheduleFormFieldsProps } from './schedule-form.types';

const ScheduleFormFields = ({
  control,
  register,
  errors,
}: ScheduleFormFieldsProps) => {
  const days = useWatch({ control, name: 'days' });

  return (
    <ul className="divide-y">
      {WEEKDAY_ORDER.map((weekday, index) => {
        const day = days[index];
        const dayErrors = errors.days?.[index];
        const errorMessage =
          dayErrors?.ends_at?.message ??
          dayErrors?.break_ends_at?.message ??
          dayErrors?.break_starts_at?.message;

        return (
          <li key={weekday} className="space-y-2 py-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <label className="flex w-20 items-center gap-2 text-sm font-medium">
                <Controller
                  control={control}
                  name={`days.${index}.isWorking`}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                {WEEKDAY_SHORT_NAMES[weekday]}
              </label>

              {day.isWorking ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="time"
                      className="w-28"
                      aria-label="Начало дня"
                      {...register(`days.${index}.starts_at`)}
                    />
                    <span className="text-muted-foreground">–</span>
                    <Input
                      type="time"
                      className="w-28"
                      aria-label="Конец дня"
                      {...register(`days.${index}.ends_at`)}
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Controller
                      control={control}
                      name={`days.${index}.hasBreak`}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    Перерыв
                  </label>
                  {day.hasBreak && (
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="time"
                        className="w-28"
                        aria-label="Начало перерыва"
                        {...register(`days.${index}.break_starts_at`)}
                      />
                      <span className="text-muted-foreground">–</span>
                      <Input
                        type="time"
                        className="w-28"
                        aria-label="Конец перерыва"
                        {...register(`days.${index}.break_ends_at`)}
                      />
                    </div>
                  )}
                </>
              ) : (
                <span className="text-sm text-muted-foreground">Выходной</span>
              )}
            </div>
            {errorMessage && (
              <p className="text-xs text-destructive">{errorMessage}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ScheduleFormFields;
