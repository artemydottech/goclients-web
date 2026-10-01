'use client';
import { useState, type DragEvent } from 'react';
import { toast } from 'sonner';
import { LuUsers } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EmptyState } from '@/components/shared/empty-state';
import { getInitials } from '@/utils';
import { AppointmentBlock } from './appointment-block';
import { CurrentTimeLine } from './current-time-line';
import { OffHours } from './off-hours';
import { useGetEmployeesSchedules } from '@/services/queries/schedule';
import { useGetEmployeesTimeOff } from '@/services/queries/time-off';
import dayjs from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { useUpdateAppointmentTime } from '@/services/mutations/appointments';
import { parseDragPayload } from './appointments-calendar.utils';
import {
  APPOINTMENT_DRAG_TYPE,
  CALENDAR_HOURS,
  DAY_START_HOUR,
  HOUR_HEIGHT_PX,
  MINUTES_IN_HOUR,
  SNAP_MINUTES,
} from './appointments-calendar.constants';
import type { DayViewProps } from './appointments-calendar.types';

export const DayView = ({
  appointments,
  directory,
  timezone,
  date,
  isToday,
  onSelect,
}: DayViewProps) => {
  const { employees } = directory;
  const employeeIds = employees.map(({ id }) => id);
  const schedules = useGetEmployeesSchedules(employeeIds);
  const timeOff = useGetEmployeesTimeOff(employeeIds);
  const dayStart = dayjs.tz(date, timezone).valueOf();
  const dayEnd = dayjs.tz(date, timezone).add(1, 'day').valueOf();
  const weekday = dayjs(date).day();
  const getTimeOffReason = (employeeId: number): string | undefined =>
    timeOff
      .get(employeeId)
      ?.find(
        (period) =>
          Date.parse(period.starts_at) < dayEnd &&
          Date.parse(period.ends_at) > dayStart,
      )?.reason;

  const [dropTargetId, setDropTargetId] = useState<Nullable<number>>(null);
  const { mutate: moveAppointment } = useUpdateAppointmentTime();

  const handleDrop = (event: DragEvent<HTMLDivElement>, employeeId: number) => {
    event.preventDefault();
    setDropTargetId(null);
    const payload = parseDragPayload(
      event.dataTransfer.getData(APPOINTMENT_DRAG_TYPE),
    );
    if (!payload) return;

    const offset =
      event.clientY -
      event.currentTarget.getBoundingClientRect().top -
      payload.grabOffset;
    const minutes =
      Math.round(((offset / HOUR_HEIGHT_PX) * MINUTES_IN_HOUR) / SNAP_MINUTES) *
        SNAP_MINUTES +
      DAY_START_HOUR * MINUTES_IN_HOUR;

    moveAppointment(
      {
        id: payload.appointmentId,
        employee_id: employeeId,
        starts_at: dayjs.tz(date, timezone).add(minutes, 'minute').format(),
      },
      { onError: (error) => toast.error(error.message) },
    );
  };

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
        {employees.map((employee, index) => (
          <div
            key={employee.id}
            className={cn(
              'relative border-l transition-colors',
              dropTargetId === employee.id && 'bg-primary/5',
            )}
            onDragOver={(event) => {
              if (!event.dataTransfer.types.includes(APPOINTMENT_DRAG_TYPE)) {
                return;
              }
              event.preventDefault();
              setDropTargetId(employee.id);
            }}
            onDragLeave={() => setDropTargetId(null)}
            onDrop={(event) => handleDrop(event, employee.id)}
          >
            {schedules.get(employee.id) && (
              <OffHours
                timeOffReason={getTimeOffReason(employee.id)}
                workingDay={schedules
                  .get(employee.id)
                  ?.find((day) => day.weekday === weekday)}
              />
            )}
            {isToday && (
              <CurrentTimeLine timezone={timezone} withDot={index === 0} />
            )}
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
