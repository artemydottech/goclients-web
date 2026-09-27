import { PageHeader } from '@/components/shared/page-header';
import { ServicesTable } from '@/components/services-table';

interface ServicesPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { companyId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Услуги"
        description="Прайс-лист и длительность услуг"
      />
      <ServicesTable companyId={Number(companyId)} />
    </div>
  );
}
