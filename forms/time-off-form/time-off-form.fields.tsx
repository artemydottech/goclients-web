import { TextField } from '@/components/shared/text-field';
import type { TimeOffFormFieldsProps } from './time-off-form.types';

const TimeOffFormFields = ({ control }: TimeOffFormFieldsProps) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <TextField control={control} name="starts_on" label="С" type="date" />
      <TextField control={control} name="ends_on" label="По" type="date" />
    </div>
    <TextField
      control={control}
      name="reason"
      label="Причина"
      placeholder="Отпуск, больничный"
    />
  </>
);

export default TimeOffFormFields;
