'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { LuClock, LuPhone, LuMapPin } from 'react-icons/lu';
import { Skeleton } from '@/components/ui/skeleton';

import { useGetFilials } from '@/services/queries/filials';
import Link from 'next/link';

export const FilialsList = () => {
  const { data: filials, isPending } = useGetFilials();

  if (isPending) {
    return (
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx}>
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-3/4 mt-1.5" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-3.5 rounded" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-3.5 rounded" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  if (!filials || filials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <h3 className="text-sm font-medium text-muted-foreground">
          Филиалы не найдены
        </h3>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {filials.map((filial) => (
          <li key={filial.id}>
            <Link href={`/filials/${filial.id}`}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {filial.title}
                  </CardTitle>
                  <CardDescription className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <LuMapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    {filial.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-1.5 text-xs">
                  {filial.phone && (
                    <p className="flex items-center gap-1.5 text-muted-foreground">
                      <LuPhone className="h-3.5 w-3.5" />
                      {filial.phone}
                    </p>
                  )}
                  {filial.schedule && (
                    <p className="flex items-center gap-1.5 text-muted-foreground">
                      <LuClock className="h-3.5 w-3.5" />
                      {filial.schedule}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
