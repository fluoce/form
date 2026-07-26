"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { routes } from "@/const/routes"
import Link from "next/link"
import { SelectWorkspace } from "../workspace/select-workspace"
import { ReactElement, useState } from "react"
import { NavUser } from "./nav-user"
import { useParams, usePathname } from "next/navigation"
import {
  BadgeInfo,
  ChevronRight,
  Form,
  House,
  Plus,
  Trash2,
} from "lucide-react"
import { useForms } from "@/hooks/use-form"
import { Avatar, AvatarFallback } from "../ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { CreateUpdateForm } from "../form/create-update-form"
import { Skeleton } from "../ui/skeleton"

type MenuType = {
  name: string
  paht: string
  icon: ReactElement
}

export function AppSidebar() {
  const { workspaceId } = useParams<{
    workspaceId: string
  }>()

  const path = usePathname()

  const { open, setOpen, state, openMobile } = useSidebar()

  const [isFormShow, setIsFormShow] = useState(true)

  const { data, isLoading } = useForms()

  const MENU: MenuType[] = [
    {
      name: "Dashboard",
      paht: routes.dashboard.workspace({ workspaceId }),
      icon: <House />,
    },
  ]

  const OTHERS_MENU: MenuType[] = [
    {
      name: "Trash",
      paht: routes.dashboard.trash({ workspaceId }),
      icon: <Trash2 />,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem className="flex items-center gap-2">
          <Link href={routes.dashboard.base}>
            <img src="/Form-Fluoce.svg" alt="Logo" className="h-8 w-8" />
          </Link>
          {(open || openMobile) && <SelectWorkspace />}
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-1">
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          {MENU?.map((m) => (
            <Link key={m?.paht} href={m.paht}>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={path == m.paht}>
                  {m?.icon}
                  {m?.name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarGroup>
        <SidebarGroup className="flex flex-col gap-1">
          <Collapsible defaultOpen onOpenChange={setIsFormShow}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel
                className={cn(
                  "mb-1 flex w-fit cursor-pointer items-center gap-2",
                  isFormShow ? "hover:bg-sidebar-accent" : "bg-sidebar-accent"
                )}
              >
                Forms
                <ChevronRight
                  className={cn(isFormShow && "rotate-90", "smooth")}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-1">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton className="p-0">
                      <Skeleton className="h-full w-full" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : data?.data?.forms.length ? (
                data?.data?.forms?.map((f) =>
                  state == "expanded" ? (
                    <Link
                      key={f?.id}
                      href={routes.form.byId({
                        workspaceId,
                        formId: f?.id,
                      })}
                      onClick={() => setOpen(false)}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={path.includes(f?.id)}
                          className="truncate"
                        >
                          <Avatar className={`${f?.theme} size-4`}>
                            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                              {f?.name.slice(0, 1).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {f?.name}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  ) : (
                    <Tooltip key={f?.id}>
                      <TooltipTrigger asChild>
                        <Link
                          href={routes.form.byId({
                            workspaceId,
                            formId: f?.id,
                          })}
                          onClick={() => setOpen(false)}
                        >
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={path.includes(f?.id)}
                              className="truncate"
                            >
                              <Avatar className={`${f?.theme} size-4`}>
                                <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                                  {f?.name.slice(0, 1).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              {f?.name}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center">
                        {f?.name}
                      </TooltipContent>
                    </Tooltip>
                  )
                )
              ) : (
                <SidebarMenuItem>
                  <CreateUpdateForm>
                    <SidebarMenuButton>
                      <Plus /> Form
                    </SidebarMenuButton>
                  </CreateUpdateForm>
                </SidebarMenuItem>
              )}
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Others</SidebarGroupLabel>
          {OTHERS_MENU?.map((m) => (
            <Link key={m?.paht} href={m.paht}>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={path == m.paht}>
                  {m?.icon}
                  {m?.name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {(open || openMobile) && <InfoCard />}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

function InfoCard() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border-2 p-3 text-xs">
      <span className="flex items-center gap-2 font-medium">
        <BadgeInfo size={14} className="text-blue-600" /> Test Mode Enabled
      </span>
      <span className="text-muted-foreground">
        This app is currently in test mode. Some features may not work as
        expected, so avoid using important or sensitive data for now.
      </span>
    </div>
  )
}
