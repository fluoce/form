import UserGuard from "@/guard/user-guard"
import WorkspaceGuard from "@/guard/workspace-guard"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserGuard>
      <WorkspaceGuard>{children}</WorkspaceGuard>
    </UserGuard>
  )
}
