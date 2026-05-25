"use client"

import {
  Tabs,
  TabsPanel,
  TabsPanels,
  TabsList,
  TabsTab,
} from "@/components/animate-ui/components/base/tabs"
import { cn } from "@/lib/utils"
import { ResultOverview } from "./components/result-overview"
import { ResultSubmissions } from "./components/result-submissions"

const TABS: string[] = ["Overview", "Submissions"]

export function FormResult() {
  return (
    <Tabs defaultValue={TABS[0]} className="gap-4 p-4">
      <TabsList>
        {TABS.map((t) => (
          <TabsTab key={t} value={t}>
            {t}
          </TabsTab>
        ))}
      </TabsList>
      <TabsPanels>
        <TabsPanel value={TABS[0]}>
          <ResultOverview />
        </TabsPanel>
        <TabsPanel value={TABS[1]}>
          <ResultSubmissions />
        </TabsPanel>
      </TabsPanels>
    </Tabs>
  )
}
