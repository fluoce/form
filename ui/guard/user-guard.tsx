"use client"

import { PageSpinner } from "@/components/shared/loader-r"
import { routes } from "@/const/routes"
import { useUser } from "@/hooks/use-user"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function UserGuard({ children }: { children: ReactNode }) {
  const router = useRouter()

  const path = usePathname()

  const { data, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && !data?.data) {
      router.push(routes.dashboard.base)
    }
  }, [isLoading, data, router])

  if (isLoading) {
    return <PageSpinner />
  }

  if (!data?.data) {
    return null
  }

  return <>{children}</>
}
