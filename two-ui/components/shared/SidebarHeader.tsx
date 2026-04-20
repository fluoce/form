"use client";

import Link from "next/link";
import Logo from "./Logo";
import SelectWorkspace from "./SelectWorkspace";
import { SidebarHeader as SH } from "../ui/sidebar";
import { workspaceRoutes } from "@/const/route-const";
import { useAppSelector } from "@/providers/redux/redux-provider";

const SidebarHeader = () => {
  const { selectedWorkspaceId } = useAppSelector((state) => state.workspace);

  const route = selectedWorkspaceId
    ? workspaceRoutes.dash(selectedWorkspaceId)
    : workspaceRoutes.create;

  return (
    <SH>
      <div className="flex items-center justify-between gap-2 p-2">
        <Link href={route} className="shrink-0">
          <Logo />
        </Link>
        <div className="min-w-0 flex-1">
          <SelectWorkspace />
        </div>
      </div>
    </SH>
  );
};
export default SidebarHeader;
