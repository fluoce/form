'use server';

import { cookies } from "next/headers";
import { authBackendUrl } from "@/const/env-const";

export async function logoutAction() {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    cookieStore.delete("accessToken");

    cookieStore.delete("refreshToken");

    if (refreshToken) {
        try {
            await fetch(`${authBackendUrl}/logout`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${refreshToken}`
                },
            });
        } catch {
            // Fail-open: logout should still succeed locally
        }
    }


    return { success: true };
}
