import dayjs from '@/lib/dayjs';

export const DEFAULT_TIMEZONE = 'UTC';

export const toCompanyDateTime = (
  date: string,
  time: string,
  timezone: string,
): string => dayjs.tz(`${date} ${time}`, timezone || DEFAULT_TIMEZONE).format();

export const inCompanyTimezone = (value: string, timezone: string) =>
  dayjs(value).tz(timezone || DEFAULT_TIMEZONE);

export const DATE_KEY_FORMAT = 'YYYY-MM-DD';

const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const getCompanyToday = (timezone: string): string =>
  dayjs()
    .tz(timezone || DEFAULT_TIMEZONE)
    .format(DATE_KEY_FORMAT);

export const toDateKey = (value: string, timezone: string): string =>
  inCompanyTimezone(value, timezone).format(DATE_KEY_FORMAT);

export const parseDateParam = (value?: string): Nullable<string> =>
  value && DATE_KEY_PATTERN.test(value) ? value : null;
