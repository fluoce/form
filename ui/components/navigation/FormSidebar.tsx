'use client'

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { ArrowLeft, LayoutDashboard, Settings } from 'lucide-react'
import Link from 'next/link'
import { formRoutes, workspaceRoutes } from '@/const/route-const'
import { useAppSelector } from '@/providers/redux/redux-provider'
import { useParams, usePathname } from 'next/navigation'
import { formSettingTab } from '@/types/type'
import { ReactElement } from 'react'

const FormSidebar = () => {

    const { formId } = useParams<{ formId: string }>()

    if (!formId) {
        return null
    }

    const pathName = usePathname()

    const { selectedWorkspaceId } = useAppSelector(state => state.workspace)

    if (!selectedWorkspaceId) {
        return null
    }


    type SidebarMenuTab = {
        label: string;
        value: formSettingTab;
        icon: ReactElement
        path: string
    };

    const sidebarMenuTabs: SidebarMenuTab[] = [
        {
            label: "General",
            value: "general",
            icon: <Settings />,
            path: formRoutes.setting(selectedWorkspaceId, formId, 'general')
        },
    ];

    return (
        <>
            <SidebarGroup>
                <SidebarMenu >
                    <Link href={workspaceRoutes.allForm(selectedWorkspaceId)}>
                        <SidebarMenuItem >
                            <SidebarMenuButton>
                                <ArrowLeft /> Form Management
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </Link>
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href={formRoutes.formDash(selectedWorkspaceId, formId)}>
                            <SidebarMenuButton
                                isActive={pathName == formRoutes.formDash(selectedWorkspaceId, formId)}
                            >
                                <LayoutDashboard /> Dashboard
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroup>
                <SidebarMenu>
                    {sidebarMenuTabs.map((tab) =>
                        <SidebarMenuItem key={tab.path}>
                            <Link href={tab.path}>
                                <SidebarMenuButton isActive={pathName === tab.path}>
                                    {tab.icon}{tab.label}
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </SidebarGroup>
        </>
    )
}

export default FormSidebar