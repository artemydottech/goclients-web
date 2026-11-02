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
import { ClientForm } from '@/forms/client-form';
import type { ClientFormValues } from '@/forms/client-form/client-form.validation';
import { useUpdateClient } from '@/services/mutations/clients';
import type { EditClientDialogProps } from './edit-client-dialog.types';

export const EditClientDialog = ({ client }: EditClientDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error, reset } = useUpdateClient();

  const handleOpenChange = (open: boolean) => {
    if (isPending) return;
    reset();
    setIsOpen(open);
  };

  const handleSubmit = (values: ClientFormValues) =>
    mutate(
      { id: client.id, body: values },
      {
        onSuccess: () => setIsOpen(false),
      },
    );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Редактировать клиента"
        >
          <LuPencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Редактировать клиента</DialogTitle>
          <DialogDescription>
            Телефон должен оставаться уникальным в пределах компании.
          </DialogDescription>
        </DialogHeader>
        <fieldset disabled={isPending}>
          <ClientForm
            defaultValues={client}
            isPending={isPending}
            errorMessage={error?.message}
            onSubmit={handleSubmit}
          />
        </fieldset>
      </DialogContent>
    </Dialog>
  );
};
