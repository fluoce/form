import DevSidebar from "@/components/navigation/DevSidebar";
import DevTopbar from "@/components/navigation/DevTopbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { InitProvider } from "@/providers/init/init-provider";

export default function DevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <InitProvider>
        <SidebarProvider>
          <DevSidebar />
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <SidebarTrigger />
              <DevTopbar />
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
