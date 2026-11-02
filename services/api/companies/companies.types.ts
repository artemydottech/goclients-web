import type { Company } from '@/types';

export type GetCompaniesResponse = Company[];

export type GetCompanyResponse = Company;

export type CreateCompanyRequest = Omit<Company, 'id'>;

export interface UpdateCompanyRequest {
  id: number;
  body: Omit<Company, 'id'>;
}
