import { SubmissionsType } from "@/types/submit-types"
import { useMemo } from "react"
import { funcNormalizeSubmissionsForCard } from "../func/func-normalize-submissions"
import { cn } from "@/lib/utils"
import { Download, EllipsisVertical, Maximize2, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SubmissionsCards({
  data,
  globalFilter,
}: {
  data: {
    submissions: SubmissionsType
  }
  globalFilter: string
}) {
  const cardData = useMemo(() => {
    const cards = funcNormalizeSubmissionsForCard(data.submissions) || []
    if (!globalFilter) return cards
    const filter = globalFilter.toLowerCase()
    return cards.filter((card) =>
      card?.questions?.some(
        (q: any) =>
          String(q?.question ?? "")
            .toLowerCase()
            .includes(filter) ||
          String(q?.answer ?? "")
            .toLowerCase()
            .includes(filter)
      )
    )
  }, [data, globalFilter])

  return (
    <div
      className="custom-scroll flex-1 overflow-x-auto overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cardData?.map((data) => (
          <div
            key={data?.id}
            className="flex flex-col overflow-hidden border text-sm"
          >
            <div className="flex flex-col gap-1 border-b bg-muted p-2">
              <div className="flex flex-wrap items-center justify-between">
                <span
                  className={cn(
                    "text-[13px] lowercase",
                    data?.status == "COMPLETED"
                      ? "text-emerald-500"
                      : "text-muted-foreground"
                  )}
                >
                  {data?.status}
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="cursor-pointer p-1.5 hover:bg-accent">
                        <EllipsisVertical size={12} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Maximize2 />
                          Full View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Download /> Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <Trash2 /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <span className="text-xs capitalize">
                  {data?.device ?? "—"}
                </span>
                <span className="text-xs font-medium">
                  Answers {data?.answeredCount}
                </span>
              </div>
            </div>
            <div className="flex flex-col divide-y">
              {data?.questions?.map((qna) => (
                <div key={qna?.id} className="flex flex-col gap-1 p-2">
                  <p className="text-xs font-medium tracking-tight text-muted-foreground">
                    {qna?.question}
                  </p>
                  <p className="text-[13px] tracking-tight text-neutral-800 dark:text-neutral-300">
                    {qna?.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
