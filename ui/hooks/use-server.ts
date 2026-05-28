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

  const accessToken = cookieStore.get("accessToken")

  const refreshToken = cookieStore.get("refreshToken")

  let at = accessToken?.value

  let rt = refreshToken?.value

  if (!rt) {
    redirect(authRedirect)
  }

  if (!at && rt) {
    const tokenResponse = await refresh(rt)

    if ("status" in tokenResponse && tokenResponse?.status == 401) {
      redirect(authRedirect)
    }

    if ("accessToken" in tokenResponse && "refreshToken" in tokenResponse) {
      at = tokenResponse.accessToken

      rt = tokenResponse.refreshToken
    }
  }

  let res = await dataFetch({ endpoint, at: at!, method, body })

  let data: ResType | null = null

  let contentType = res.headers.get("content-type")

  if (res.status === 401) {
    const tokenResponse = await refresh(rt)

    if ("status" in tokenResponse && tokenResponse?.status == 401) {
      redirect(authRedirect)
    }

    if ("accessToken" in tokenResponse && "refreshToken" in tokenResponse) {
      at = tokenResponse.accessToken

      rt = tokenResponse.refreshToken

      if (!at) {
        redirect(authRedirect)
      }

      res = await dataFetch({ endpoint, at, method, body })

      contentType = res.headers.get("content-type")

      if (res.status === 401) {
        redirect(authRedirect)
      }
    }
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
): Promise<
  | { accessToken: string; refreshToken: string }
  | {
      status: number
    }
> => {
  const res = await fetch(`${envs.authBackendUrl}${urls.auth.refresh}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${rt}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return {
      status: res.status,
    }
  }

  let data: RefreshResType

  try {
    data = await res.json()
  } catch (error) {
    return {
      status: res.status,
    }
  }

  if (data?.success && data?.data) {
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
    return {
      status: res.status,
    }
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
    cache: "no-store",
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
