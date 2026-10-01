import type { Control } from 'react-hook-form';
import type { BookingContactsFormValues } from './booking-contacts-form.validation';

export interface BookingContactsFormProps {
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (values: BookingContactsFormValues) => void;
  onBack: () => void;
}

export interface BookingContactsFormFieldsProps {
  control: Control<BookingContactsFormValues>;
}
