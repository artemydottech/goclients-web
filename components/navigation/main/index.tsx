'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { COMPANY_NAV_ITEMS } from '../sidebar/sidebar.constants';
import { doestPathMatch } from '@/utils';
import type { NavMainProps } from './main-navigation.types';

export function NavMain({ companyId }: NavMainProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const basePath = `/dashboard/${companyId}`;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {COMPANY_NAV_ITEMS.map((item) => {
            const url = `${basePath}${item.segment}`;
            const isActive = item.segment
              ? doestPathMatch(pathname, url)
              : pathname === url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  asChild
                >
                  <Link href={url} onClick={() => setOpenMobile(false)}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
