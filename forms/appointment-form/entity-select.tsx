'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { EntitySelectProps } from './appointment-form.types';

export const EntitySelect = ({
  id,
  label,
  placeholder,
  options,
  value,
  error,
  disabled,
  onChange,
}: EntitySelectProps) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Select
      value={value ? String(value) : ''}
      onValueChange={(next) => onChange(Number(next))}
      disabled={disabled}
    >
      <SelectTrigger id={id} className="w-full" aria-invalid={Boolean(error)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={String(option.id)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);
