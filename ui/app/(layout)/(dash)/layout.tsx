import { SidebarProvider } from "@/components/ui/sidebar";
import { InitProvider } from "@/providers/init/init-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <InitProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </InitProvider>
    </>
  );
}
