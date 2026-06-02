"use server"

import { envs } from "@/const/envs"
import { urls } from "@/const/urls"
import { cookies } from "next/headers"

export async function useAuthLogout() {
  const cookieStore = await cookies()

  const refreshToken = cookieStore.get("refreshToken")?.value

  cookieStore.delete("accessToken")

  cookieStore.delete("refreshToken")

  if (refreshToken) {
    try {
      await fetch(`${envs.authBackendUrl}${urls.auth.logout}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    } catch {}
  }

  return { success: true }
}
