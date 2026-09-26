import { CompanyInfo } from '@/components/company-info';

interface CompanyPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { companyId } = await params;

  return <CompanyInfo companyId={Number(companyId)} />;
}
