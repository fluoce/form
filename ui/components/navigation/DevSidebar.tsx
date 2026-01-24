"use client";

import { Square } from "lucide-react";
import Logo from "../shared/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import ProfileBtn from "../shared/ProfileBtn";
import Link from "next/link";
import { useAppSelector } from "@/providers/redux/redux-provider";
import SelectWorkspace from "../shared/SelectWorkspace";

const DevSidebar = () => {

  const { user } = useAppSelector(state => state.user)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2 justify-between">
          <Link href="/dev" className="w-10">
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
            <SidebarMenuButton className="h-10 px-0">
              <ProfileBtn />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      }
    </Sidebar>
  );
};

export default DevSidebar;
