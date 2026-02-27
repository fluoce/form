'use client'

import { SidebarGroup, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '../ui/sidebar'
import { ChevronRight, Form, House } from 'lucide-react'
import Link from 'next/link'
import { formRoutes, workspaceRoutes } from '@/const/route-const'
import { useAppSelector } from '@/providers/redux/redux-provider'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import useForm from '@/hooks/use-form'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const MainSidebar = () => {

    const router = useRouter()

    const pathName = usePathname()

    const [openFormSidebar, setOpenFormSidebar] = useState(false)

    const { selectedWorkspaceId } = useAppSelector(state => state.workspace)

    const { forms } = useForm()

    const { data } = forms

    const formList = data?.data?.forms

    if (!selectedWorkspaceId) {
        return null
    }

    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href={workspaceRoutes.dash(selectedWorkspaceId)}>
                        <SidebarMenuButton
                            isActive={pathName.endsWith(workspaceRoutes.dash(selectedWorkspaceId))}
                        >
                            <House /> Home
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <Collapsible defaultOpen={openFormSidebar} onOpenChange={setOpenFormSidebar}>
                    <CollapsibleTrigger asChild className='w-full'>
                        <SidebarMenuItem>
                            <Link href={workspaceRoutes.allForm(selectedWorkspaceId)}>
                                <SidebarMenuButton
                                    isActive={pathName.endsWith(workspaceRoutes.allForm(selectedWorkspaceId))}
                                >
                                    <Form />  All Forms
                                </SidebarMenuButton>
                            </Link>
                            <SidebarMenuAction
                                onClick={() => {
                                    setOpenFormSidebar(!openFormSidebar)
                                }}
                                className={cn(openFormSidebar ? 'bg-muted' : '')}
                            >
                                <ChevronRight className={cn("smooth", openFormSidebar ? 'rotate-90' : '')} />
                            </SidebarMenuAction>
                        </SidebarMenuItem>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='mt-1'>
                        {formList?.map((form) => (
                            <SidebarMenuSub
                                key={form.id}
                            >
                                <SidebarMenuSubItem >
                                    <SidebarMenuSubButton
                                        onClick={() => {
                                            router.push(formRoutes.formDash(selectedWorkspaceId, form.id))
                                        }}
                                    >
                                        {form.name}
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup >
    )
}

export default MainSidebar