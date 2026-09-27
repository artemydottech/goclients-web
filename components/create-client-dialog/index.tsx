'use client';
import { useState } from 'react';
import { LuUserPlus } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ClientForm } from '@/forms/client-form';
import type { ClientFormValues } from '@/forms/client-form/client-form.validation';
import { useCreateClient } from '@/services/mutations/clients';
import type { CreateClientDialogProps } from './create-client-dialog.types';

export const CreateClientDialog = ({ companyId }: CreateClientDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error, reset } = useCreateClient();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  const handleSubmit = (values: ClientFormValues) =>
    mutate(
      { ...values, company_id: companyId },
      { onSuccess: () => handleOpenChange(false) },
    );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <LuUserPlus className="size-4" />
          Новый клиент
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый клиент</DialogTitle>
        </DialogHeader>
        <ClientForm
          isPending={isPending}
          errorMessage={error?.message}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
