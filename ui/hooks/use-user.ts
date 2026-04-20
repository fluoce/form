import { useAuthMe } from "@/action/auth/me"
import { UserType } from "@/types/user-types"
import { ResType } from "@/types/res-types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuthLogout } from "@/action/auth/logout"

export const useUser = () => {
  return useQuery<ResType<UserType>>({
    queryKey: ["me"],
    queryFn: useAuthMe,
    staleTime: 60 * 60 * 1000,
    retry: 1,
  })
}
