'use server'

import { authBackendUrl } from "@/const/env-const";
import { authRoutes } from "@/const/route-const";
import { RefreshResponse } from "@/types/response";
import { cookieOption } from "@/utils/cookie-option";
import { cookies } from "next/headers"

export async function exchangeCode(code: string) {

    if (!code) {
        return {
            success: false
        }
    }

    const res = await fetch(`${authBackendUrl}${authRoutes.ex}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
    });

    if (!res.ok) {
        return {
            success: false
        }
    }

    let data: RefreshResponse;

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

    }

    return {
        success: true
    }
}
