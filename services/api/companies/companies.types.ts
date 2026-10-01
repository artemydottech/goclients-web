import type { Company } from '@/types';

export type GetCompaniesResponse = Company[];

export type GetCompanyResponse = Company;

export type CreateCompanyRequest = Omit<Company, 'id'>;
