'use client';

import { useParams } from 'next/navigation';
import { NavMain } from '../main';
import { NavSecondary } from '../secondary';
import { NavUser } from '../user';
import { CompanySwitcher } from '../company-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NAV_USER } from './sidebar.constants';

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { companyId } = useParams<{ companyId?: string }>();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <CompanySwitcher companyId={companyId} />
      </SidebarHeader>
      <SidebarContent>
        {companyId && <NavMain companyId={companyId} />}
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={NAV_USER} companyId={companyId} />
      </SidebarFooter>
    </Sidebar>
  );
}
