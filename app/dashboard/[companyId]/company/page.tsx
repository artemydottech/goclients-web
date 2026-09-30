import { CompanyInfo } from '@/components/company-info';
import { BookingLink } from '@/components/booking-link';

interface CompanyPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { companyId } = await params;

  return (
    <div className="space-y-6">
      <CompanyInfo companyId={Number(companyId)} />
      <BookingLink companyId={Number(companyId)} />
    </div>
  );
}
