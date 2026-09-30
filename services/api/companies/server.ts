import type { Company } from '@/types';

const API_URL = process.env.API_URL ?? 'http://localhost:8080';

export const getCompanyOnServer = async (
  id: number,
): Promise<Nullable<Company>> => {
  try {
    const response = await fetch(`${API_URL}/companies/${id}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    return (await response.json()) as Company;
  } catch {
    return null;
  }
};
