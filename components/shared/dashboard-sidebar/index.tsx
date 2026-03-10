'use client';

import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiScissors,
  FiDollarSign,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';

import { IoNotificationsOutline } from 'react-icons/io5';
import { Badge } from '@/components/ui/badge';

type DashboardSidebarProps = {
  mobile?: boolean;
};

export function DashboardSidebar({ mobile = false }: DashboardSidebarProps) {
  const items = [
    { title: 'Дашборд', url: '/', icon: FiHome },
    { title: 'Записи', url: '/appointments', icon: FiCalendar },
    {
      title: 'Уведомления',
      url: '/notifications',
      icon: IoNotificationsOutline,
      badge: 3,
    },
    { title: 'Специалисты', url: '/team', icon: FiUsers },
    { title: 'Услуги', url: '/services', icon: FiScissors },
    { title: 'Финансы', url: '/finance', icon: FiDollarSign },
    { title: 'Настройки', url: '/settings', icon: FiSettings },
  ];

  return (
    <Sidebar collapsible="icon" className={cn(mobile && 'border-r-0')}>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {/*<AvatarImage src="/logo.png" alt="Логотип" />*/}
            <AvatarFallback>GCL</AvatarFallback>
          </Avatar>
          <div className="font-semibold">Goclients</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url} className="relative">
                    <item.icon />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant="destructive"
                        className="ml-1 h-5 w-5 text-xs flex items-center justify-center absolute -top-1 -right-2"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 mt-2 p-2 -mx-2 rounded-lg hover:bg-accent">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src="https://i.pravatar.cc/150?img=44" />
            <AvatarFallback>АК</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">Анна К.</p>
            <p className="text-xs text-muted-foreground">Админ</p>
          </div>
        </div>
        <SidebarMenuButton
          className="mt-4 w-full justify-start text-destructive hover:bg-destructive/10"
          asChild
        >
          <button>
            <FiLogOut className="mr-2 h-4 w-4" />
            <span>Выйти</span>
          </button>
        </SidebarMenuButton>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
