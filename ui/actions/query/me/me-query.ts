import { workspaceRoutes } from "@/const/route-const";
import { meUrlPath } from "@/const/url-path";
import { useTanstack } from "@/hooks/use-tanstack";
import { ResponseType } from "@/types/response";
import { UserSlice } from "@/types/slice";

export async function Me() {
    return await useTanstack({
        url: meUrlPath.base,
        method: "GET",
        auth: true,
        path: workspaceRoutes.create
    }) as ResponseType<UserSlice>;
}