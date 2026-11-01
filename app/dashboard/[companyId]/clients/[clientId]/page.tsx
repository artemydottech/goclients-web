import { requireRouteId } from '@/lib/route-id';
import { ClientProfile } from '@/components/client-profile';
import { ClientStats } from '@/components/client-stats';
import { ClientHistory } from '@/components/client-history';

interface ClientPageProps {
  params: Promise<{ companyId: string; clientId: string }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { companyId, clientId } = await params;

  return (
    <div className="space-y-6">
      <ClientProfile
        companyId={requireRouteId(companyId)}
        clientId={requireRouteId(clientId)}
      />
      <ClientStats clientId={requireRouteId(clientId)} />
      <ClientHistory
        companyId={requireRouteId(companyId)}
        clientId={requireRouteId(clientId)}
      />
    </div>
  );
}
