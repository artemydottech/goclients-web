import { TextField } from '@/components/shared/text-field';
import { TextareaField } from '@/components/shared/textarea-field';
import type { BookingContactsFormFieldsProps } from './booking-contacts-form.types';

const BookingContactsFormFields = ({
  control,
}: BookingContactsFormFieldsProps) => (
  <>
    <TextField control={control} name="name" label="Имя" />
    <TextField
      control={control}
      name="phone"
      label="Телефон"
      type="tel"
      placeholder="+7 900 000-00-00"
    />
    <TextareaField
      control={control}
      name="comment"
      label="Комментарий для мастера"
      placeholder="Необязательно"
    />
  </>
);

export default BookingContactsFormFields;
