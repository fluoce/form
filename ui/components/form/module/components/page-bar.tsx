"use client"

import { Button } from "@/components/ui/button"
import { CreateUpdateFormPage } from "./create-update-form-page"
import { EllipsisVertical, Monitor, Plus, Smartphone } from "lucide-react"
import { useFormPages } from "@/hooks/use-form-page"
import { PrimarySpinner } from "@/components/shared/loader"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function PageBar({
  isMobile,
  setIsMobile,
}: {
  isMobile: boolean
  setIsMobile: Dispatch<SetStateAction<boolean>>
}) {
  const { data, isLoading } = useFormPages()

  const router = useRouter()

  useEffect(() => {
    if (!data?.data?.formPages?.length) return
    const search = window?.location?.search
    const params = new URLSearchParams(search)
    params.set("page", data?.data?.formPages?.[0]?.id)
    router.replace(`?${params.toString()}`)
  }, [data, isLoading])

  return (
    <div className="flex h-fit items-center gap-2">
      <div className="custom-scroll flex w-full items-center overflow-x-auto overflow-y-clip rounded-lg bg-muted p-2">
        <div className="flex w-0 items-center gap-2">
          <CreateUpdateFormPage>
            <Button variant="outline" size="sm" className="shrink-0">
              <Plus /> Page
            </Button>
          </CreateUpdateFormPage>
          {isLoading ? (
            <PrimarySpinner />
          ) : (
            data?.data?.formPages?.map((p) => (
              <Button
                key={p?.id}
                onClick={() => {
                  const search = window.location.search
                  const params = new URLSearchParams(search)
                  params.set("page", p.id)
                  router.push(`?${params.toString()}`)
                }}
                size="sm"
                className="overflow-hidden pr-0"
                variant="secondary"
              >
                {p?.name}
                <CreateUpdateFormPage formPage={p}>
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="p-2 hover:bg-primary"
                  >
                    <EllipsisVertical />
                  </span>
                </CreateUpdateFormPage>
              </Button>
            ))
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-muted p-2">
        <Button
          onClick={() => setIsMobile(!isMobile)}
          variant="outline"
          size="icon-sm"
        >
          {isMobile ? <Smartphone /> : <Monitor />}
        </Button>
      </div>
    </div>
  )
}
