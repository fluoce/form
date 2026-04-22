"use client"

import { Eye, Search, Upload } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"
import { useParams, usePathname, useRouter } from "next/navigation"
import { routes } from "@/const/routes"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { FormTabType } from "@/types/form-types"

const TABS: FormTabType[] = ["general", "edit", "result", "share"]

export function AppTopbar() {
  const { workspaceId, formId } = useParams<{
    workspaceId: string
    formId: string
  }>()

  const router = useRouter()

  const paht = usePathname()

  const isOnFormPage = paht == routes.form.byId({ workspaceId, formId })

  return (
    <nav className="flex items-center justify-between gap-2 border-b bg-sidebar p-2">
      <SidebarTrigger />
      {isOnFormPage ? (
        <Tabs
          defaultValue={TABS[1]}
          onValueChange={(v) => router.push(`?tab=${v}`)}
        >
          <TabsList variant="line">
            {TABS.map((t) => (
              <TabsTrigger key={t} value={t} className="capitalize">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : null}
      <div className="flex items-center gap-2">
        {isOnFormPage ? (
          <>
            <Button variant="outline">
              <Eye /> Preview
            </Button>
            <Button className="bg-blue-600 text-white">
              <Upload /> Publish
            </Button>
          </>
        ) : (
          <Button variant="outline">
            <Search /> Search
          </Button>
        )}
      </div>
    </nav>
  )
}
