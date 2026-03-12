import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { FiClock } from 'react-icons/fi';

import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { ServicesList } from '@/components/home-page-components/services-list';
import { MetricsCards } from '@/components/metrics-cards';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Обзор</h1>
          <p className="text-muted-foreground">
            Lumina Beauty Studio • Сегодня{' '}
            {dayjs().locale('ru').format('D MMMM YYYY')}
          </p>
        </div>
        <div className="flex gap-3">
          <Button>Экспорт отчёта</Button>
        </div>
      </div>

      <MetricsCards />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="upcoming">Ближайшие записи</TabsTrigger>
          <TabsTrigger value="services">Услуги</TabsTrigger>
          <TabsTrigger value="team">Команда</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Популярные услуги</CardTitle>
                <CardDescription>Топ за последние 30 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <ServicesList />
              </CardContent>
            </Card>

            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Команда (активные)</CardTitle>
                <CardDescription>9 из 14 специалистов онлайн</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiClock className="h-5 w-5 text-primary" />
                Ближайшие записи (следующие 3 часа)
              </CardTitle>
              <CardDescription>С 14:00 до 17:00 • 6 марта 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[420px] pr-4">
                <UpcomingAppointments />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Все услуги</CardTitle>
              <CardDescription>
                Список услуг с ценами и популярностью
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Здесь будет полный каталог услуг (фильтры, поиск,
                редактирование)
              </p>
              {/* Можно позже расширить */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Специалисты</CardTitle>
              <CardDescription>Полный список команды</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Расширенная таблица специалистов с графиком, загрузкой,
                рейтингом
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  trendColor?: string;
};

function StatCard({
  icon,
  title,
  value,
  trend,
  trendColor = 'text-emerald-600 dark:text-emerald-400',
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColor} mt-1 flex items-center gap-1`}>
          {trend} <span className="text-muted-foreground">за неделю</span>
        </p>
      </CardContent>
    </Card>
  );
}

function TeamList() {
  const team = [
    {
      name: 'Анна К.',
      role: 'Топ-стилист',
      avatar: 'https://i.pravatar.cc/150?img=44',
    },
    {
      name: 'Мария В.',
      role: 'Лэшмейкер',
      avatar: 'https://i.pravatar.cc/150?img=48',
    },
    {
      name: 'Екатерина П.',
      role: 'Ногтевой сервис',
      avatar: 'https://i.pravatar.cc/150?img=68',
    },
    {
      name: 'Дарья С.',
      role: 'Колорист',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
  ];

  return (
    <div className="space-y-4">
      {team.map((m, i) => (
        <div key={i} className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={m.avatar} />
            <AvatarFallback>
              {m.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">{m.name}</p>
            <p className="text-sm text-muted-foreground">{m.role}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            Онлайн
          </Badge>
        </div>
      ))}
    </div>
  );
}

function UpcomingAppointments() {
  const appointments = [
    {
      time: '14:00',
      client: 'Ольга М.',
      service: 'Маникюр + дизайн',
      master: 'Екатерина П.',
      duration: '1 ч 30 мин',
    },
    {
      time: '14:30',
      client: 'Ирина Т.',
      service: 'Стрижка + окрашивание корней',
      master: 'Анна К.',
      duration: '2 ч',
    },
    {
      time: '15:15',
      client: 'Алексей Р.',
      service: 'Мужская стрижка',
      master: 'Дарья С.',
      duration: '45 мин',
    },
    {
      time: '15:30',
      client: 'Светлана К.',
      service: 'Наращивание ресниц',
      master: 'Мария В.',
      duration: '1 ч 20 мин',
    },
    {
      time: '16:00',
      client: 'Михаил П.',
      service: 'Кератин',
      master: 'Анна К.',
      duration: '3 ч',
    },
  ];

  return (
    <div className="space-y-4">
      {appointments.map((appt, i) => (
        <div
          key={i}
          className="flex items-start gap-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
        >
          <div className="min-w-[60px] text-center">
            <div className="text-lg font-bold">{appt.time}</div>
            <div className="text-xs text-muted-foreground">{appt.duration}</div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-medium">{appt.client}</div>
            <div className="text-sm text-muted-foreground">{appt.service}</div>
          </div>

          <div className="text-right">
            <div className="text-sm font-medium">{appt.master}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
