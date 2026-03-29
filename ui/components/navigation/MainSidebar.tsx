"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  BookOpen,
  ChevronRight,
  FileText,
  Form,
  House,
  Trash,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import {
  docsRoutes,
  formRoutes,
  trashRoutes,
  workspaceRoutes,
} from "@/const/route-const";
import { useAppSelector } from "@/providers/redux/redux-provider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import useForm from "@/hooks/use-form";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "../shared/Icon";
import CreateForm from "../shared/CreateForm";
import { Skeleton } from "../ui/skeleton";

type MenusType = {
  lable: string;
  path: string;
  icon: LucideIcon;
};

const MainSidebar = () => {
  const pathName = usePathname();

  const [openFormSidebar, setOpenFormSidebar] = useState(true);

  const { selectedWorkspaceId } = useAppSelector((state) => state.workspace);

  const ResourceMenus: MenusType[] = [
    {
      lable: "Documentation",
      path: docsRoutes.base,
      icon: BookOpen,
    },
  ];

  const TrashMenus: MenusType[] = [
    {
      lable: "Forms",
      path: selectedWorkspaceId ? trashRoutes.forms(selectedWorkspaceId) : "#",
      icon: Trash,
    },
    {
      lable: "Workspaces",
      path: selectedWorkspaceId
        ? trashRoutes.workspaces(selectedWorkspaceId)
        : "#",
      icon: Trash,
    },
  ];

  const { forms } = useForm();

  const { data, isLoading } = forms;

  const formList = data?.data?.forms;

  if (!selectedWorkspaceId) {
    return null;
  }

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenuItem>
            <Link href={workspaceRoutes.dash(selectedWorkspaceId)}>
              <SidebarMenuButton
                isActive={pathName.endsWith(
                  workspaceRoutes.dash(selectedWorkspaceId),
                )}
              >
                <Icon icon={House} /> Home
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href={workspaceRoutes.allForm(selectedWorkspaceId)}>
              <SidebarMenuButton
                isActive={pathName.endsWith(
                  workspaceRoutes.allForm(selectedWorkspaceId),
                )}
              >
                <Icon icon={Form} /> All Forms
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarMenu>
          <Collapsible
            defaultOpen={openFormSidebar}
            onOpenChange={setOpenFormSidebar}
          >
            <CollapsibleTrigger asChild className="w-full cursor-pointer">
              <SidebarMenuItem>
                <SidebarGroupLabel>Forms</SidebarGroupLabel>
                <SidebarMenuAction>
                  <ChevronRight
                    className={cn(openFormSidebar && "smooth rotate-90")}
                  />
                </SidebarMenuAction>
              </SidebarMenuItem>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {isLoading ? (
                <SidebarMenuItem className="flex flex-col gap-1">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </SidebarMenuItem>
              ) : formList && formList?.length > 0 ? (
                formList?.map((f) => (
                  <SidebarMenuItem key={f?.id}>
                    <Link
                      href={formRoutes.setting(f?.workspaceId, f?.id, "edit")}
                    >
                      <SidebarMenuButton>
                        <Icon icon={FileText} />
                        {f?.name}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))
              ) : (
                <CreateForm variant="secondary" />
              )}
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarGroupLabel>Trash</SidebarGroupLabel>
          {TrashMenus.map((t) => (
            <SidebarMenuItem key={t.path}>
              <Link href={t.path} key={t.path}>
                <SidebarMenuButton isActive={pathName === t.path}>
                  <Icon icon={t.icon} />
                  {t.lable}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          {ResourceMenus.map((r) => (
            <SidebarMenuItem key={r.path}>
              <Link href={r.path} key={r.path}>
                <SidebarMenuButton>
                  <Icon icon={r.icon} />
                  {r.lable}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default MainSidebar;
