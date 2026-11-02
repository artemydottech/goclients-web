import type { Service } from '@/types';

export type CreateServiceRequest = Omit<Service, 'id'>;

export interface UpdateServiceRequest {
  id: number;
  body: Omit<Service, 'id' | 'company_id'>;
}
