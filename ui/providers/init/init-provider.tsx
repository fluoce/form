"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/redux-provider";
import { authUrl, appUrl } from "@/const/env-const";
import { useRouter } from "next/navigation";
import { UserSlice } from "@/types/slice";
import { setUser } from "@/store/shared/user-slice";
import { BlueSpinner } from "@/components/shared/Loader";

export const InitProvider = ({ children }: { children: ReactNode }) => {

    const router = useRouter()

    const dispatch = useAppDispatch()

    const [pending, setPending] = useState(false)

    const { user } = useAppSelector(state => state.user)

    useEffect(() => {
        if (user) {
            setPending(false);
            return;
        }

        setPending(true);

        const loadMe = async () => {
            try {
                const res = await fetch("/api/me", {
                    method: "GET",
                });

                if (!res.ok) {
                    router.replace(authUrl + `?ref=${appUrl}`);
                    return;
                }

                const data: { success: boolean; user: UserSlice } = await res.json();

                if (data?.success && data.user) {
                    dispatch(setUser(data.user));
                } else {
                    router.replace(authUrl + `?ref=${appUrl}`);
                }

            } finally {
                setPending(false);
            }
        };

        loadMe();

    }, [])

    if (pending) {
        return (
            <div className="relative h-screen flex items-center w-full justify-center">
                <BlueSpinner />
            </div>
        )
    }

    return children;
}

