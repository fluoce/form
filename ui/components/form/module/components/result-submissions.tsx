"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Grid2x2, RotateCw, Search, TableCellsMerge } from "lucide-react"
import { PageSpinner } from "@/components/shared/loader-r"
import { useSubmits } from "@/hooks/use-submit"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ButtonGroup } from "@/components/ui/button-group"
import { SubmissionTable } from "./submission-table"
import { SubmissionsCards } from "./submission-cards"

export function ResultSubmissions() {
  const { formId } = useParams<{ formId: string }>()

  const { data, isLoading, refetch, isFetching } = useSubmits({ formId })

  const [view, setView] = useState<"table" | "card">("table")

  const [globalFilter, setGlobalFilter] = useState("")

  return isLoading ? (
    <PageSpinner />
  ) : (
    <div
      className={cn(
        "flex w-full flex-col gap-4 p-2",
        isFetching && "opacity-50"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Button
            onClick={() => refetch()}
            disabled={isFetching}
            variant="outline"
            size="icon-sm"
          >
            <RotateCw className={cn(isFetching && "animate-spin")} />
          </Button>
          <InputGroup className="w-fit">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search submissions . . ."
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e?.target?.value)
              }}
            />
          </InputGroup>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ButtonGroup>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setView("table")}
              className={cn(view == "table" && "bg-accent")}
            >
              <TableCellsMerge />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setView("card")}
              className={cn(view == "card" && "bg-accent")}
            >
              <Grid2x2 />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {view == "table" ? (
        <SubmissionTable data={data?.data!} globalFilter={globalFilter} />
      ) : view == "card" ? (
        <SubmissionsCards data={data?.data!} globalFilter={globalFilter} />
      ) : (
        <></>
      )}
    </div>
  )
}
