import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/utils';

export const ServicesList = () => {
  const services = [
    { name: 'Маникюр + гель-лак', count: 312, price: 2800 },
    { name: 'Женская стрижка', count: 203, price: 3100 },
    { name: 'Мужская стрижка + борода', count: 128, price: 2500 },
    { name: 'Окрашивание AirTouch', count: 94, price: 8900 },
    { name: 'Наращивание ресниц 4D', count: 87, price: 4800 },
  ];

  return (
    <div className="space-y-4">
      {services.map((service, i) => (
        <div key={i} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{service.name}</p>
            <p className="text-sm text-muted-foreground">
              {service.count} записей
            </p>
          </div>
          <Badge variant="outline">{formatPrice(service.price)}</Badge>
        </div>
      ))}
    </div>
  );
};
