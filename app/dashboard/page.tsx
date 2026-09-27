import { CompaniesList } from '@/components/companies-list';
import { PageHeader } from '@/components/shared/page-header';
import { CreateCompanyDialog } from '@/components/create-company-dialog';

const CompaniesPage = () => (
  <div className="space-y-6">
    <PageHeader
      title="Компании"
      description="Выберите компанию, чтобы открыть её панель"
      action={<CreateCompanyDialog />}
    />
    <CompaniesList />
  </div>
);

export default CompaniesPage;
