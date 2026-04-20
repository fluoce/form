const isProd = process.env.NODE_ENV === "production";

export function cookieOption(age: number) {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: age,
  } as const;
}
