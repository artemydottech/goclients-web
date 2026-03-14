'use client';

import { LuBox } from 'react-icons/lu';
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
import { NavItems } from './sidebar.constants';
import Link from 'next/link';

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
              <Link href="/">
                <LuBox className="size-5" />
                <span className="text-base font-semibold">
                  Lumina Beauty Studio
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NavItems.navMain} />
        <NavDocuments items={NavItems.documents} />
        <NavSecondary items={NavItems.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={NavItems.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
