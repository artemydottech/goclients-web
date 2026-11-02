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
import { CompanyForm } from '@/forms/company-form';
import type { CompanyFormValues } from '@/forms/company-form/company-form.validation';
import { useUpdateCompany } from '@/services/mutations/companies';
import { toUpdateCompanyRequest } from './edit-company-dialog.utils';
import type { EditCompanyDialogProps } from './edit-company-dialog.types';

export const EditCompanyDialog = ({ company }: EditCompanyDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error, reset } = useUpdateCompany();

  const handleOpenChange = (open: boolean) => {
    if (isPending) return;
    reset();
    setIsOpen(open);
  };

  const handleSubmit = (values: CompanyFormValues) =>
    mutate(toUpdateCompanyRequest(company, values), {
      onSuccess: () => setIsOpen(false),
    });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Редактировать компанию"
        >
          <LuPencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl" showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Редактировать компанию</DialogTitle>
          <DialogDescription>
            Адрес, график и контакты будут видны на странице записи.
          </DialogDescription>
        </DialogHeader>
        <fieldset disabled={isPending}>
          <CompanyForm
            defaultValues={{
              ...company,
              telegram: company.socials?.telegram ?? '',
              vk: company.socials?.vk ?? '',
              whatsapp: company.socials?.whatsapp ?? '',
            }}
            submitLabel="Сохранить"
            isPending={isPending}
            errorMessage={error?.message}
            onSubmit={handleSubmit}
          />
        </fieldset>
      </DialogContent>
    </Dialog>
  );
};
