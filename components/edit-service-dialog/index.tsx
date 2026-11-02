'use client';
import { useState } from 'react';
import { LuPencil } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ServiceForm } from '@/forms/service-form';
import type { ServiceFormValues } from '@/forms/service-form/service-form.validation';
import { useUpdateService } from '@/services/mutations/services';
import type { EditServiceDialogProps } from './edit-service-dialog.types';

export const EditServiceDialog = ({ service }: EditServiceDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error, reset } = useUpdateService();

  const handleOpenChange = (open: boolean) => {
    if (isPending) return;
    reset();
    setIsOpen(open);
  };

  const handleSubmit = (values: ServiceFormValues) =>
    mutate(
      { id: service.id, body: values },
      {
        onSuccess: () => setIsOpen(false),
      },
    );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Редактировать услугу">
          <LuPencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Редактировать услугу</DialogTitle>
          <DialogDescription>
            Новая цена и длительность применятся к новым записям.
          </DialogDescription>
        </DialogHeader>
        <fieldset disabled={isPending}>
          <ServiceForm
            defaultValues={service}
            isPending={isPending}
            errorMessage={error?.message}
            onSubmit={handleSubmit}
          />
        </fieldset>
      </DialogContent>
    </Dialog>
  );
};
