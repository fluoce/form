'use client'

import { CreateWorkspace } from '@/components/shared/CreateWorkspace'
import { BlueSpinner } from '@/components/shared/Loader'
import { workspaceIdKey } from '@/const/localstorage-key'
import { workspaceRoutes } from '@/const/route-const'
import useLocalStorage from '@/hooks/use-localstorage'
import useWorkspace from '@/hooks/use-workspace'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

const WorkspaceInit = () => {
    const { workspaces } = useWorkspace()

    const { data, isLoading } = workspaces

    const { getValue } = useLocalStorage()

    useEffect(() => {
        if (data && data.data?.workspaces && data.data.workspaces.length > 0) {

            const workspaceList = data.data.workspaces

            const storedWorkspaceId = getValue(workspaceIdKey)

            const storedWorkspaceInList = workspaceList.find(
                (ws) => ws.id === storedWorkspaceId
            )

            if (storedWorkspaceId && storedWorkspaceInList) {
                setTimeout(() => redirect(workspaceRoutes.dash(storedWorkspaceId)), 0)
            } else {
                setTimeout(() => redirect(workspaceRoutes.dash(workspaceList[0].id)), 0)
            }
        }

    }, [data, getValue])

    if (isLoading) {
        return (
            <div className="relative h-screen flex items-center w-full justify-center p-4">
                <BlueSpinner />
            </div>
        )
    }

    if (!data?.data?.workspaces || data.data.workspaces.length == 0) {
        return (
            <div className="relative h-screen flex items-center w-full justify-center p-4">
                <CreateWorkspace page={true} />
            </div>
        )
    }

    return null
}

export default WorkspaceInit
