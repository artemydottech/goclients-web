'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LuCalendar, LuUser, LuScissors } from 'react-icons/lu';
import { useGetRecords } from '@/services/queries/records';

export const RecordsSection = () => {
  const { data: records } = useGetRecords();

  if (!records) {
    return null;
  }
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LuCalendar className="h-5 w-5 shrink-0" />
          Записи на сегодня
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.map((record) => (
            <div
              key={record.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                  <LuUser className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{record.time}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <LuScissors className="h-3 w-3 shrink-0" />
                    <span className="truncate">{record.service}</span> •{' '}
                    {record.master}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 sm:pt-0 sm:shrink-0">
                <Badge
                  variant={record.status === 'free' ? 'default' : 'secondary'}
                  className="whitespace-nowrap"
                >
                  {record.status === 'free' ? 'Свободно' : 'Занято'}
                </Badge>
                <Button
                  variant={record.status === 'free' ? 'default' : 'outline'}
                  size="sm"
                  className="min-w-25 shrink-0"
                >
                  {record.status === 'free' ? 'Записаться' : 'Занято'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
