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
import { ChevronRight, House, Plus, Trash2 } from "lucide-react"
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

export function AppSidebar() {
  const { workspaceId } = useParams<{
    workspaceId: string
  }>()

  const path = usePathname()

  const { open, setOpen } = useSidebar()

  const [isFormShow, setIsFormShow] = useState(true)

  const { data, isLoading } = useForms()

  const MENU: {
    name: string
    paht: string
    icon: ReactElement
  }[] = [
    {
      name: "Dashboard",
      paht: routes.dashboard.workspace({ workspaceId }),
      icon: <House />,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem className="flex items-center gap-2">
          <Link href={routes.dashboard.base}>
            <img src="/Form-Fluoce.svg" alt="Logo" className="h-8 w-8" />
          </Link>
          {open && <SelectWorkspace />}
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
        {!isLoading && (
          <SidebarGroup className="flex flex-col gap-1">
            <Collapsible defaultOpen onOpenChange={setIsFormShow}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex w-fit cursor-pointer items-center gap-2 hover:bg-muted">
                  Forms
                  <ChevronRight
                    className={cn(isFormShow && "rotate-90", "smooth")}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-1">
                {data?.data?.forms.length ? (
                  data?.data?.forms?.map((f) =>
                    open ? (
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
                    <SidebarMenuButton>
                      <Plus /> Form
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Others</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Trash2 /> Trash
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
