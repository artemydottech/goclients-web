'use client';
import { useQuery } from '@tanstack/react-query';
import { getCompanies, getCompany } from '@/services/api/companies';

export const useGetCompanies = () =>
  useQuery({
    queryKey: ['get-companies'],
    queryFn: getCompanies,
  });

export const useGetCompany = (id: number) =>
  useQuery({
    queryKey: ['get-company', id],
    queryFn: () => getCompany(id),
  });
