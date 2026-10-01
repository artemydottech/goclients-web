export interface SlotPickerProps {
  employeeId: Nullable<number>;
  serviceId: Nullable<number>;
  date: string;
  timezone: string;
  value: string;
  onChange: (slot: string) => void;
}
