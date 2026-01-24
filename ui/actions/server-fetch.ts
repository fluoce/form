"use server";

import { cookies } from "next/headers";
import type { RefreshResponse, ResponseType } from "@/types/response"
import { appUrl, authBackendUrl, backendUrl } from "@/const/env-const";
import { authRoutes } from "@/const/route-const";
import { nextAuthRedirect } from "@/func/next-auth-redirect";
import { cookieOption } from "@/utils/cookie-option";
import type { NextResponse } from "next/server";

interface ServerFetchProps {
    url: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: {}
    path?: string;
}

export async function serverFetch({
    url,
    method,
    path,
    body
}: ServerFetchProps): Promise<ResponseType> {

    const cookieStore = await cookies()

    let at = cookieStore.get("accessToken")?.value
    let rt = cookieStore.get("refreshToken")?.value

    if (!at && rt) {
        try {
            const res = await fetch(`${authBackendUrl}${authRoutes.rf}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${rt}`,
                },
            });

            if (!res.ok) {
                return {
                    success: false
                }
            }

            let data: RefreshResponse

            try {
                data = await res.json();
            } catch (error) {
                return {
                    success: false
                }
            }

            if (data.success && data.data) {

                const cookieStore = await cookies()

                const { accessToken, refreshToken } = data.data;

                at = accessToken;

                rt = refreshToken;

                cookieStore.set({
                    name: "accessToken",
                    value: `${accessToken}`,
                    ...cookieOption(59 * 60)
                })

                cookieStore.set({
                    name: "refreshToken",
                    value: `${refreshToken}`,
                    ...cookieOption(59 * 24 * 60 * 60)
                })

            } else {
                //@ts-ignore
                return nextAuthRedirect(`${appUrl}/${path}`)
            }
        } catch (error) {
            //@ts-ignore
            return nextAuthRedirect(`${appUrl}/${path}`)
        }
    }

    const res = await fetch(`${backendUrl}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(at && { Authorization: `Bearer ${at}` }),
        },
        ...(method !== "GET" && body && { body: JSON.stringify(body) })
    })

    let data: ResponseType | null = null;

    const contentType = res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        try {
            data = await res.json();
        } catch {
            data = null;
        }
    }

    if (!res.ok) {
        return (
            data ?? {
                success: false,
                message: "Something went wrong, try again in a moment.",
            }
        );
    }

    return (
        data ?? {
            success: true,
        }
    );

}