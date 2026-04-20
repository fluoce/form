import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"

export function AppTopbar() {
  return (
    <nav className="flex items-center justify-between gap-2 border-b bg-sidebar p-2">
      <SidebarTrigger />
      <Button variant="outline">
        <Search /> Search
      </Button>
    </nav>
  )
}
