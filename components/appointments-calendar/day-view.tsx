'use client';
import { LuUsers } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EmptyState } from '@/components/shared/empty-state';
import { getInitials } from '@/utils';
import { AppointmentBlock } from './appointment-block';
import {
  CALENDAR_HOURS,
  HOUR_HEIGHT_PX,
} from './appointments-calendar.constants';
import type { DayViewProps } from './appointments-calendar.types';

export const DayView = ({
  appointments,
  directory,
  timezone,
  onSelect,
}: DayViewProps) => {
  const { employees } = directory;

  if (employees.length === 0) {
    return (
      <EmptyState
        icon={LuUsers}
        title="В календаре пока пусто"
        description="Добавьте сотрудников в разделе «Сотрудники», и здесь появятся их колонки."
      />
    );
  }

  return (
    <div className="max-h-[calc(100dvh-16rem)] min-h-96 overflow-auto rounded-xl border bg-card">
      <div
        className="grid min-w-max"
        style={{
          gridTemplateColumns: `4rem repeat(${employees.length}, minmax(10rem, 1fr))`,
        }}
      >
        <div className="sticky left-0 top-0 z-30 border-b bg-card" />
        {employees.map((employee) => {
          const fullName = `${employee.name} ${employee.surname}`.trim();
          return (
            <div
              key={employee.id}
              className="sticky top-0 z-20 flex items-center gap-2 border-b border-l bg-card px-3 py-2"
            >
              <Avatar className="size-7">
                <AvatarImage src={employee.avatar} alt={fullName} />
                <AvatarFallback className="text-xs">
                  {getInitials(fullName)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate text-sm font-medium">{fullName}</span>
            </div>
          );
        })}

        <div className="sticky left-0 z-10 bg-card">
          {CALENDAR_HOURS.map((hour) => (
            <div
              key={hour}
              className="pr-2 text-right text-xs text-muted-foreground tabular-nums"
              style={{ height: HOUR_HEIGHT_PX }}
            >
              {String(hour).padStart(2, '0')}:00
            </div>
          ))}
        </div>
        {employees.map((employee) => (
          <div key={employee.id} className="relative border-l">
            {CALENDAR_HOURS.map((hour) => (
              <div
                key={hour}
                className="border-b border-dashed last:border-b-0"
                style={{ height: HOUR_HEIGHT_PX }}
              />
            ))}
            {appointments
              .filter((appointment) => appointment.employee_id === employee.id)
              .map((appointment) => (
                <AppointmentBlock
                  key={appointment.id}
                  appointment={appointment}
                  directory={directory}
                  timezone={timezone}
                  onSelect={onSelect}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};
