'use client';

import Link from 'next/link';
import { LuBox, LuCheck, LuChevronsUpDown, LuPlus } from 'react-icons/lu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCompanies } from '@/services/queries/companies';
import type { CompanySwitcherProps } from './company-switcher.types';

export function CompanySwitcher({ companyId }: CompanySwitcherProps) {
  const { isMobile } = useSidebar();
  const { data: companies, isPending } = useGetCompanies();

  if (isPending) return <Skeleton className="h-12 w-full" />;

  const current = companies?.find(({ id }) => String(id) === companyId);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <LuBox className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {current?.name ?? 'goclients'}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {current
                    ? current.address || 'Компания'
                    : 'Выберите компанию'}
                </span>
              </div>
              <LuChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Компании
            </DropdownMenuLabel>
            {companies?.map((company) => (
              <DropdownMenuItem key={company.id} asChild>
                <Link href={`/dashboard/${company.id}`}>
                  <span className="truncate">{company.name}</span>
                  {String(company.id) === companyId && (
                    <LuCheck className="ml-auto size-4" />
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <LuPlus className="size-4" />
                Все компании
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
