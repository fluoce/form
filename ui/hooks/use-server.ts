"use server";

import { cookies } from "next/headers";
import type { RefreshResponse, ResponseType } from "@/types/response";
import { appUrl, authBackendUrl, authUrl, backendUrl } from "@/const/env-const";
import { workspaceRoutes } from "@/const/route-const";
import { cookieOption } from "@/utils/cookie-option";
import { normalizeErrorMessage } from "@/func/normalize-error-message";
import { redirect } from "next/navigation";
import { authRoutes } from "@/const/url-path";

interface ServerFetchProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: {};
  path?: string;
  auth?: boolean;
}

export async function UseServer({
  url,
  method,
  path = workspaceRoutes.create,
  body,
  auth = false,
}: ServerFetchProps): Promise<ResponseType> {
  const redirectUrl = path
    ? `${authUrl}?ref=${encodeURIComponent(appUrl)}&path=${encodeURIComponent(path)}`
    : `${authUrl}?ref=${encodeURIComponent(appUrl)}`;

  const endpoint = auth ? `${authBackendUrl}${url}` : `${backendUrl}${url}`;

  const cookieStore = await cookies();

  let at = cookieStore.get("accessToken")?.value;

  let rt = cookieStore.get("refreshToken")?.value;

  if (!rt) {
    redirect(redirectUrl);
  }

  if (!at && rt) {
    const tokenRespaonse = await refresh(rt);

    if (!tokenRespaonse) {
      redirect(redirectUrl);
    }

    at = tokenRespaonse.accessToken;

    rt = tokenRespaonse.refreshToken;
  }

  let res = await dataFetch({
    endpoint,
    // @ts-ignore
    at,
    method,
    body,
  });

  let data: ResponseType | null = null;

  let contentType = res.headers.get("content-type");

  if (res.status === 401) {
    const tokenRespaonse = await refresh(rt);

    if (!tokenRespaonse) {
      redirect(redirectUrl);
    }

    at = tokenRespaonse.accessToken;

    rt = tokenRespaonse.refreshToken;

    res = await dataFetch({
      endpoint,
      //@ts-ignore
      at: tokenRespaonse.accessToken,
      method,
      body,
    });

    contentType = res.headers.get("content-type");
  }

  if (contentType?.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    return {
      success: false,
      message: normalizeErrorMessage(data?.message),
      statusCode: res.status,
    };
  }

  return (
    data ?? {
      success: true,
    }
  );
}

const refresh = async (
  rt: string,
): Promise<{ accessToken: string; refreshToken: string } | false> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); //TODO - remove resolver

  try {
    const res = await fetch(`${authBackendUrl}${authRoutes.rf}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${rt}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    let data: RefreshResponse;

    try {
      data = await res.json();
    } catch (error) {
      return false;
    }

    if (data.success && data.data) {
      const cookieStore = await cookies();

      const { accessToken, refreshToken } = data.data;

      cookieStore.set({
        name: "accessToken",
        value: `${accessToken}`,
        ...cookieOption(14 * 60),
      });

      cookieStore.set({
        name: "refreshToken",
        value: `${refreshToken}`,
        ...cookieOption(59 * 24 * 60 * 60),
      });

      return {
        accessToken,
        refreshToken,
      };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const dataFetch = async ({
  endpoint,
  at,
  method,
  body,
}: {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  at: string;
  body?: {};
}): Promise<Response> => {
  return await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${at}`,
    },
    ...(body && { body: JSON.stringify(body) }),
  });
};
