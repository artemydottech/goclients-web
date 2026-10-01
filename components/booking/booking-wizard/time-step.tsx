'use client';
import { LuArrowLeft } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { SlotPicker } from '@/components/slot-picker';
import { SLOT_STEP_MINUTES } from '@/components/slot-picker/slot-picker.constants';
import { useGetSlotsByDates } from '@/services/queries/slots';
import dayjs from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { DATE_KEY_FORMAT, getCompanyToday } from '@/utils/date';
import type { TimeStepProps } from './booking-wizard.types';

const DAYS_AHEAD = 14;

export const TimeStep = ({
  serviceId,
  employeeId,
  timezone,
  date,
  slot,
  onDateChange,
  onSlotChange,
  onBack,
  onNext,
}: TimeStepProps) => {
  const today = getCompanyToday(timezone);
  const days = Array.from({ length: DAYS_AHEAD }, (_, index) =>
    dayjs(today).add(index, 'day'),
  );
  const availability = useGetSlotsByDates(
    { employee_id: employeeId, service_id: serviceId, step: SLOT_STEP_MINUTES },
    days.map((day) => day.format(DATE_KEY_FORMAT)),
  );
  const nearestDate = [...availability.entries()].find(
    ([, hasSlots]) => hasSlots,
  )?.[0];
  const showNearest =
    availability.get(date) === false && nearestDate && nearestDate !== date;

  return (
    <div className="space-y-5">
      <Button variant="ghost" size="sm" className="-ml-2" onClick={onBack}>
        <LuArrowLeft className="size-4" />
        Другой мастер
      </Button>
      <div
        role="radiogroup"
        aria-label="День"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
      >
        {days.map((day) => {
          const value = day.format(DATE_KEY_FORMAT);
          const isSelected = value === date;
          const isUnavailable = availability.get(value) === false;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isUnavailable}
              onClick={() => onDateChange(value)}
              className={cn(
                'flex w-14 shrink-0 flex-col items-center rounded-xl border py-2 text-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isUnavailable && !isSelected && 'opacity-40',
                isSelected &&
                  'border-primary bg-primary text-primary-foreground hover:bg-primary',
              )}
            >
              <span className="text-xs uppercase opacity-70">
                {day.format('dd')}
              </span>
              <span className="text-lg font-semibold tabular-nums">
                {day.format('D')}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-sm font-medium first-letter:uppercase">
        {dayjs(date).format('dddd, D MMMM')}
      </p>
      {showNearest && (
        <Button variant="secondary" onClick={() => onDateChange(nearestDate)}>
          Ближайшее свободное —{' '}
          <span className="first-letter:uppercase">
            {dayjs(nearestDate).format('dd, D MMMM')}
          </span>
        </Button>
      )}
      <SlotPicker
        employeeId={employeeId}
        serviceId={serviceId}
        date={date}
        timezone={timezone}
        value={slot}
        onChange={onSlotChange}
      />
      <Button size="lg" disabled={!slot} onClick={onNext}>
        Продолжить
      </Button>
    </div>
  );
};
