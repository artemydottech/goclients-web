import type { PageHeaderProps } from './page-header.types';

export const PageHeader = ({ title, description, action }: PageHeaderProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
    {action}
  </div>
);
