"use client";

import { ReactNode, useEffect } from "react";
import { BlueSpinner } from "@/components/shared/Loader";
import useMe from "@/hooks/use-me";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/user-slice";
import { useAppSelector } from "../redux/redux-provider";
import NoData from "@/components/shared/NoData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpLeft } from "lucide-react";

export const InitProvider = ({ children }: { children: ReactNode }) => {
  const { me } = useMe();

  const { data, isLoading, isError } = me;

  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isLoading || user) return;
    dispatch(setUser(data?.data));
  }, [isLoading, data]);

  if (isError) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center">
        <NoData
          description={
            "We couldn't load your profile at this time. Please check your internet connection, refresh the page, or try again later."
          }
          actions={
            <Link href={"/"}>
              <Button>
                <ArrowUpLeft /> Go Back
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center">
        <BlueSpinner />
      </div>
    );
  }

  return children;
};
