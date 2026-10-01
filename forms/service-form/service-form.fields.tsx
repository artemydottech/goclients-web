import { TextField } from '@/components/shared/text-field';
import { TextareaField } from '@/components/shared/textarea-field';
import type { ServiceFormFieldsProps } from './service-form.types';

const ServiceFormFields = ({ control }: ServiceFormFieldsProps) => (
  <>
    <TextField control={control} name="name" label="Название" />
    <TextareaField control={control} name="description" label="Описание" />
    <div className="grid grid-cols-2 gap-4">
      <TextField
        control={control}
        name="duration"
        label="Длительность, мин"
        type="number"
      />
      <TextField control={control} name="price" label="Цена, ₽" type="number" />
    </div>
  </>
);

export default ServiceFormFields;
