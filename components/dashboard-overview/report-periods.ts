import dayjs from '@/lib/dayjs';
export const getReportPeriods = (timezone: string, at?: string) => {
  const today = dayjs(at).tz(timezone).startOf('day');
  const localDay = (offset: number) =>
    dayjs.tz(today.add(offset, 'day').format('YYYY-MM-DD'), timezone).format();
  return {
    daily: { from: localDay(0), to: localDay(1) },
    weekly: { from: localDay(-6), to: localDay(1) },
    upcoming: { from: localDay(0), to: localDay(14) },
  };
};
