'use client'

import { useAppSelector } from "@/providers/redux/redux-provider"
import { SidebarFooter as SF, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import ProfileBtn from "./ProfileBtn"

const SidebarFooter = () => {

    const { user } = useAppSelector(state => state.user)

    return (
        user ?
            <SF className="border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="h-10 px-0">
                            <ProfileBtn />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SF>
            :
            null
    )
}

export default SidebarFooter