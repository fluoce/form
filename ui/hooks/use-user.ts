import { useAuthMe } from "@/action/auth/me"
import { UserType } from "@/types/user-types"
import { ResType } from "@/types/res-types"
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
  return useQuery<ResType<UserType>>({
    queryKey: ["me"],
    queryFn: useAuthMe,
    staleTime: 60 * 60 * 1000,
    retry: 1,
  })
}
