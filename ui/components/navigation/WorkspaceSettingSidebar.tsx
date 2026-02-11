'use client'

import { ReactElement } from 'react'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { WorkspaceSettingTab } from '@/types/type';
import { ArrowLeft, CreditCard, Globe, MessageSquareShare, Settings, Users, Workflow } from 'lucide-react';
import { workspaceRoutes } from '@/const/route-const';
import { WorkspaceSlice } from '@/types/slice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const WorkspaceSettingSidebar = ({ workspace }: { workspace: WorkspaceSlice }) => {

    if (!workspace) {
        return null
    }

    const pathName = usePathname()

    type SidebarMenuTab = {
        label: string;
        value: WorkspaceSettingTab;
        icon: ReactElement
        path: string
    };

    const sidebarMenuTabs: SidebarMenuTab[] = [
        {
            label: "General",
            value: "general",
            icon: <Settings />,
            path: workspaceRoutes.setting(workspace.id, 'general')
        },
        {
            label: "Member",
            value: "member",
            icon: <Users />,
            path: workspaceRoutes.setting(workspace.id, 'member')
        },
        {
            label: "Domain",
            value: "domain",
            icon: <Globe />,
            path: workspaceRoutes.setting(workspace.id, 'domain')
        },
        {
            label: "Integration",
            value: "integration",
            icon: <Workflow />,
            path: workspaceRoutes.setting(workspace.id, 'integration')
        },
        {
            label: "Notification",
            value: "notification",
            icon: <MessageSquareShare />,
            path: workspaceRoutes.setting(workspace.id, 'notification')
        },
        {
            label: "Billing",
            value: "billing",
            icon: <CreditCard />,
            path: workspaceRoutes.setting(workspace.id, 'billing')
        },
    ];

    return (
        <>
            <SidebarGroup>
                <SidebarMenu >
                    <Link href={workspaceRoutes.dash(workspace.id)}>
                        <SidebarMenuItem >
                            <SidebarMenuButton>
                                <ArrowLeft /> Workspace Settings
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </Link>
                </SidebarMenu>
            </SidebarGroup>
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

export default WorkspaceSettingSidebar