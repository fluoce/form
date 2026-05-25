import { ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/navigation/app-sidebar"
import { AppTopbar } from "@/components/navigation/app-topbar"

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <AppTopbar />
        <div className="min-h-0 w-full flex-1 overflow-auto">{children}</div>
      </main>
    </SidebarProvider>
  )
}
