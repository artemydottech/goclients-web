import {
  LuCalendarDays,
  LuClock,
  LuCoffee,
  LuPlane,
  LuShieldCheck,
  LuUserCheck,
  LuContact,
  LuGlobe,
} from 'react-icons/lu';

export const BUSINESS_FEATURES = [
  {
    icon: LuCalendarDays,
    title: 'Календарь мастеров',
    description:
      'День по колонкам и неделя целиком. Видно, кто занят и где есть окно.',
  },
  {
    icon: LuShieldCheck,
    title: 'Без двойных записей',
    description:
      'Проверка пересечений и сохранение идут одной транзакцией: два клиента не займут один слот.',
  },
  {
    icon: LuClock,
    title: 'Свободные слоты',
    description:
      'Время для записи считается из графика, длительности услуги и уже занятых окон.',
  },
  {
    icon: LuCoffee,
    title: 'Графики с перерывами',
    description:
      'У каждого мастера свой рабочий день по дням недели и обед, на который не запишут.',
  },
  {
    icon: LuPlane,
    title: 'Отпуска и больничные',
    description:
      'Период вычитается из слотов. Поверх активных записей его не поставить.',
  },
  {
    icon: LuUserCheck,
    title: 'Статусы и неявки',
    description:
      'Ожидает, подтверждена, пришёл, не пришёл, отменена — с правилами переходов.',
  },
  {
    icon: LuContact,
    title: 'Карточка клиента',
    description:
      'Сколько визитов, неявок и потрачено, когда был и когда придёт снова.',
  },
  {
    icon: LuGlobe,
    title: 'Часовые пояса',
    description:
      'Филиал в Екатеринбурге и во Владивостоке — у каждого своё местное время.',
  },
];
