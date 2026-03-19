'use client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { LuClock, LuPhone, LuMapPin, LuBuilding2 } from 'react-icons/lu';

import { useGetFilials } from '@/services/queries/filials';

export const FilialsList = () => {
  const { data: filials, isPending } = useGetFilials();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <LuBuilding2 className="h-5 w-5 animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground">Загружаем филиалы...</p>
      </div>
    );
  }

  if (!filials || filials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
        <LuBuilding2 className="h-10 w-10 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">
          Филиалы не найдены
        </h3>
        <p className="text-xs text-muted-foreground max-w-xs">
          В вашем регионе пока нет филиалов или произошла ошибка загрузки
          данных.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {filials.map((filial) => (
          <li key={filial.id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};
