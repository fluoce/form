"use client"

import { PageSpinner } from "@/components/shared/loader-r"
import { localStorageKey } from "@/const/local-storage-key"
import { routes } from "@/const/routes"
import useLocalStorage from "@/hooks/use-local-storage"
import { useWorkspaces } from "@/hooks/use-workspace"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function WorkspaceGuard({ children }: { children: ReactNode }) {
  const router = useRouter()

  const { data, isLoading } = useWorkspaces()

  const path = usePathname()

  const { value, setValue } = useLocalStorage<string>({
    key: localStorageKey.selectedWorkspace,
  })

  useEffect(() => {
    if (isLoading) return

    if (data && data?.data?.workspaces.length) {
      let workspaceId: string = ""

      if (value) {
        const exists = data?.data?.workspaces?.some((ws) => ws?.id === value)
        workspaceId = exists ? value : data?.data?.workspaces?.[0]?.id
      } else {
        workspaceId = data?.data?.workspaces?.[0]?.id
        setValue(workspaceId)
      }

      if (path.includes(routes.dashboard.createWorkspace)) {
        router.replace(
          routes.dashboard.workspace({
            workspaceId,
          })
        )
      }
    } else {
      router.replace(routes.dashboard.createWorkspace)
    }
  }, [data, isLoading])

  if (isLoading) return <PageSpinner />

  if (!data?.data?.workspaces) {
    return null
  }

  return <>{children}</>
}
