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
import { EmployeeForm } from '@/forms/employee-form';
import type { EmployeeFormValues } from '@/forms/employee-form/employee-form.validation';
import { useUpdateEmployee } from '@/services/mutations/employees';
import type { EditEmployeeDialogProps } from './edit-employee-dialog.types';

export const EditEmployeeDialog = ({ employee }: EditEmployeeDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error, reset } = useUpdateEmployee();

  const handleOpenChange = (open: boolean) => {
    if (isPending) return;
    reset();
    setIsOpen(open);
  };

  const handleSubmit = (values: EmployeeFormValues) =>
    mutate(
      { id: employee.id, body: values },
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
          aria-label="Редактировать сотрудника"
        >
          <LuPencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Редактировать сотрудника</DialogTitle>
          <DialogDescription>
            Измените имя, должность и фотографию мастера.
          </DialogDescription>
        </DialogHeader>
        <fieldset disabled={isPending}>
          <EmployeeForm
            defaultValues={employee}
            isPending={isPending}
            errorMessage={error?.message}
            onSubmit={handleSubmit}
          />
        </fieldset>
      </DialogContent>
    </Dialog>
  );
};
