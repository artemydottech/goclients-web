export interface EntitySelectOption {
  id: number;
  label: string;
}

export interface EntitySelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: EntitySelectOption[];
  value: number;
  error?: string;
  disabled?: boolean;
  onChange: (id: number) => void;
}
