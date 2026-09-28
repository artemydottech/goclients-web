'use client';
import { Button } from '@/components/ui/button';
import { ErrorText } from '@/components/shared/error-text';
import { useUpdateAppointmentStatus } from '@/services/mutations/appointments';
import { getNextStatuses, STATUS_ACTION_LABELS } from '@/utils/appointments';
import type { AppointmentStatusActionsProps } from './appointment-details.types';

export const AppointmentStatusActions = ({
  appointment,
}: AppointmentStatusActionsProps) => {
  const { mutate, isPending, error } = useUpdateAppointmentStatus();
  const nextStatuses = getNextStatuses(appointment);

  if (nextStatuses.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {nextStatuses.map((status) => (
          <Button
            key={status}
            size="sm"
            variant={status === 'cancelled' ? 'outline' : 'secondary'}
            disabled={isPending}
            onClick={() => mutate({ id: appointment.id, status })}
          >
            {STATUS_ACTION_LABELS[status]}
          </Button>
        ))}
      </div>
      {error && <ErrorText errorMessage={error.message} />}
    </div>
  );
};
