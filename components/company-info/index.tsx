'use client';
import { LuClock, LuGlobe, LuMapPin } from 'react-icons/lu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { ErrorText } from '@/components/shared/error-text';
import { useGetCompany } from '@/services/queries/companies';
import type { CompanyInfoProps } from './company-info.types';

export const CompanyInfo = ({ companyId }: CompanyInfoProps) => {
  const { data: company, isPending, error } = useGetCompany(companyId);

  if (isPending) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <Spinner className="size-16" />
      </div>
    );
  }

  if (error) return <ErrorText errorMessage={error.message} />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl line-clamp-2">
            {company.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {company.address && (
            <p className="flex items-start gap-2 text-muted-foreground">
              <LuMapPin className="h-4 w-4 mt-1 shrink-0" />
              {company.address}
            </p>
          )}
          <Badge variant="secondary" className="text-xs">
            {company.timezone || 'UTC'}
          </Badge>
        </CardContent>
      </Card>

      {company.schedule && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <LuClock className="h-4 w-4" />
              График работы
            </CardTitle>
          </CardHeader>
          <CardContent className="whitespace-pre-line text-sm text-muted-foreground">
            {company.schedule}
          </CardContent>
        </Card>
      )}

      {company.site && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Контакты</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <a
              href={company.site}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <LuGlobe className="h-4 w-4 shrink-0" />
              <span className="truncate">{company.site}</span>
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
