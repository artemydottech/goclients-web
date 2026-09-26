import { CompaniesList } from '@/components/companies-list';

const CompaniesPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Компании</h1>
      <p className="text-muted-foreground">
        Выберите компанию, чтобы открыть её панель
      </p>
    </div>
    <CompaniesList />
  </div>
);

export default CompaniesPage;
