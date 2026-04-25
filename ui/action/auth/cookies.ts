"use server"

import { cookies } from "next/headers"

export async function useAuthCookies() {
  const cookieStore = await cookies()

  let at = cookieStore.get("accessToken")?.value!

  let rt = cookieStore.get("refreshToken")?.value!

  return Response.json({
    at,
    rt,
  })
}
