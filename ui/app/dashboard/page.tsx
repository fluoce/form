"use client"

import { PageSpinner } from "@/components/shared/loader-r"
import { localStorageKey } from "@/const/local-storage-key"
import { routes } from "@/const/routes"
import useLocalStorage from "@/hooks/use-local-storage"
import { useWorkspaces } from "@/hooks/use-workspace"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function page() {
  const router = useRouter()

  const { data } = useWorkspaces()

  const { value, setValue } = useLocalStorage<string>({
    key: localStorageKey.selectedWorkspace,
  })

  useEffect(() => {
    if (data && data?.data?.workspaces.length) {
      let workspaceId: string = ""

      if (value) {
        const exists = data?.data?.workspaces?.some((ws) => ws?.id === value)
        workspaceId = exists ? value : data?.data?.workspaces?.[0]?.id
      } else {
        workspaceId = data?.data?.workspaces?.[0]?.id
        setValue(workspaceId)
      }

      router.replace(
        routes.dashboard.workspace({
          workspaceId,
        })
      )
    } else {
      router.replace(routes.dashboard.createWorkspace)
    }
  }, [data])

  return <PageSpinner />
}
