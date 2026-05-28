"use client"

import { useAuthExchange } from "@/action/auth/exchange"
import { PageSpinner } from "@/components/shared/loader-r"
import { routes } from "@/const/routes"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

function Auth() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const code = searchParams.get("code")

  let path = searchParams.get("path")
  if (!path || path === "null" || path === "undefined") {
    path = null
  }

  const exchange = async (c: string) => {
    const result = await useAuthExchange({
      code: c,
    })
    if (result?.success) {
      if (
        typeof path === "string" &&
        path.trim() &&
        path !== "null" &&
        path !== "undefined"
      ) {
        router.replace(path)
      } else {
        router.replace(routes.dashboard.base)
      }
    } else {
      router.replace(routes.dashboard.base)
    }
  }

  useEffect(() => {
    if (code) {
      exchange(code)
    }
  }, [code])

  return <PageSpinner />
}

export default function AuthPage() {
  return (
    <Suspense>
      <Auth />
    </Suspense>
  )
}
