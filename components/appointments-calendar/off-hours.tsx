import {
  DAY_END_HOUR,
  DAY_START_HOUR,
  HOUR_HEIGHT_PX,
  MINUTES_IN_HOUR,
} from './appointments-calendar.constants';
import type { OffHoursProps } from './appointments-calendar.types';

const CALENDAR_START = DAY_START_HOUR * MINUTES_IN_HOUR;
const CALENDAR_END = DAY_END_HOUR * MINUTES_IN_HOUR;

const toMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * MINUTES_IN_HOUR + minutes;
};

const toPx = (minutes: number): number =>
  ((Math.min(Math.max(minutes, CALENDAR_START), CALENDAR_END) -
    CALENDAR_START) /
    MINUTES_IN_HOUR) *
  HOUR_HEIGHT_PX;

export const OffHours = ({ workingDay }: OffHoursProps) => {
  const ranges: { from: number; to: number; label?: string }[] = workingDay
    ? [
        { from: CALENDAR_START, to: toMinutes(workingDay.starts_at) },
        { from: toMinutes(workingDay.ends_at), to: CALENDAR_END },
      ]
    : [{ from: CALENDAR_START, to: CALENDAR_END, label: 'Выходной' }];

  if (workingDay?.break_starts_at && workingDay.break_ends_at) {
    ranges.push({
      from: toMinutes(workingDay.break_starts_at),
      to: toMinutes(workingDay.break_ends_at),
      label: 'Перерыв',
    });
  }

  return ranges
    .filter(({ from, to }) => toPx(to) > toPx(from))
    .map(({ from, to, label }) => (
      <div
        key={`${from}-${to}`}
        aria-hidden="true"
        className="absolute inset-x-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,var(--muted)_6px,var(--muted)_12px)] opacity-80"
        style={{ top: toPx(from), height: toPx(to) - toPx(from) }}
      >
        {label && (
          <span className="absolute left-2 top-1 text-xs text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    ));
};
