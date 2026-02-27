import CSidebar from "@/components/custom/CSidebar";
import FormEditSidebar from "@/components/navigation/FormEditSidebar";
import Topbar from "@/components/navigation/Topbar";

export default function FormEditLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <CSidebar>
                <FormEditSidebar />
            </CSidebar>
            <div className="flex flex-col w-full">
                <Topbar>
                    hello
                </Topbar>
                <main className="p-4 w-full">
                    {children}
                </main>
            </div>
        </>
    );
}
