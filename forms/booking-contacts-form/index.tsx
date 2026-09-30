'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LuArrowLeft } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { ErrorText } from '@/components/shared/error-text';
import {
  bookingContactsFormSchema,
  type BookingContactsFormValues,
} from './booking-contacts-form.validation';
import BookingContactsFormFields from './booking-contacts-form.fields';
import type { BookingContactsFormProps } from './booking-contacts-form.types';

const DEFAULT_VALUES: BookingContactsFormValues = {
  name: '',
  phone: '',
  comment: '',
};

export const BookingContactsForm = ({
  isPending,
  errorMessage,
  onSubmit,
  onBack,
}: BookingContactsFormProps) => {
  const { control, handleSubmit } = useForm<BookingContactsFormValues>({
    resolver: zodResolver(bookingContactsFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-md gap-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="-ml-2 justify-self-start"
        onClick={onBack}
      >
        <LuArrowLeft className="size-4" />
        Другое время
      </Button>
      <BookingContactsFormFields control={control} />
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
      <Button type="submit" size="lg" disabled={isPending}>
        Записаться
      </Button>
      <p className="text-xs text-muted-foreground">
        Нажимая «Записаться», вы соглашаетесь, что салон свяжется с вами по
        этому номеру.
      </p>
    </form>
  );
};
