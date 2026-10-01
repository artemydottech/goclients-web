'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuPlus } from 'react-icons/lu';
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
import { useCreateCompany } from '@/services/mutations/companies';
import type { CreateCompanyRequest } from '@/services/api/companies/companies.types';
import type { Socials } from '@/types';

const toCreateCompanyRequest = ({
  telegram,
  vk,
  whatsapp,
  ...company
}: CompanyFormValues): CreateCompanyRequest => {
  const socials: Socials = {};
  if (telegram) socials.telegram = telegram;
  if (vk) socials.vk = vk;
  if (whatsapp) socials.whatsapp = whatsapp;

  return { ...company, geolocation: '', socials };
};

export const CreateCompanyDialog = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error, reset } = useCreateCompany();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  const handleSubmit = (values: CompanyFormValues) =>
    mutate(toCreateCompanyRequest(values), {
      onSuccess: ({ id }) => router.push(`/dashboard/${id}`),
    });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <LuPlus className="size-4" />
          Новая компания
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Новая компания</DialogTitle>
          <DialogDescription>
            Часовой пояс нужен, чтобы график и записи считались по местному
            времени.
          </DialogDescription>
        </DialogHeader>
        <CompanyForm
          isPending={isPending}
          errorMessage={error?.message}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
