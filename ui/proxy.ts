import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { envs } from "./const/envs"
import { useAuthRefresh } from "./action/auth/refresh"

export default async function proxy(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value

  const accessToken = req.cookies.get("accessToken")?.value

  if (!refreshToken) {
    return NextResponse.redirect(
      `${envs.authUrl}?ref=${envs?.appUrl}&path=${req?.url}`
    )
  }

  if (!accessToken && refreshToken) {
    try {
      const res = await useAuthRefresh({ refreshToken })
      if (res?.success) {
        return NextResponse.next()
      }
    } catch (error) {
      return NextResponse.redirect(
        `${envs.authUrl}?ref=${envs?.appUrl}&path=${req?.url}`
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
