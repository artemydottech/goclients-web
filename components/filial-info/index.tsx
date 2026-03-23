'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LuClock, LuPhone, LuMail } from 'react-icons/lu';
import { useGetFilialById } from '@/services/queries/filials';
import { useParams } from 'next/navigation';
import { Spinner } from '../ui/spinner';

export const FilialInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { data: filial, isPending } = useGetFilialById(id);

  if (isPending) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <Spinner className="size-16" />
      </div>
    );
  }

  if (!filial) {
    return null;
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl line-clamp-2">
            {filial.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {filial.address}
          </p>
          <Badge variant="secondary" className="text-xs">
            {filial.rating}/5 ({filial.reviews.toLocaleString()} отзывов)
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">О филиале</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line line-clamp-4">{filial.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <LuClock className="h-4 w-4" />
            График работы
          </CardTitle>
        </CardHeader>
        <CardContent className="whitespace-pre-line">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {filial.schedule}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Контакты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {filial.phone && (
            <p className="flex items-center gap-2 p-3 -m-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <LuPhone className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{filial.phone}</span>
            </p>
          )}
          {filial.email && (
            <p className="flex items-center gap-2 p-3 -m-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <LuMail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{filial.email}</span>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
