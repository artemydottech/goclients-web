import type { Appointment, AppointmentStatus } from '@/types';

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending: 'Ожидает',
  confirmed: 'Подтверждена',
  completed: 'Пришёл',
  no_show: 'Не пришёл',
  cancelled: 'Отменена',
};

export const STATUS_STYLES: Record<AppointmentStatus, string> = {
  pending:
    'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200',
  confirmed:
    'border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200',
  completed:
    'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200',
  no_show:
    'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200',
  cancelled:
    'border-border bg-muted text-muted-foreground line-through opacity-70',
};

export const isActiveAppointment = ({ status }: Appointment): boolean =>
  status === 'pending' || status === 'confirmed';
