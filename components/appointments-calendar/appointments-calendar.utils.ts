import dayjs from '@/lib/dayjs';
import { DATE_KEY_FORMAT } from '@/utils/date';
import type { AppointmentDragPayload } from './appointments-calendar.types';

const DAYS_FROM_MONDAY = 6;

export const getWeekStart = (date: string): string => {
  const current = dayjs(date);
  return current
    .subtract((current.day() + DAYS_FROM_MONDAY) % 7, 'day')
    .format(DATE_KEY_FORMAT);
};

export const parseDragPayload = (
  raw: string,
): Nullable<AppointmentDragPayload> => {
  try {
    const value: unknown = JSON.parse(raw);
    if (
      value &&
      typeof value === 'object' &&
      'appointmentId' in value &&
      'grabOffset' in value &&
      typeof value.appointmentId === 'number' &&
      typeof value.grabOffset === 'number'
    ) {
      return {
        appointmentId: value.appointmentId,
        grabOffset: value.grabOffset,
      };
    }
    return null;
  } catch {
    return null;
  }
};
