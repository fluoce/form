"use client"

import { useAuthExchange } from "@/action/auth/exchange"
import { PageSpinner } from "@/components/shared/loader"
import { routes } from "@/const/routes"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Auth() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const code = searchParams.get("code")

  const path = searchParams.get("path")

  const exchange = async (c: string) => {
    const result = await useAuthExchange({
      code: c,
    })
    if (result?.success) {
      if (path) {
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
