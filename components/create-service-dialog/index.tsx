'use client';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ServiceForm } from '@/forms/service-form';
import type { ServiceFormValues } from '@/forms/service-form/service-form.validation';
import { useCreateService } from '@/services/mutations/services';
import type { CreateServiceDialogProps } from './create-service-dialog.types';

export const CreateServiceDialog = ({
  companyId,
}: CreateServiceDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error, reset } = useCreateService();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  const handleSubmit = (values: ServiceFormValues) =>
    mutate(
      { ...values, company_id: companyId },
      { onSuccess: () => handleOpenChange(false) },
    );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <LuPlus className="size-4" />
          Новая услуга
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новая услуга</DialogTitle>
        </DialogHeader>
        <ServiceForm
          isPending={isPending}
          errorMessage={error?.message}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
