"use server"

import { useAuthCookies } from "@/action/auth/cookies"
import { useAuthRefresh } from "@/action/auth/refresh"
import { envs } from "@/const/envs"
import { routes } from "@/const/routes"
import { ResType } from "@/types/res-types"
import { redirect } from "next/navigation"

interface ServerProps {
  url: string
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: {}
  path?: string
  auth?: boolean
}

export default async function UseServer({
  url,
  method,
  auth = false,
  body,
  path = routes.dashboard.base,
}: ServerProps) {
  const authRedirect = path
    ? `${envs.authUrl}?ref=${encodeURIComponent(envs.appUrl)}&path=${encodeURIComponent(path)}`
    : `${envs.authUrl}?ref=${encodeURIComponent(envs.appUrl)}`

  const endpoint = auth
    ? `${envs.authBackendUrl}${url}`
    : `${envs.backendUrl}${url}`

  let at: string
  let rt: string

  try {
    const cookiesRes = await useAuthCookies()

    const cookiesData = await cookiesRes.json()

    at = cookiesData.at
    rt = cookiesData.rt
  } catch (e) {
    at = ""
    rt = ""
  }

  if (!rt) {
    redirect(authRedirect)
  }

  if (!at && rt) {
    const tokenResponse = await useAuthRefresh({ refreshToken: rt })
    if (!tokenResponse || !tokenResponse.success || !tokenResponse.data) {
      redirect(authRedirect)
    }
    at = tokenResponse.data.accessToken
    rt = tokenResponse.data.refreshToken
  }

  let res = await dataFetch({
    endpoint,
    at,
    method,
    body,
  })

  let data: ResType | null = null
  let contentType = res.headers.get("content-type")

  if (res.status == 401) {
    const tokenResponse = await useAuthRefresh({ refreshToken: rt })
    if (!tokenResponse || !tokenResponse.success || !tokenResponse.data) {
      redirect(authRedirect)
    }
    at = tokenResponse.data.accessToken
    rt = tokenResponse.data.refreshToken
    res = await dataFetch({
      endpoint,
      at: tokenResponse.data.accessToken,
      method,
      body,
    })
    contentType = res.headers.get("content-type")
  }

  if (contentType?.includes("application/json")) {
    try {
      data = await res.json()
    } catch {
      data = null
    }
  }

  if (!res.ok) {
    return {
      success: false,
      message: normalizeErrorMessage(data?.message),
      statusCode: res.status,
    }
  }

  return (
    data ?? {
      success: true,
    }
  )
}

const dataFetch = async ({
  endpoint,
  at,
  method,
  body,
}: {
  endpoint: string
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  at: string
  body?: {}
}): Promise<Response> => {
  return await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${at}`,
    },
    ...(body && { body: JSON.stringify(body) }),
  })
}

function normalizeErrorMessage(
  message: unknown,
  fallback = "Something went wrong, try again."
): string {
  if (typeof message === "string") {
    return message
  }
  if (Array.isArray(message)) {
    return typeof message[0] === "string" ? message[0] : fallback
  }
  return fallback
}
