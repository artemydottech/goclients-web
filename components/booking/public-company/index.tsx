'use client';
import { LuClock, LuGlobe, LuMapPin } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { SocialLinks } from '@/components/social-links';
import { useGetCompany } from '@/services/queries/companies';
import { getInitials } from '@/utils';
import type { PublicCompanyProps } from './public-company.types';

export const PublicCompany = ({ companyId }: PublicCompanyProps) => {
  const { data: company, isPending, error } = useGetCompany(companyId);

  if (isPending) return <Skeleton className="h-32 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <Avatar className="size-20 rounded-2xl">
        <AvatarImage src={company.logo} alt={company.name} />
        <AvatarFallback className="rounded-2xl text-2xl">
          {getInitials(company.name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {company.address && (
            <p className="flex items-center gap-2">
              <LuMapPin className="size-4 shrink-0" />
              {company.address}
            </p>
          )}
          {company.schedule && (
            <p className="flex items-center gap-2">
              <LuClock className="size-4 shrink-0" />
              {company.schedule}
            </p>
          )}
          {company.site && (
            <a
              href={company.site}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <LuGlobe className="size-4 shrink-0" />
              {company.site}
            </a>
          )}
        </div>
        <SocialLinks socials={company.socials} />
      </div>
    </div>
  );
};
