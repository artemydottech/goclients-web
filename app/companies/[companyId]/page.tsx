import { RecordsSection } from '@/components/records-section';
import { CompanyInfo } from '@/components/company-info';

interface CompanyPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { companyId } = await params;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <CompanyInfo companyId={Number(companyId)} />
      <RecordsSection />
    </div>
  );
}
