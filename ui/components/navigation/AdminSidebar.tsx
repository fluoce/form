"use client";

import Link from "next/link";
import Logo from "../shared/Logo";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { useAppSelector } from "@/providers/redux/redux-provider";
import ProfileBtn from "../shared/ProfileBtn";
import { Square } from "lucide-react";
import SelectWorkspace from "../shared/SelectWorkspace";

const AdminSidebar = () => {

  const { user } = useAppSelector(state => state.user)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2 justify-between">
          <Link href="/admin" className="w-10">
            <Logo />
          </Link>
          <SelectWorkspace />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Square />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {user && <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10">
              <ProfileBtn />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      }
    </Sidebar>
  );
};

export default AdminSidebar;
