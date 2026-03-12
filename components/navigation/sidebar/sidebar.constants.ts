import {
  LuLayoutDashboard,
  LuChartBarDecreasing,
  LuUsers,
  LuSettings,
  LuSearch,
  LuDatabase,
  LuFileHeart,
  LuFileDigit,
  LuStore,
} from 'react-icons/lu';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export const NavItems = {
  user: {
    name: 'Админ',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Панель управления',
      url: '#',
      icon: LuLayoutDashboard,
    },
    {
      title: 'Аналитика',
      url: '/analytics',
      icon: LuChartBarDecreasing,
    },
    {
      title: 'Филиалы',
      url: '/filials',
      icon: LuStore,
    },
    {
      title: 'Сотрудники',
      url: '/employees',
      icon: LuUsers,
    },
  ],
  navSecondary: [
    {
      title: 'Настройки',
      url: '#',
      icon: LuSettings,
    },
    {
      title: 'Помощь',
      url: '#',
      icon: BsFillQuestionCircleFill,
    },
    {
      title: 'Поиск',
      url: '#',
      icon: LuSearch,
    },
  ],
  documents: [
    {
      name: 'Библиотека данных',
      url: '#',
      icon: LuDatabase,
    },
    {
      name: 'Отчеты',
      url: '#',
      icon: LuFileHeart,
    },
    {
      name: 'Помощник Word',
      url: '#',
      icon: LuFileDigit,
    },
  ],
};
