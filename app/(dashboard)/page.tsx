import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import {
  FiHome,
  FiCalendar,
  FiScissors,
  FiUsers,
  FiClock,
} from 'react-icons/fi';

import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { MetricsCards } from '@/components/metrics-cards';
import { AppointmentsList } from '@/components/home-page-components/appointments-list';
import { TabsOverviewSection } from '@/components/home-page-components/tabs/overview';

export default function HomePage() {
  return (
    <div className="space-y-8 pb-16 md:pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Обзор</h1>
          <p className="text-muted-foreground">
            Lumina Beauty Studio • Сегодня{' '}
            {dayjs().locale('ru').format('D MMMM YYYY')}
          </p>
        </div>
        <Button>Экспорт отчёта</Button>
      </div>
      <MetricsCards />
      <Tabs defaultValue="overview">
        <TabsList className="w-full">
          <TabsTrigger value="overview">
            <FiHome className="h-4 w-4 sm:h-5 sm:w-5" />
            Обзор
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            <FiCalendar className="h-4 w-4 sm:h-5 sm:w-5" />
            Записи
          </TabsTrigger>
          <TabsTrigger value="services">
            <FiScissors className="h-4 w-4 sm:h-5 sm:w-5" />
            Услуги
          </TabsTrigger>
          <TabsTrigger value="team">
            <FiUsers className="h-4 w-4 sm:h-5 sm:w-5" />
            Команда
          </TabsTrigger>
        </TabsList>

        <div className="pt-6">
          <TabsContent value="overview">
            <TabsOverviewSection />
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiClock className="h-5 w-5 text-primary" />
                  Ближайшие записи (след. 3 часа)
                </CardTitle>
                <CardDescription>
                  С {dayjs().format('HH:00')} до{' '}
                  {dayjs().add(3, 'hour').format('HH:00')} •{' '}
                  {dayjs().locale('ru').format('D MMMM YYYY')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[50vh] max-h-105 pr-4">
                  <AppointmentsList />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Все услуги</CardTitle>
                <CardDescription>
                  Список услуг с ценами и популярностью
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-75 flex items-center justify-center text-muted-foreground">
                Полный каталог услуг (фильтры, поиск, редактирование) — в
                разработке
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Специалисты</CardTitle>
                <CardDescription>Полный список команды</CardDescription>
              </CardHeader>
              <CardContent className="min-h-75 flex items-center justify-center text-muted-foreground">
                Расширенная таблица специалистов (график, загрузка, рейтинг) — в
                разработке
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
