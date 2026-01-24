import AdminSidebar from "@/components/navigation/AdminSidebar";
import AdminTopbar from "@/components/navigation/AdminTopbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { InitProvider } from "@/providers/init/init-provider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <InitProvider>
        <SidebarProvider>
          <AdminSidebar />
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <SidebarTrigger />
              <AdminTopbar />
            </div>
            <main>
              {children}
            </main>
          </div>
        </SidebarProvider>
      </InitProvider>
    </>
  );
}
