import { SidebarProvider } from "@/components/ui/sidebar";
import { FormThemeProvider } from "@/providers/form-theme/form-theme-provider";
import { InitProvider } from "@/providers/init/init-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <InitProvider>
        <SidebarProvider>
          <FormThemeProvider>{children}</FormThemeProvider>
        </SidebarProvider>
      </InitProvider>
    </>
  );
}
