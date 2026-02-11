import CSidebar from "@/components/custom/CSidebar";
import MainSidebar from "@/components/navigation/MainSidebar";
import Topbar from "@/components/navigation/Topbar";

export default function DashLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <CSidebar>
                <MainSidebar />
            </CSidebar>
            <div className="flex flex-col w-full">
                <Topbar />
                <main className="p-4 w-full">
                    {children}
                </main>
            </div>
        </>
    );
}
