'use client';
import { useEffect, useState } from 'react';
import dayjs from '@/lib/dayjs';
import {
  DAY_END_HOUR,
  DAY_START_HOUR,
  HOUR_HEIGHT_PX,
  MINUTES_IN_HOUR,
} from './appointments-calendar.constants';
import type { CurrentTimeLineProps } from './appointments-calendar.types';

const REFRESH_INTERVAL_MS = 60_000;

export const CurrentTimeLine = ({
  timezone,
  withDot,
}: CurrentTimeLineProps) => {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const timer = window.setInterval(
      () => setNow(Date.now()),
      REFRESH_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, []);

  const current = dayjs(now).tz(timezone);
  const minutes =
    (current.hour() - DAY_START_HOUR) * MINUTES_IN_HOUR + current.minute();

  if (minutes < 0 || current.hour() >= DAY_END_HOUR) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 z-10 border-t-2 border-rose-500"
      style={{ top: (minutes / MINUTES_IN_HOUR) * HOUR_HEIGHT_PX }}
    >
      {withDot && (
        <span className="absolute -left-1 -top-[5px] size-2 rounded-full bg-rose-500" />
      )}
    </div>
  );
};
