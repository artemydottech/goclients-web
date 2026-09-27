import { TextField } from '@/components/shared/text-field';
import type { EmployeeFormFieldsProps } from './employee-form.types';

const EmployeeFormFields = ({ control }: EmployeeFormFieldsProps) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <TextField control={control} name="name" label="Имя" />
      <TextField control={control} name="surname" label="Фамилия" />
    </div>
    <TextField
      control={control}
      name="position"
      label="Должность"
      placeholder="Мастер маникюра"
    />
    <TextField
      control={control}
      name="avatar"
      label="Ссылка на фото"
      type="url"
      placeholder="https://"
    />
  </>
);

export default EmployeeFormFields;
