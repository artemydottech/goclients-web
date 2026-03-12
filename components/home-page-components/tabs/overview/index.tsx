import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { EmployeesList } from '../../clients-list';
import { ServicesList } from '../../services-list';

export const TabsOverviewSection = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
    <Card className="md:col-span-3 lg:col-span-3">
      <CardHeader>
        <CardTitle>Популярные услуги</CardTitle>
        <CardDescription>Топ за последние 30 дней</CardDescription>
      </CardHeader>
      <CardContent>
        <ServicesList />
      </CardContent>
    </Card>

    <Card className="md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Команда (активные)</CardTitle>
        <CardDescription>9 из 14 специалистов онлайн</CardDescription>
      </CardHeader>
      <CardContent>
        <EmployeesList />
      </CardContent>
    </Card>
  </div>
);
