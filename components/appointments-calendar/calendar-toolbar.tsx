'use client';
import Link from 'next/link';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import dayjs from '@/lib/dayjs';
import { DATE_PARAM_FORMAT } from './appointments-calendar.constants';
import { getWeekStart } from './appointments-calendar.utils';
import type {
  CalendarToolbarProps,
  CalendarView,
} from './appointments-calendar.types';

const STEP_DAYS: Record<CalendarView, number> = { day: 1, week: 7 };

const VIEW_LABELS: Record<CalendarView, string> = {
  day: 'День',
  week: 'Неделя',
};

export const CalendarToolbar = ({
  companyId,
  date,
  today,
  view,
}: CalendarToolbarProps) => {
  const current = dayjs(date);
  const hrefFor = (value: string, nextView: CalendarView = view) =>
    `/dashboard/${companyId}/appointments?date=${value}&view=${nextView}`;
  const shift = (direction: 1 | -1) =>
    hrefFor(
      current.add(direction * STEP_DAYS[view], 'day').format(DATE_PARAM_FORMAT),
    );

  const weekStart = dayjs(getWeekStart(date));
  const title =
    view === 'day'
      ? current.format('dddd, D MMMM')
      : `${weekStart.format('D MMMM')} — ${weekStart.add(6, 'day').format('D MMMM')}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="icon" asChild>
        <Link href={shift(-1)} aria-label="Назад">
          <LuChevronLeft className="size-4" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <Link href={shift(1)} aria-label="Вперёд">
          <LuChevronRight className="size-4" />
        </Link>
      </Button>
      <Button variant={date === today ? 'secondary' : 'outline'} asChild>
        <Link href={hrefFor(today)}>Сегодня</Link>
      </Button>
      <h2 className="ml-2 text-lg font-semibold first-letter:uppercase">
        {title}
      </h2>
      <div className="ml-auto flex rounded-lg border p-0.5">
        {(Object.keys(VIEW_LABELS) as CalendarView[]).map((option) => (
          <Button
            key={option}
            size="sm"
            variant={option === view ? 'secondary' : 'ghost'}
            asChild
          >
            <Link href={hrefFor(date, option)}>{VIEW_LABELS[option]}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
