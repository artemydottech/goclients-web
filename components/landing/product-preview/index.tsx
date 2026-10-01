import { cn } from '@/lib/utils';
import { STATUS_STYLES } from '@/utils/appointments';
import { PREVIEW_COLUMNS, PREVIEW_HOURS } from './product-preview.constants';

export const ProductPreview = () => (
  <div
    aria-hidden="true"
    className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10"
  >
    <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-2.5">
      <span className="size-2.5 rounded-full bg-rose-400" />
      <span className="size-2.5 rounded-full bg-amber-400" />
      <span className="size-2.5 rounded-full bg-emerald-400" />
      <span className="ml-3 text-xs text-muted-foreground">
        goclients · Записи
      </span>
    </div>
    <div className="flex">
      <div className="hidden w-40 shrink-0 space-y-1 border-r p-3 text-left text-xs sm:block">
        {['Обзор', 'Записи', 'Клиенты', 'Сотрудники', 'Услуги'].map((item) => (
          <div
            key={item}
            className={cn(
              'rounded-md px-2 py-1.5 text-muted-foreground',
              item === 'Записи' && 'bg-muted font-medium text-foreground',
            )}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex flex-1">
        <div className="w-12 shrink-0 border-r pt-8 text-right text-[10px] text-muted-foreground">
          {PREVIEW_HOURS.map((hour) => (
            <div key={hour} className="h-12 pr-1.5">
              {hour}
            </div>
          ))}
        </div>
        {PREVIEW_COLUMNS.map((column) => (
          <div key={column.master} className="flex-1 border-r last:border-r-0">
            <div className="h-8 border-b px-2 py-1.5 text-left text-xs font-medium">
              {column.master}
            </div>
            <div className="relative h-60">
              {column.items.map((item) => (
                <div
                  key={`${column.master}-${item.time}`}
                  className={cn(
                    'absolute inset-x-1 overflow-hidden rounded-md border px-1.5 py-1 text-left text-[10px] leading-tight',
                    STATUS_STYLES[item.status],
                  )}
                  style={{ top: `${item.top}%`, height: `${item.height}%` }}
                >
                  <p className="font-semibold">{item.time}</p>
                  <p className="truncate">{item.client}</p>
                  <p className="truncate opacity-75">{item.service}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
