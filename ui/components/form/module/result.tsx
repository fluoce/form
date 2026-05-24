"use client"

import {
  Tabs,
  TabsPanel,
  TabsPanels,
  TabsList,
  TabsTab,
} from "@/components/animate-ui/components/base/tabs"
import { TableCellsSplit } from "lucide-react"
import { cn } from "@/lib/utils"
import { ResultOverview } from "./components/result-overview"

const TABS: string[] = ["Overview", "Submissions"]

export function FormResult() {
  return (
    <Tabs defaultValue={TABS[0]} className="gap-8 p-4">
      <TabsList>
        {TABS.map((t) => (
          <TabsTab key={t} value={t}>
            {t}
          </TabsTab>
        ))}
      </TabsList>
      <TabsPanels className={cn("px-2")}>
        <TabsPanel value={TABS[0]}>
          <ResultOverview />
        </TabsPanel>
        <TabsPanel value={TABS[1]}>
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2 text-sm">
              <TableCellsSplit size={18} /> Submissions Data
            </span>
            <span className="flex gap-1 text-sm text-muted-foreground">
              Data table soon <span className="text-blue-600">!</span>
            </span>
          </div>
        </TabsPanel>
      </TabsPanels>
    </Tabs>
  )
}
