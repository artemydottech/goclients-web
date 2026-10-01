'use client';
import { useState } from 'react';
import { LuUserPlus } from 'react-icons/lu';
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
import { useCreateEmployee } from '@/services/mutations/employees';
import type { CreateEmployeeDialogProps } from './create-employee-dialog.types';

export const CreateEmployeeDialog = ({
  companyId,
}: CreateEmployeeDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error, reset } = useCreateEmployee();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  const handleSubmit = (values: EmployeeFormValues) =>
    mutate(
      { ...values, company_id: companyId },
      { onSuccess: () => handleOpenChange(false) },
    );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <LuUserPlus className="size-4" />
          Добавить сотрудника
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый сотрудник</DialogTitle>
          <DialogDescription>
            После создания задайте мастеру график и услуги
          </DialogDescription>
        </DialogHeader>
        <EmployeeForm
          isPending={isPending}
          errorMessage={error?.message}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
