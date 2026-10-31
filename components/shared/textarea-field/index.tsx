'use client';
import { useId } from 'react';
import { useController, type FieldValues } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { TextareaFieldProps } from './textarea-field.types';

export const TextareaField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: TextareaFieldProps<T>) => {
  const id = useId();
  const errorId = `${id}-error`;
  const { field, fieldState } = useController({ control, name });

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        aria-invalid={Boolean(fieldState.error)}
        aria-describedby={fieldState.error ? errorId : undefined}
        {...field}
      />
      {fieldState.error && (
        <p id={errorId} className="text-xs text-destructive">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};
