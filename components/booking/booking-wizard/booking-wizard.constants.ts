import type { BookingStep } from './booking-wizard.types';

export const BOOKING_STEPS: { value: BookingStep; label: string }[] = [
  { value: 'service', label: 'Услуга' },
  { value: 'employee', label: 'Мастер' },
];
