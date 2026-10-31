'use client';
import { useId } from 'react';
import { useController, type FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TextFieldProps } from './text-field.types';

export const TextField = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
}: TextFieldProps<T>) => {
  const id = useId();
  const errorId = `${id}-error`;
  const { field, fieldState } = useController({ control, name });
  const isNumber = type === 'number';
  const value = isNumber && Number.isNaN(field.value) ? '' : field.value ?? '';

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(fieldState.error)}
        aria-describedby={fieldState.error ? errorId : undefined}
        {...field}
        value={value}
        onChange={(event) =>
          field.onChange(
            isNumber ? event.target.valueAsNumber : event.target.value,
          )
        }
      />
      {fieldState.error && (
        <p id={errorId} className="text-xs text-destructive">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};
