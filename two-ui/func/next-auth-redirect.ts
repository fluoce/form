import { NextResponse } from "next/server";
import { appUrl, authUrl } from "@/const/env-const";

export const nextAuthRedirect = (reqUrl: string) => {
  return NextResponse.redirect(
    new URL(
      `${authUrl}?ref=${encodeURIComponent(appUrl)}&path=${encodeURIComponent(reqUrl)}`,
    ),
  );
};
