import { ClientProfile } from '@/components/client-profile';
import { ClientStats } from '@/components/client-stats';

interface ClientPageProps {
  params: Promise<{ companyId: string; clientId: string }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { companyId, clientId } = await params;

  return (
    <div className="space-y-6">
      <ClientProfile
        companyId={Number(companyId)}
        clientId={Number(clientId)}
      />
      <ClientStats clientId={Number(clientId)} />
    </div>
  );
}
