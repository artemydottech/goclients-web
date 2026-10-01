import { Card, CardContent } from '@/components/ui/card';
import type { StatTileProps } from './client-stats.types';

export const StatTile = ({ label, value, hint }: StatTileProps) => (
  <Card className="py-4">
    <CardContent className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </CardContent>
  </Card>
);
