'use client';
import Link from 'next/link';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import dayjs from '@/lib/dayjs';
import { DATE_PARAM_FORMAT } from './appointments-calendar.constants';
import type { CalendarToolbarProps } from './appointments-calendar.types';

export const CalendarToolbar = ({
  companyId,
  date,
  today,
}: CalendarToolbarProps) => {
  const current = dayjs(date);
  const hrefFor = (value: string) =>
    `/dashboard/${companyId}/appointments?date=${value}`;
  const shift = (days: number) =>
    hrefFor(current.add(days, 'day').format(DATE_PARAM_FORMAT));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="icon" asChild>
        <Link href={shift(-1)} aria-label="Предыдущий день">
          <LuChevronLeft className="size-4" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <Link href={shift(1)} aria-label="Следующий день">
          <LuChevronRight className="size-4" />
        </Link>
      </Button>
      <Button variant={date === today ? 'secondary' : 'outline'} asChild>
        <Link href={hrefFor(today)}>Сегодня</Link>
      </Button>
      <h2 className="ml-2 text-lg font-semibold first-letter:uppercase">
        {current.format('dddd, D MMMM')}
      </h2>
    </div>
  );
};
