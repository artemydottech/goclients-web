'use client';
import Link from 'next/link';
import { LuClock, LuMapPin } from 'react-icons/lu';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { useGetCompanies } from '@/services/queries/companies';

const SKELETON_COUNT = 4;

export const CompaniesList = () => {
  const { data: companies, isPending, error } = useGetCompanies();

  if (isPending) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4 mt-1.5" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) return <ErrorText errorMessage={error.message} />;

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <h3 className="text-sm font-medium text-muted-foreground">
          Компаний пока нет
        </h3>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {companies.map((company) => (
        <li key={company.id}>
          <Link href={`/dashboard/${company.id}`}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {company.name}
                </CardTitle>
                {company.address && (
                  <CardDescription className="flex items-start gap-1.5 text-xs">
                    <LuMapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    {company.address}
                  </CardDescription>
                )}
              </CardHeader>
              {company.schedule && (
                <CardContent className="text-xs">
                  <p className="flex items-center gap-1.5 text-muted-foreground">
                    <LuClock className="h-3.5 w-3.5" />
                    {company.schedule}
                  </p>
                </CardContent>
              )}
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
};
