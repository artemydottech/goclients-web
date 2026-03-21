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
          <LuCalendar className="h-5 w-5" />
          Записи на сегодня
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <LuUser className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{record.time}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <LuScissors className="h-3 w-3" />
                    {record.service} • {record.master}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={record.status === 'free' ? 'default' : 'secondary'}
                >
                  {record.status === 'free' ? 'Свободно' : 'Занято'}
                </Badge>
                <Button
                  variant={record.status === 'free' ? 'default' : 'outline'}
                  size="sm"
                  className="ml-2"
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
