import { PublicCompany } from '@/components/booking/public-company';
import { BookingWizard } from '@/components/booking/booking-wizard';

interface BookCompanyPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function BookCompanyPage({
  params,
}: BookCompanyPageProps) {
  const { companyId } = await params;

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-12">
      <PublicCompany companyId={Number(companyId)} />
      <BookingWizard companyId={Number(companyId)} />
    </div>
  );
}
