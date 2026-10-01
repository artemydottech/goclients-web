'use client';
import { useState } from 'react';
import { LuCalendarPlus } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { AppointmentForm } from '@/forms/appointment-form';
import type { AppointmentFormValues } from '@/forms/appointment-form/appointment-form.validation';
import { useCreateAppointment } from '@/services/mutations/appointments';
import { useGetCompany } from '@/services/queries/companies';
import { useGetClients } from '@/services/queries/clients';
import { useGetServices } from '@/services/queries/services';
import { DEFAULT_TIMEZONE, getCompanyToday } from '@/utils/date';
import type { CreateAppointmentDialogProps } from './create-appointment-dialog.types';

export const CreateAppointmentDialog = ({
  companyId,
  date,
}: CreateAppointmentDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: company } = useGetCompany(companyId);
  const { data: clients } = useGetClients(companyId);
  const { data: services } = useGetServices(companyId);
  const { mutate, isPending, error, reset } = useCreateAppointment();
  const timezone = company?.timezone || DEFAULT_TIMEZONE;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  const handleSubmit = ({
    client_id,
    service_id,
    employee_id,
    starts_at,
    comment,
    isConfirmed,
  }: AppointmentFormValues) =>
    mutate(
      {
        client_id,
        service_id,
        employee_id,
        starts_at,
        comment,
        status: isConfirmed ? 'confirmed' : 'pending',
      },
      { onSuccess: () => handleOpenChange(false) },
    );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <LuCalendarPlus className="size-4" />
          Новая запись
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Новая запись</DialogTitle>
          <DialogDescription>
            Свободное время считается по графику мастера и его записям
          </DialogDescription>
        </DialogHeader>
        {clients && services ? (
          <AppointmentForm
            clients={clients}
            services={services}
            timezone={timezone}
            defaultDate={date ?? getCompanyToday(timezone)}
            isPending={isPending}
            errorMessage={error?.message}
            onSubmit={handleSubmit}
          />
        ) : (
          <Skeleton className="h-96 w-full" />
        )}
      </DialogContent>
    </Dialog>
  );
};
