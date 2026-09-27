import dayjs from '@/lib/dayjs';

export const DEFAULT_TIMEZONE = 'UTC';

export const toCompanyDateTime = (
  date: string,
  time: string,
  timezone: string,
): string => dayjs.tz(`${date} ${time}`, timezone || DEFAULT_TIMEZONE).format();

export const inCompanyTimezone = (value: string, timezone: string) =>
  dayjs(value).tz(timezone || DEFAULT_TIMEZONE);
