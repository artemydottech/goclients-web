'use client';

import * as React from 'react';
import {
  LuLayoutDashboard,
  LuListTree,
  LuChartBarDecreasing,
  LuFolder,
  LuUsers,
  LuSettings,
  LuSearch,
  LuDatabase,
  LuFileHeart,
  LuFileDigit,
  LuBox,
} from 'react-icons/lu';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

import { NavDocuments } from '../documents';
import { NavMain } from '../main';
import { NavSecondary } from '../secondary';
import { NavUser } from '../user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Админ', // Локализовано
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Панель управления', // Dashboard
      url: '#',
      icon: LuLayoutDashboard,
    },
    {
      title: 'Жизненный цикл', // Lifecycle
      url: '#',
      icon: LuListTree,
    },
    {
      title: 'Аналитика', // Analytics
      url: '#',
      icon: LuChartBarDecreasing,
    },
    {
      title: 'Проекты', // Projects
      url: '#',
      icon: LuFolder,
    },
    {
      title: 'Команда', // Team
      url: '#',
      icon: LuUsers,
    },
  ],
  navSecondary: [
    {
      title: 'Настройки', // Settings
      url: '#',
      icon: LuSettings,
    },
    {
      title: 'Помощь', // Get Help
      url: '#',
      icon: BsFillQuestionCircleFill,
    },
    {
      title: 'Поиск', // Search
      url: '#',
      icon: LuSearch,
    },
  ],
  documents: [
    {
      name: 'Библиотека данных', // Data Library
      url: '#',
      icon: LuDatabase,
    },
    {
      name: 'Отчеты', // Reports
      url: '#',
      icon: LuFileHeart,
    },
    {
      name: 'Помощник Word', // Word Assistant
      url: '#',
      icon: LuFileDigit,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5"
            >
              <a href="#">
                <LuBox className="size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Основные разделы */}
        <NavMain items={data.navMain} />
        {/* Документы и отчеты */}
        <NavDocuments items={data.documents} />
        {/* Вторичное меню (Settings, Help), прижатое вниз */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
