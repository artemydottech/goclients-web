'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LuClock, LuPhone, LuMail } from 'react-icons/lu';
import { useGetFilialById } from '@/services/queries/filials';
import { useParams } from 'next/navigation';

export const FilialInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { data: filial } = useGetFilialById(id);

  if (!filial) {
    return null;
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {filial.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground mb-4">{filial.address}</p>
          <Badge>
            {filial.rating}/5 ({filial.reviews.toLocaleString()} отзывов)
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>О филиале</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{filial.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LuClock className="h-4 w-4" />
            График работы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {filial.schedule}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контакты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {filial.phone && (
            <p className="flex items-center gap-2">
              <LuPhone className="h-4 w-4" />
              {filial.phone}
            </p>
          )}
          {filial.email && (
            <p className="flex items-center gap-2">
              <LuMail className="h-4 w-4" />
              {filial.email}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
