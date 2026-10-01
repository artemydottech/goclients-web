import type { Service } from '@/types';

export type CreateServiceRequest = Omit<Service, 'id'>;
