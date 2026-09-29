import { LuBell, LuCalendarCheck, LuSmartphone, LuUserX } from 'react-icons/lu';

export const CLIENT_BENEFITS = [
  {
    icon: LuCalendarCheck,
    title: 'Только свободное время',
    description:
      'Слоты считаются по графику мастера и уже занятым окнам — занятое не показываем.',
  },
  {
    icon: LuUserX,
    title: 'Без регистрации',
    description:
      'Не нужно придумывать пароль. Имя и телефон — и запись у мастера в календаре.',
  },
  {
    icon: LuSmartphone,
    title: 'С телефона',
    description:
      'Страница записи удобна на смартфоне: пара нажатий большим пальцем.',
  },
  {
    icon: LuBell,
    title: 'Салон на связи',
    description:
      'Администратор увидит запись сразу и подтвердит её или перезвонит, если нужно.',
  },
];
