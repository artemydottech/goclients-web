import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { MetricCardProps } from './dashboard-overview.types';

export const MetricCard = ({ label, value, hint }: MetricCardProps) => (
  <Card className="bg-gradient-to-br from-primary/5 to-card shadow-sm dark:from-card">
    <CardHeader>
      <CardDescription>{label}</CardDescription>
      <CardTitle className="text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">
        {value}
      </CardTitle>
    </CardHeader>
    <CardFooter className="text-sm text-muted-foreground">{hint}</CardFooter>
  </Card>
);
