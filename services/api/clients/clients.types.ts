import type { Client } from '@/types';

export type CreateClientRequest = Omit<Client, 'id'>;
