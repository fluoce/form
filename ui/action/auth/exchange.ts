"use server"

import { envs } from "@/const/envs"
import { urls } from "@/const/urls"
import { RefreshResType } from "@/types/res-types"
import { cookieOption } from "@/utils/cookie-option"
import { cookies } from "next/headers"

export async function useAuthExchange({ code }: { code: string }) {
  if (!code) {
    return {
      success: false,
    }
  }

  const res = await fetch(`${envs.authBackendUrl}${urls.auth.exchange}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
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
