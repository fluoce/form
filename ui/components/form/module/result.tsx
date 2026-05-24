"use client"

import { PageSpinner } from "@/components/shared/loader-r"
import {
  Tabs,
  TabsPanel,
  TabsPanels,
  TabsList,
  TabsTab,
} from "@/components/animate-ui/components/base/tabs"
import { useSubmits } from "@/hooks/use-submit"
import { formatNumber } from "@/utils/formate-number"
import { useParams } from "next/navigation"
import {
  MapPinned,
  RotateCw,
  TableCellsSplit,
  TabletSmartphone,
  ThumbsUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"

const TABS: string[] = ["Overview", "Submissions"]

export function FormResult() {
  const { formId } = useParams<{ formId: string }>()

  const { data, isLoading, refetch, isFetching } = useSubmits({ formId })

  if (isLoading) {
    return <PageSpinner />
  }

  return (
    <Tabs defaultValue={TABS[0]} className="gap-6 p-4">
      <div className="flex items-center gap-2">
        <TabsList>
          {TABS.map((t) => (
            <TabsTab key={t} value={t}>
              {t}
            </TabsTab>
          ))}
        </TabsList>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() =>
                refetch().then(() =>
                  toast.success("Data Refreshed successfully !")
                )
              }
              size="icon"
              variant="outline"
            >
              <RotateCw className={cn(isFetching && "animate-spin")} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Refresh Data</TooltipContent>
        </Tooltip>
      </div>
      <TabsPanels className={cn("p-2", isFetching && "opacity-50")}>
        <TabsPanel value={TABS[0]} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2 text-sm">
              <ThumbsUp size={18} /> Submissions Status
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-col gap-2 rounded-xl bg-muted p-4">
                <div className="flex flex-col text-sm font-medium text-muted-foreground">
                  <span>Total</span>
                  <span>Submissions</span>
                </div>
                <span>{formatNumber(data?.data?.submissions?.length!)}</span>
              </div>
              <div className="flex flex-col gap-2 rounded-xl bg-muted p-4">
                <div className="flex flex-col text-sm font-medium text-muted-foreground">
                  <span>Completed</span>
                  <span>Submissions</span>
                </div>
                <span>
                  {formatNumber(
                    data?.data?.submissions?.filter(
                      (sub) => sub.status == "COMPLETED"
                    ).length!
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-2 rounded-xl bg-muted p-4">
                <div className="flex flex-col text-sm font-medium text-muted-foreground">
                  <span>Partial</span>
                  <span>Submissions</span>
                </div>
                <span>
                  {formatNumber(
                    data?.data?.submissions?.filter(
                      (sub) => sub.status == "PARTIAL"
                    ).length!
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2 text-sm">
              <TabletSmartphone size={18} /> Device Distribution
            </span>
            <span className="flex gap-1 text-sm text-muted-foreground">
              Device information soon
              <span className="text-blue-600">!</span>
            </span>
          </div>
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
