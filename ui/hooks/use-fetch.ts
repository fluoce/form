import { ResType } from "@/types/res-types"
import UseServer from "./use-server"

export async function useFetch(
  props: Parameters<typeof UseServer>[0]
): Promise<ResType> {
  const res = await UseServer(props)

  if (!res?.success) {
    const message =
      typeof res?.message === "string"
        ? res?.message
        : Array.isArray(res?.message) && res?.message?.length > 0
          ? res?.message.join(", ")
          : "Request failed"
    throw new Error(message)
  }

  return res
}
