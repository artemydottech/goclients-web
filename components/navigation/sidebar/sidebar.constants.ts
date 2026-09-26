import {
  LuLayoutDashboard,
  LuCalendarDays,
  LuContact,
  LuUsers,
  LuScissors,
  LuStore,
  LuBuilding2,
  LuHouse,
} from 'react-icons/lu';

export const COMPANY_NAV_ITEMS = [
  { title: 'Обзор', segment: '', icon: LuLayoutDashboard },
  { title: 'Записи', segment: '/appointments', icon: LuCalendarDays },
  { title: 'Клиенты', segment: '/clients', icon: LuContact },
  { title: 'Сотрудники', segment: '/employees', icon: LuUsers },
  { title: 'Услуги', segment: '/services', icon: LuScissors },
  { title: 'Компания', segment: '/company', icon: LuStore },
];

export const SECONDARY_NAV_ITEMS = [
  { title: 'Все компании', url: '/dashboard', icon: LuBuilding2 },
  { title: 'На главную', url: '/', icon: LuHouse },
];

export const NAV_USER = {
  name: 'Админ',
  email: 'admin@goclients.local',
  avatar: '',
};
