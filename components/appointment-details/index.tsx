'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  LuCalendarClock,
  LuCalendarSync,
  LuPhone,
  LuScissors,
  LuUser,
} from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ConfirmDeleteButton } from '@/components/shared/confirm-delete-button';
import { RescheduleForm } from '@/forms/reschedule-form';
import {
  useDeleteAppointment,
  useUpdateAppointmentTime,
} from '@/services/mutations/appointments';
import { cn } from '@/lib/utils';
import { formatPhone, formatPrice } from '@/utils';
import { inCompanyTimezone } from '@/utils/date';
import {
  isActiveAppointment,
  STATUS_LABELS,
  STATUS_STYLES,
} from '@/utils/appointments';
import { AppointmentStatusActions } from './appointment-status-actions';
import type { AppointmentDetailsProps } from './appointment-details.types';

export const AppointmentDetails = ({
  companyId,
  appointment,
  directory,
  timezone,
  onClose,
}: AppointmentDetailsProps) => {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const { mutate: deleteAppointment, isPending: isDeleting } =
    useDeleteAppointment();
  const updateTime = useUpdateAppointmentTime();

  if (!appointment) return null;

  const client = directory.clientsById.get(appointment.client_id);
  const service = directory.servicesById.get(appointment.service_id);
  const employee = directory.employeesById.get(appointment.employee_id);
  const startsAt = inCompanyTimezone(appointment.starts_at, timezone);
  const endsAt = inCompanyTimezone(appointment.ends_at, timezone);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (open) return;
        setIsRescheduling(false);
        updateTime.reset();
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>Запись #{appointment.id}</DialogTitle>
            <Badge
              variant="outline"
              className={cn(STATUS_STYLES[appointment.status], 'no-underline')}
            >
              {STATUS_LABELS[appointment.status]}
            </Badge>
          </div>
          <DialogDescription className="first-letter:uppercase">
            {startsAt.format('dddd, D MMMM, HH:mm')}–{endsAt.format('HH:mm')}
          </DialogDescription>
        </DialogHeader>

        {isRescheduling ? (
          <RescheduleForm
            appointment={appointment}
            timezone={timezone}
            isPending={updateTime.isPending}
            errorMessage={updateTime.error?.message}
            onCancel={() => setIsRescheduling(false)}
            onSubmit={({ employee_id, starts_at }) =>
              updateTime.mutate(
                { id: appointment.id, employee_id, starts_at },
                { onSuccess: () => setIsRescheduling(false) },
              )
            }
          />
        ) : (
          <>
            <dl className="grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <LuUser className="size-4 text-muted-foreground" />
                {client ? (
                  <Link
                    href={`/dashboard/${companyId}/clients/${client.id}`}
                    className="font-medium hover:underline"
                  >
                    {client.name}
                  </Link>
                ) : (
                  'Клиент удалён'
                )}
              </div>
              {client && (
                <a
                  href={`tel:+${client.phone}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <LuPhone className="size-4 text-muted-foreground" />
                  {formatPhone(client.phone)}
                </a>
              )}
              <div className="flex items-center gap-2">
                <LuScissors className="size-4 text-muted-foreground" />
                {service?.name ?? 'Услуга удалена'} ·{' '}
                {formatPrice(appointment.price)}
              </div>
              <div className="flex items-center gap-2">
                <LuCalendarClock className="size-4 text-muted-foreground" />
                {employee
                  ? `${employee.name} ${employee.surname}`.trim()
                  : 'Мастер удалён'}
              </div>
              {appointment.comment && (
                <p className="rounded-lg bg-muted px-3 py-2">
                  {appointment.comment}
                </p>
              )}
            </dl>

            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <AppointmentStatusActions appointment={appointment} />
                {isActiveAppointment(appointment) && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsRescheduling(true)}
                  >
                    <LuCalendarSync className="size-4" />
                    Перенести
                  </Button>
                )}
              </div>
              <ConfirmDeleteButton
                title="Удалить запись?"
                description="Запись исчезнет из истории клиента. Чтобы сохранить историю, лучше отменить её."
                isPending={isDeleting}
                onConfirm={() =>
                  deleteAppointment(appointment.id, { onSuccess: onClose })
                }
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
