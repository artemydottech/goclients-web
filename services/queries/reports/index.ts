'use client';
import { useQuery } from '@tanstack/react-query';
import { getCompanyReport } from '@/services/api/reports';
export const useGetCompanyReport = (
  companyId: number,
  from: string,
  to: string,
) =>
  useQuery({
    queryKey: ['get-company-report', companyId, from, to],
    queryFn: ({ signal }) => getCompanyReport(companyId, from, to, signal),
  });
