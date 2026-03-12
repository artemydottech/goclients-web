import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const MetricsCards = () => {
  return (
    <div
      className={`
        grid grid-cols-1 gap-4  sm:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-4
        *:data-[slot=card]:bg-gradient-to-br *:data-[slot=card]:from-primary/5 
        *:data-[slot=card]:to-card/80 *:data-[slot=card]:shadow-sm
        dark:*:data-[slot=card]:from-card dark:*:data-[slot=card]:to-card
      `}
    >
      <Card data-slot="card" className="@container/card">
        <CardHeader className="pb-2">
          <CardDescription>Общая выручка</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums tracking-tight @[260px]/card:text-3xl">
            1 250 000 ₽
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="gap-1.5 px-2.5 py-1 text-sm font-medium"
            >
              <FaArrowTrendUp className="size-3.5" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 pt-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-medium text-foreground">
            Рост в этом месяце <FaArrowTrendUp className="size-4" />
          </div>
          <div>Посетители за последние 6 месяцев</div>
        </CardFooter>
      </Card>

      <Card data-slot="card" className="@container/card">
        <CardHeader className="pb-2">
          <CardDescription>Новые клиенты</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums tracking-tight @[260px]/card:text-3xl">
            1 234
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="gap-1.5 px-2.5 py-1 text-sm font-medium text-destructive"
            >
              <FaArrowTrendDown className="size-3.5" />
              −20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 pt-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-medium text-destructive">
            Падение на 20% <FaArrowTrendDown className="size-4" />
          </div>
          <div>Привлечение требует внимания</div>
        </CardFooter>
      </Card>

      <Card data-slot="card" className="@container/card">
        <CardHeader className="pb-2">
          <CardDescription>Активные аккаунты</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums tracking-tight @[260px]/card:text-3xl">
            45 678
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="gap-1.5 px-2.5 py-1 text-sm font-medium"
            >
              <FaArrowTrendUp className="size-3.5" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 pt-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-medium text-foreground">
            Хорошее удержание <FaArrowTrendUp className="size-4" />
          </div>
          <div>Вовлечённость выше плана</div>
        </CardFooter>
      </Card>

      <Card data-slot="card" className="@container/card">
        <CardHeader className="pb-2">
          <CardDescription>Темп роста</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums tracking-tight @[260px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="gap-1.5 px-2.5 py-1 text-sm font-medium"
            >
              <FaArrowTrendUp className="size-3.5" />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 pt-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-medium text-foreground">
            Стабильный рост <FaArrowTrendUp className="size-4" />
          </div>
          <div>Соответствует прогнозам</div>
        </CardFooter>
      </Card>
    </div>
  );
};
