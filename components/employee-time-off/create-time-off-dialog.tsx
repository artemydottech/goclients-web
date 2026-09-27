'use client';
import { useState } from 'react';
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
import { TimeOffForm } from '@/forms/time-off-form';
import type { TimeOffFormValues } from '@/forms/time-off-form/time-off-form.validation';
import { useCreateTimeOff } from '@/services/mutations/time-off';
import dayjs from '@/lib/dayjs';
import { toCompanyDateTime } from '@/utils/date';
import type { CreateTimeOffDialogProps } from './employee-time-off.types';

const DAY_START = '00:00';

export const CreateTimeOffDialog = ({
  employeeId,
  timezone,
}: CreateTimeOffDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error, reset } = useCreateTimeOff();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  const handleSubmit = ({ starts_on, ends_on, reason }: TimeOffFormValues) => {
    const dayAfterEnd = dayjs(ends_on).add(1, 'day').format('YYYY-MM-DD');
    mutate(
      {
        employeeId,
        reason,
        starts_at: toCompanyDateTime(starts_on, DAY_START, timezone),
        ends_at: toCompanyDateTime(dayAfterEnd, DAY_START, timezone),
      },
      { onSuccess: () => handleOpenChange(false) },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <LuPlus className="size-4" />
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Отпуск или больничный</DialogTitle>
          <DialogDescription>
            В эти дни мастер недоступен для записи. Поверх активных записей
            период поставить нельзя.
          </DialogDescription>
        </DialogHeader>
        <TimeOffForm
          isPending={isPending}
          errorMessage={error?.message}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
