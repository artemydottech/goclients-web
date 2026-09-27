import { PageHeader } from '@/components/shared/page-header';
import { ClientsTable } from '@/components/clients-table';
import { CreateClientDialog } from '@/components/create-client-dialog';

interface ClientsPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function ClientsPage({ params }: ClientsPageProps) {
  const { companyId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Клиенты"
        description="База клиентов компании"
        action={<CreateClientDialog companyId={Number(companyId)} />}
      />
      <ClientsTable companyId={Number(companyId)} />
    </div>
  );
}
