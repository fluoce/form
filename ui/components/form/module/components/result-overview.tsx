"use client"

import { PageSpinner } from "@/components/shared/loader-r"
import { useSubmitCount } from "@/hooks/use-submit"
import { formatNumber } from "@/utils/formate-number"
import { RotateCw, TabletSmartphone, ThumbsUp } from "lucide-react"
import { useParams } from "next/navigation"

export function ResultOverview() {
  const { formId } = useParams<{ formId: string }>()

  const { data, isLoading } = useSubmitCount({ formId })

  const submissionCounts = data?.data?.overview?.submissionCounts

  const deviceCounts = data?.data?.overview?.deviceCounts

  if (isLoading) {
    return <PageSpinner />
  }

  return (
    <div className={"flex flex-col gap-8"}>
      <div className="flex flex-col gap-4">
        <span className="flex items-center gap-2 text-sm">
          <ThumbsUp size={18} /> Submission Overview
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <StatusCard
            count={submissionCounts?.total!}
            lable="Total Submissions"
          />
          <StatusCard
            count={submissionCounts?.completed!}
            lable="Completed Submissions"
          />
          <StatusCard
            count={submissionCounts?.partial!}
            lable="Partial Submissions"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="flex items-center gap-2 text-sm">
          <TabletSmartphone size={18} /> Device Distribution
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <StatusCard count={deviceCounts?.desktop!} lable="Desktop" />
          <StatusCard count={deviceCounts?.mobile!} lable="Mobile" />
          <StatusCard count={deviceCounts?.tablet!} lable="Tablet" />
          <StatusCard count={deviceCounts?.other!} lable="Other" />
        </div>
      </div>
    </div>
  )
}

function StatusCard({ count = 0, lable }: { lable: string; count: number }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-muted p-4 text-sm font-medium">
      <span className="text-[13px] break-all text-muted-foreground">
        {lable}
      </span>
      <span className="text-base">{formatNumber(count)}</span>
    </div>
  )
}
