import type { Client } from '@/types';

export type CreateClientRequest = Omit<Client, 'id'>;

export interface UpdateClientRequest {
  id: number;
  body: Omit<Client, 'id' | 'company_id'>;
}
