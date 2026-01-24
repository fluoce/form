"use client"

import { exchangeCode } from "@/actions/exchange-code";
import { BlueSpinner } from "@/components/shared/Loader";
import { useAppDispatch } from "@/providers/redux/redux-provider";
import { setUser } from "@/store/shared/user-slice";
import { UserSlice } from "@/types/slice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {

  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  let path = searchParams.get("path");

  if (!path || path === "null" || path === "undefined") {
    path = null;
  }

  const router = useRouter()

  const dispatch = useAppDispatch()

  if (!code) {
    if (path) {
      router.replace(path)
    } else {
      router.replace("/")
    }
    return
  }

  const exchange = async () => {
    const data = await exchangeCode(code)
    if (data.success) {

      const res = await fetch(`/api/me`, {
        method: "GET"
      });

      if (!res.ok) {
        path ? router.replace(path) : router.replace("/")
      }
      const data: { success: boolean, user: UserSlice } = await res.json()

      if (data) {

        dispatch(setUser(data.user))

        path ? router.replace(path) : router.replace("/")
      } else {

        path ? router.replace(path) : router.replace("/")
      }
    } else {
      path ? router.replace(path) : router.replace("/")
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      exchange()
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative h-screen flex items-center w-full justify-center">
      <BlueSpinner />
    </div>
  )
}
