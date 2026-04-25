"use server"

import { cookies } from "next/headers"
import { envs } from "@/const/envs"
import { urls } from "@/const/urls"
import { RefreshResType } from "@/types/res-types"
import { cookieOption } from "@/utils/cookie-option"

export async function useAuthRefresh({
  refreshToken,
}: {
  refreshToken: string
}) {
  const res = await fetch(`${envs.authBackendUrl}${urls.auth.refresh}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })

  if (!res.ok) {
    return {
      success: false,
    }
  }

  let data: RefreshResType

  try {
    data = await res.json()
  } catch (error) {
    return {
      success: false,
    }
  }

  if (data.success && data.data) {
    const cookieStore = await cookies()

    const { accessToken, refreshToken } = data.data

    cookieStore.set({
      name: "accessToken",
      value: `${accessToken}`,
      ...cookieOption(14 * 60),
    })

    cookieStore.set({
      name: "refreshToken",
      value: `${refreshToken}`,
      ...cookieOption(59 * 24 * 60 * 60),
    })
  }

  return {
    success: true,
  }
}
