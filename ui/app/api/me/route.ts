import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authBackendUrl } from "@/const/env-const";
import { ResponseType } from "@/types/response";

export async function GET() {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return NextResponse.json(
            { success: false, message: "Unauthenticated" },
            { status: 401 }
        );
    }

    const res = await fetch(`${authBackendUrl}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch user" },
            { status: 401 }
        );
    }

    const data: ResponseType = await res.json();

    if (!data.success) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch user" },
            { status: 401 }
        );
    }

    return NextResponse.json({ success: true, user: data.data });
}
