import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { RefreshResponse } from "@/types/response"
import { authBackendUrl } from "./const/env-const";
import { authRoutes } from "./const/route-const";
import { nextAuthRedirect } from "./func/next-auth-redirect";
import { cookieOption } from "./utils/cookie-option";


export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname === "/f") {
        return NextResponse.next();
    }

    const rt = req.cookies.get("refreshToken")?.value;
    const at = req.cookies.get("accessToken")?.value;

    if (!rt) {
        return nextAuthRedirect(req.url)
    }

    if (!at && rt) {
        try {
            const res = await fetch(`${authBackendUrl}${authRoutes.rf}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${rt}`,
                },
            });

            if (res.ok) {
                const nextResponse = NextResponse.next();

                const data: RefreshResponse = await res.json();

                if (data.success && data.data) {

                    const { accessToken, refreshToken } = data.data;

                    if (refreshToken) {
                        nextResponse.cookies.set(
                            "refreshToken",
                            refreshToken,
                            cookieOption(59 * 24 * 60 * 60)
                        );
                    }

                    if (accessToken) {
                        nextResponse.cookies.set(
                            "accessToken",
                            accessToken,
                            cookieOption(59 * 60)
                        );
                    }


                } else {
                    return nextAuthRedirect(req.url)
                }

                return nextResponse;

            } else {
                return nextAuthRedirect(req.url)
            }
        } catch (error) {
            return nextAuthRedirect(req.url)
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/dev/:path*"],
};

