'use client';
import Link from 'next/link';
import { LuArrowRight, LuMapPin, LuStore } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { EmptyState } from '@/components/shared/empty-state';
import { useGetCompanies } from '@/services/queries/companies';
import { getInitials } from '@/utils';

export const SalonList = () => {
  const { data: companies, isPending, error } = useGetCompanies();

  if (isPending) return <Skeleton className="h-48 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  if (companies.length === 0) {
    return (
      <EmptyState
        icon={LuStore}
        title="Салонов пока нет"
        description="Когда салон заведёт компанию в goclients, она появится здесь."
      />
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {companies.map((company) => (
        <li key={company.id}>
          <Link href={`/book/${company.id}`} className="group block">
            <Card className="py-4 transition-colors group-hover:bg-muted/50">
              <CardContent className="flex items-center gap-4">
                <Avatar className="size-12 rounded-xl">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="rounded-xl">
                    {getInitials(company.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{company.name}</p>
                  {company.address && (
                    <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
                      <LuMapPin className="size-3.5 shrink-0" />
                      {company.address}
                    </p>
                  )}
                </div>
                <LuArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
};
