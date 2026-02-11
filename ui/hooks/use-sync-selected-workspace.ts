'use client'

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { workspaceIdKey } from "@/const/localstorage-key"
import useLocalStorage from "./use-localstorage"
import { useDispatch } from "react-redux"
import { setWorkspaceId } from "@/store/slice/workspace-slice"
import { WorkspaceSlice } from "@/types/slice"

export function useSyncSelectedWorkspace(workspaceList: WorkspaceSlice[]) {

    const router = useRouter()

    const params = useParams<{ workspaceId?: string }>()

    const dispatch = useDispatch()

    const { setValue } = useLocalStorage()

    useEffect(() => {
        if (!workspaceList || workspaceList.length === 0) return

        if (params?.workspaceId && workspaceList.some((workspace) => workspace.id == params.workspaceId)) {
            setValue({
                key: workspaceIdKey,
                data: params.workspaceId
            })
            dispatch(setWorkspaceId(params.workspaceId))
            return
        }

        const firstWorkspaceId = workspaceList[0].id

        setValue({
            key: workspaceIdKey,
            data: firstWorkspaceId
        })

        dispatch(setWorkspaceId(firstWorkspaceId))

        router.replace(`/dash/${firstWorkspaceId}`)

    }, [workspaceList, params?.workspaceId, router])
}