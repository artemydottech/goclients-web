import type { HTMLInputTypeAttribute } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

export interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}
