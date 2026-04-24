"use client"

import { useState } from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fields } from "./fields"
import { Themes } from "./themes"
import { Base } from "./base"
import { Presets } from "./presets"

export function FieldBar() {
  const [tab, setTab] = useState<"field" | "theme" | "base">("field")

  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="w-full max-w-60 gap-2"
    >
      <ResizablePanel defaultSize={400} minSize={140}>
        <div className="flex h-full w-full shrink-0 flex-col gap-2 rounded-lg bg-muted p-2">
          <Tabs
            defaultValue="field"
            value={tab}
            onValueChange={(value) =>
              setTab(value as "field" | "theme" | "base")
            }
          >
            <TabsList variant="line">
              <TabsTrigger value="base">Base</TabsTrigger>
              <TabsTrigger value="field">Fields</TabsTrigger>
              <TabsTrigger value="theme">Themes</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="custom-scroll h-full overflow-y-auto">
            <div className="flex h-0 flex-col gap-1">
              {tab == "field" ? <Fields /> : null}
              {tab == "theme" ? <Themes /> : null}
              {tab == "base" ? <Base /> : null}
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle className="mx-auto max-w-16 rounded-full p-0.5 hover:bg-secondary" />
      <ResizablePanel defaultSize={200} minSize={140}>
        <div className="flex h-full w-full shrink-0 flex-col gap-2 rounded-lg bg-muted p-2">
          <span className="p-1 px-2 text-sm font-medium text-muted-foreground">
            Presets
          </span>
          <div className="custom-scroll h-full overflow-y-auto">
            <div className="flex h-0 flex-col gap-1">
              <Presets />
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
