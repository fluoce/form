"use client"

import { PrimarySpinner } from "@/components/shared/loader-r"
import { useFields, useFieldUpdate } from "@/hooks/use-field"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useForm } from "@/hooks/use-form"
import { Button } from "@/components/ui/button"
import { BadgeInfo } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/provider/store"
import { setFieldId } from "@/provider/store/slice/field-id-slice"
import { useEffect, useRef } from "react"
import { setPageFields } from "@/provider/store/slice/page-fields-slice"
import { SortAbleField } from "./sortable-field"
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react"
import { funcHandleFieldSortEnd } from "../func/func-handle-field-sort-end"
import { arrayMove } from "@dnd-kit/helpers"

export function PageContent({ isMobile }: { isMobile: boolean }) {
  const dispatch = useAppDispatch()

  const originalIndexRef = useRef<number>(-1)

  const searchParams = useSearchParams()

  const pageId = searchParams.get("page")

  const { fieldId } = useAppSelector((state) => state.fieldId)

  const { data, isLoading } = useFields()

  useEffect(() => {
    if (!data?.data?.formFields) return
    dispatch(setPageFields(data?.data?.formFields!))
  }, [data])

  const pageFields = useAppSelector((state) => state.pageFields.fields)

  const { data: formData, isLoading: formLoading } = useForm()

  const { mutate } = useFieldUpdate()

  return (
    <div className="flex h-[calc(100%-54px)] w-full justify-center">
      <div
        className={cn(
          "rounded-lg border-3 border-muted p-2 pt-0",
          isMobile ? "w-xs" : "w-full"
        )}
      >
        {pageId ? (
          isLoading || formLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <PrimarySpinner />
            </div>
          ) : (
            <div
              className={cn(
                "custom-scroll flex h-full justify-center overflow-y-auto break-all",
                formData?.data?.form?.theme
              )}
            >
              <div className="flex w-full max-w-140 flex-col gap-8">
                <div
                  onClick={() => {
                    dispatch(setFieldId("base"))
                  }}
                  className={cn(
                    "smooth flex cursor-pointer flex-col gap-1 rounded-b-lg border bg-primary p-6 text-primary-foreground",
                    fieldId == "base" && "border-stone-500"
                  )}
                >
                  <h1 className="text-base font-medium">
                    {formData?.data?.form?.title}
                  </h1>
                  <p className="text-xs font-medium opacity-75">
                    {formData?.data?.form?.description}
                  </p>
                </div>
                <DragDropProvider
                  onDragStart={(e) => {
                    const sourceId = e.operation?.source?.id
                    originalIndexRef.current = pageFields.findIndex(
                      (f) => f.id === sourceId
                    )
                  }}
                  onDragOver={(e) => {
                    const { source, target } = e.operation ?? {}
                    if (!source || !target || source.id === target.id) return
                    const fromIndex = pageFields.findIndex(
                      (f) => f.id === source.id
                    )
                    const toIndex = pageFields.findIndex(
                      (f) => f.id === target.id
                    )
                    if (fromIndex === -1 || toIndex === -1) return
                    dispatch(
                      setPageFields(arrayMove(pageFields, fromIndex, toIndex))
                    )
                  }}
                  onDragEnd={(e: DragEndEvent) => {
                    if (!e?.operation?.position?.previous) return
                    funcHandleFieldSortEnd({
                      e,
                      pageFields,
                      originalIndex: originalIndexRef.current,
                      updateField: ({ body, fieldId }) =>
                        mutate({
                          body,
                          fieldId,
                        }),
                    })
                  }}
                >
                  {pageFields?.map((field, idx) => (
                    <SortAbleField idx={idx} key={field?.id} field={field} />
                  ))}
                </DragDropProvider>
                <div className="grid grid-cols-3 gap-4 pb-4">
                  <Button className="p-4" variant="outline">
                    Clear
                  </Button>
                  <Button className="col-span-2 p-4">Submit</Button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center gap-3 break-all">
            <BadgeInfo size={20} className="text-blue-500" /> No form page
            selected !
          </div>
        )}
      </div>
    </div>
  )
}
