"use server"

import { routes } from "@/const/routes"
import { urls } from "@/const/urls"
import { useFetch } from "@/hooks/use-fetch"
import { ResType } from "@/types/res-types"
import { UserType } from "@/types/user-types"

export async function useAuthMe() {
  return (await useFetch({
    url: urls.auth.me,
    method: "GET",
    auth: true,
    path: routes.dashboard.base,
  })) as ResType<UserType>
}
