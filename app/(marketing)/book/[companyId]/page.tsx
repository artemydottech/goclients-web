import type { Metadata } from 'next';
import { PublicCompany } from '@/components/booking/public-company';
import { BookingWizard } from '@/components/booking/booking-wizard';
import { getCompanyOnServer } from '@/services/api/companies/server';

interface BookCompanyPageProps {
  params: Promise<{ companyId: string }>;
}

export async function generateMetadata({
  params,
}: BookCompanyPageProps): Promise<Metadata> {
  const { companyId } = await params;
  const company = await getCompanyOnServer(Number(companyId));

  if (!company) return { title: 'Онлайн-запись' };

  return {
    title: `Запись в ${company.name}`,
    description: [company.address, company.schedule]
      .filter(Boolean)
      .join(' · '),
  };
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
