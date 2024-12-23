'use client';

import * as React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import getRouteByRole from '@/lib/routes/routes';

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar & { role: string }>) {
  const navMain = getRouteByRole(props.role || '');
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">ViaProxy</span>
            <span className="truncate text-xs">{props.role}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
