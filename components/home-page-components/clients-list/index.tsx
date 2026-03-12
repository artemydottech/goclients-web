import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const EmployeesList = () => {
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
};
