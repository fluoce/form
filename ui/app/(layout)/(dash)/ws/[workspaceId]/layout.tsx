import CSidebar from "@/components/custom/CSidebar";
import Topbar from "@/components/navigation/Topbar";
import WorkspaceSettingSidebar from "@/components/navigation/WorkspaceSettingSidebar";
import NoData from "@/components/shared/NoData";
import { workspaceRoutes } from "@/const/route-const";
import { workspaceUrlPath } from "@/const/url-path";
import { UseServer } from "@/hooks/use-server";
import { ResponseType, WorkspaceResponse } from "@/types/response";

type WsLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ workspaceId: string }>;
};

export default async function WsLayout({ children, params }: WsLayoutProps) {
    const { workspaceId } = await params;

    const data = await UseServer({
        url: workspaceUrlPath.query(workspaceId),
        method: "GET",
        path: workspaceRoutes.setting(workspaceId, "general"),
    }) as ResponseType<WorkspaceResponse>;

    if (!data || !data.data?.workspace) {
        return (
            <NoData
                title="workspace not found"
                description="We couldn't find this workspace. It may have been deleted, or you may not have access. If you believe this is an error, please contact support."
            />
        );
    }

    return (
        <>
            <CSidebar>
                <WorkspaceSettingSidebar workspace={data.data.workspace} />
            </CSidebar>
            <div className="flex flex-col w-full">
                <Topbar />
                <main className="w-full flex items-center justify-center p-4">
                    {children}
                </main>
            </div>
        </>
    );
}
