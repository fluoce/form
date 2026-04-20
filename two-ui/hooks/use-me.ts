import { Me } from "@/actions/query/me/me-query";
import { meQueryKey } from "@/const/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function useMe() {
  const me = useQuery({
    queryKey: meQueryKey.me,
    queryFn: Me,
    staleTime: 10 * 60 * 1000,
  });

  return {
    me,
  };
}
