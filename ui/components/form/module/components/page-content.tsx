"use client"

import { PrimarySpinner } from "@/components/shared/loader"
import { useFieldDelete, useFields } from "@/hooks/use-field"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { FieldRenderer } from "./field-renderer"
import { useForm } from "@/hooks/use-form"
import { Button } from "@/components/ui/button"
import { BadgeInfo, Trash2, X } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAppDispatch, useAppSelector } from "@/provider/store"
import { setFieldId } from "@/provider/store/slice/field-id-slice"
import { useEffect } from "react"
import { setPageFields } from "@/provider/store/slice/page-fields-slice"
import Link from "next/link"

export function PageContent({ isMobile }: { isMobile: boolean }) {
  const dispatch = useAppDispatch()

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

  const { mutateAsync, isPending } = useFieldDelete()

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
                    fieldId == "base" && "scale-103 border-stone-500"
                  )}
                >
                  <h1 className="text-base font-medium">
                    {formData?.data?.form?.title}
                  </h1>
                  <p className="text-xs font-medium opacity-75">
                    {formData?.data?.form?.description}
                  </p>
                </div>
                {pageFields?.map((field) => (
                  <div
                    key={field?.id}
                    onClick={() => {
                      dispatch(setFieldId(field?.id))
                    }}
                    className={cn(
                      "smooth relative cursor-pointer rounded-lg border bg-primary/10 p-6",
                      fieldId == field?.id && "scale-103 border-stone-500"
                    )}
                  >
                    <FieldRenderer field={field} />
                    {fieldId == field?.id ? (
                      <div className="absolute top-0 -right-8.5 flex flex-col gap-1">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              disabled={isPending}
                              variant="destructive"
                              size="icon-sm"
                            >
                              {isPending ? <Spinner /> : <Trash2 />}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Field: Are you sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Deleting this field will also remove any data
                                associated with it. If you want to keep this
                                data, please export it first before proceeding.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                disabled={isPending}
                                variant="destructive"
                                onClick={() =>
                                  mutateAsync({
                                    fieldId: field?.id,
                                  })
                                }
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            dispatch(setFieldId(null))
                          }}
                          size="icon-sm"
                          variant="outline"
                        >
                          <X />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4">
                  <Button className="p-4" variant="outline">
                    Clear
                  </Button>
                  <Button className="col-span-2 p-4">Submit</Button>
                </div>
                <div className="flex w-full items-center justify-center gap-2 text-xs">
                  Powered by
                  <Link
                    href="https://fluoce.com"
                    className="font-medium text-primary underline"
                  >
                    Fluoce
                  </Link>
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
