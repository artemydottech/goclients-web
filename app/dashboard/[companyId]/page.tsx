import { DashboardOverview } from '@/components/dashboard-overview';

interface DashboardPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { companyId } = await params;

  return <DashboardOverview companyId={Number(companyId)} />;
}
