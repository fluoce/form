import { HomeNavbar } from "@/components/home/home-navbar"
import { ReactNode } from "react"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full justify-center">
      <div className="w-full max-w-360">
        <nav className="sticky top-0 w-full">
          <HomeNavbar />
        </nav>
        <div className="px-4 sm:px-8">{children}</div>
      </div>
    </main>
  )
}
