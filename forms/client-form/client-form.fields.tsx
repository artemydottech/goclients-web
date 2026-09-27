import { TextField } from '@/components/shared/text-field';
import { TextareaField } from '@/components/shared/textarea-field';
import type { ClientFormFieldsProps } from './client-form.types';

const ClientFormFields = ({ control }: ClientFormFieldsProps) => (
  <>
    <TextField control={control} name="name" label="Имя" />
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField
        control={control}
        name="phone"
        label="Телефон"
        type="tel"
        placeholder="+7 900 000-00-00"
      />
      <TextField control={control} name="email" label="Email" type="email" />
    </div>
    <TextareaField
      control={control}
      name="comment"
      label="Комментарий"
      placeholder="Предпочтения, аллергии"
    />
  </>
);

export default ClientFormFields;
