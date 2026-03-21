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
