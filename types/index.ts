export interface Filial {
  id: number;
  title: string;
  address: string;
  phone: string;
  schedule: string;
  rating: number;
  reviews: number;
  email: string;
  summary: string;
}

type RecordStatuses = 'free' | 'booked';

export interface Record {
  id: string;
  filialId: string;
  time: string;
  master: string;
  service: string;
  duration: number;
  price: number;
  status: RecordStatuses;
}

export type SocialNetwork = 'vk' | 'telegram' | 'whatsapp' | 'viber';

export type Socials = Partial<globalThis.Record<SocialNetwork, string>>;

export interface Company {
  id: number;
  name: string;
  address: string;
  geolocation: string;
  schedule: string;
  logo: string;
  site: string;
  socials?: Socials;
  timezone: string;
}

export interface Employee {
  id: number;
  company_id: number;
  name: string;
  surname: string;
  position: string;
  avatar: string;
}

export interface Service {
  id: number;
  company_id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface Client {
  id: number;
  company_id: number;
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export interface ClientStats {
  client_id: number;
  appointments: number;
  completed_visits: number;
  no_shows: number;
  cancelled: number;
  upcoming: number;
  total_spent: number;
  last_visit_at: Nullable<string>;
  next_visit_at: Nullable<string>;
}

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no_show';

export interface Appointment {
  id: number;
  company_id: number;
  client_id: number;
  employee_id: number;
  service_id: number;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  comment: string;
  price: number;
}

export interface WorkingDay {
  employee_id: number;
  weekday: number;
  starts_at: string;
  ends_at: string;
  break_starts_at?: string;
  break_ends_at?: string;
}

export interface TimeOff {
  id: number;
  employee_id: number;
  starts_at: string;
  ends_at: string;
  reason: string;
}

export interface CreatedResponse {
  id: number;
}
