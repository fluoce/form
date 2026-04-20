import { ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/navigation/app-sidebar"
import { AppTopbar } from "@/components/navigation/app-topbar"

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <AppTopbar />
        <div className="w-full">{children}</div>
      </main>
    </SidebarProvider>
  )
}
