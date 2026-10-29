'use client';
import { useQuery } from '@tanstack/react-query';
import { getCompanies, getCompany } from '@/services/api/companies';

export const useGetCompanies = () =>
  useQuery({
    queryKey: ['get-companies'],
    queryFn: ({ signal }) => getCompanies(signal),
  });

export const useGetCompany = (id: number) =>
  useQuery({
    queryKey: ['get-company', id],
    queryFn: ({ signal }) => getCompany(id, signal),
  });
