"use client";

import { exchangeCode } from "@/actions/exchange-code";
import { BlueSpinner } from "@/components/shared/Loader";
import useMe from "@/hooks/use-me";
import { useAppDispatch } from "@/providers/redux/redux-provider";
import { setUser } from "@/store/slice/user-slice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  let path = searchParams.get("path");

  if (!path || path === "null" || path === "undefined") {
    path = null;
  }

  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!code) {
      path ? router.replace(path) : router.replace("/");
      return;
    }
    const exchange = async () => {
      try {
        const data = await exchangeCode(code);

        if (data.success) {
          const { data } = useMe().me;

          dispatch(setUser(data?.data));

          path ? router.replace(path) : router.replace("/");
        } else {
          path ? router.replace(path) : router.replace("/");
        }
      } catch (err) {
        path ? router.replace(path) : router.replace("/");
      }
    };

    setTimeout(() => {
      exchange();
    }, 2000);
  }, [code, path, router, dispatch]);

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <BlueSpinner />
    </div>
  );
}
