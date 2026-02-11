"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "../ui/sidebar";
import SidebarFooter from "../shared/SidebarFooter";
import SidebarHeader from "../shared/SidebarHeader";
import { ReactNode } from "react";

const CSidebar = ({ children }: { children: ReactNode }) => {

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarRail />
        {children}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default CSidebar;
