import dayjs from '@/lib/dayjs';
import { DATE_PARAM_FORMAT } from './appointments-calendar.constants';

const DAYS_FROM_MONDAY = 6;

export const getWeekStart = (date: string): string => {
  const current = dayjs(date);
  return current
    .subtract((current.day() + DAYS_FROM_MONDAY) % 7, 'day')
    .format(DATE_PARAM_FORMAT);
};
