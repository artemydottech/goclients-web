'use client';
import { cn } from '@/lib/utils';
import { inCompanyTimezone } from '@/utils/date';
import { STATUS_STYLES } from '@/utils/appointments';
import {
  DAY_START_HOUR,
  HOUR_HEIGHT_PX,
  MINUTES_IN_HOUR,
} from './appointments-calendar.constants';
import type { AppointmentBlockProps } from './appointments-calendar.types';

const MIN_BLOCK_HEIGHT_PX = 28;

export const AppointmentBlock = ({
  appointment,
  directory,
  timezone,
}: AppointmentBlockProps) => {
  const startsAt = inCompanyTimezone(appointment.starts_at, timezone);
  const endsAt = inCompanyTimezone(appointment.ends_at, timezone);
  const startMinutes =
    (startsAt.hour() - DAY_START_HOUR) * MINUTES_IN_HOUR + startsAt.minute();
  const duration = endsAt.diff(startsAt, 'minute');
  const client = directory.clientsById.get(appointment.client_id);
  const service = directory.servicesById.get(appointment.service_id);

  return (
    <div
      className={cn(
        'absolute inset-x-1 overflow-hidden rounded-md border px-2 py-1 text-left text-xs',
        STATUS_STYLES[appointment.status],
      )}
      style={{
        top: (startMinutes / MINUTES_IN_HOUR) * HOUR_HEIGHT_PX,
        height: Math.max(
          (duration / MINUTES_IN_HOUR) * HOUR_HEIGHT_PX - 2,
          MIN_BLOCK_HEIGHT_PX,
        ),
      }}
    >
      <p className="font-medium tabular-nums">
        {startsAt.format('HH:mm')}–{endsAt.format('HH:mm')}
      </p>
      <p className="truncate font-medium">{client?.name ?? 'Клиент'}</p>
      <p className="truncate opacity-80">{service?.name}</p>
    </div>
  );
};
