"use server"

import { envs } from "@/const/envs"
import { routes } from "@/const/routes"
import { urls } from "@/const/urls"
import { RefreshResType, ResType } from "@/types/res-types"
import { cookieOption } from "@/utils/cookie-option"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface ServerProps {
  url: string
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: {}
  path?: string
  auth?: boolean
}

let isRefreshing = false

let failedQueue: Array<{
  resolve: () => void
  reject: (err: unknown) => void
}> = []

function processQueue(error?: unknown) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve()
  })
  failedQueue = []
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

  const cookieStore = await cookies()

  let at = cookieStore.get("accessToken")?.value!
  let rt = cookieStore.get("refreshToken")?.value!

  if (!rt) {
    redirect(authRedirect)
  }

  if (!at && rt) {
    const tokenRespaonse = await refresh(rt)
    if (!tokenRespaonse) {
      redirect(authRedirect)
    }
    at = tokenRespaonse.accessToken
    rt = tokenRespaonse.refreshToken
  }

  const makeRequest = () =>
    dataFetch({
      endpoint,
      at,
      method,
      body,
    })

  let res = await makeRequest()

  let data: ResType | null = null

  let contentType = res.headers.get("content-type")

  if (res.status === 401) {
    if (!isRefreshing) {
      try {
        isRefreshing = true
        const tokenResponse = await refresh(rt)
        if (tokenResponse) {
          at = tokenResponse.accessToken
          rt = tokenResponse.refreshToken
        } else {
          processQueue(new Error("Refresh token invalid"))
          redirect(authRedirect)
        }
        processQueue()
      } catch (err) {
        processQueue(err)
        throw err
      } finally {
        isRefreshing = false
      }
    } else {
      await new Promise<void>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
    }
    res = await makeRequest()
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

const refresh = async (
  rt: string
): Promise<{ accessToken: string; refreshToken: string } | false> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const res = await fetch(`${envs.authBackendUrl}${urls.auth.refresh}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${rt}`,
      },
    })

    if (!res.ok) {
      return false
    }

    let data: RefreshResType

    try {
      data = await res.json()
    } catch (error) {
      return false
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

      return {
        accessToken,
        refreshToken,
      }
    } else {
      return false
    }
  } catch (error) {
    return false
  }
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
