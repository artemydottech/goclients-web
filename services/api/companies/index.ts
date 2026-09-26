import api, { handleApiError } from '..';
import type { Company, CreatedResponse } from '@/types';
import type {
  CreateCompanyRequest,
  GetCompaniesResponse,
  GetCompanyResponse,
} from './companies.types';

export const getCompanies = async (): Promise<Company[]> => {
  try {
    const { data } = await api.get<GetCompaniesResponse>('/companies');
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить компании');
  }
};

export const getCompany = async (id: number): Promise<Company> => {
  try {
    const { data } = await api.get<GetCompanyResponse>(`/companies/${id}`);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить компанию');
  }
};

export const createCompany = async (
  body: CreateCompanyRequest,
): Promise<CreatedResponse> => {
  try {
    const { data } = await api.post<CreatedResponse>('/companies', body);
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось создать компанию');
  }
};

export const deleteCompany = async (id: number): Promise<void> => {
  try {
    await api.delete(`/companies/${id}`);
  } catch (error) {
    throw handleApiError(error, 'Не удалось удалить компанию');
  }
};
