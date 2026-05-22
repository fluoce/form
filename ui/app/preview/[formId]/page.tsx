"use client"

import { PageSpinner } from "@/components/shared/loader-r"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BadgeInfo } from "lucide-react"
import { FormPages } from "./components/form-pages"
import { useFormPreview } from "@/hooks/use-form"
import { Button } from "@/components/ui/button"

export default function FormPreview() {
  const { formId } = useParams<{
    formId: string
  }>()

  const { data: formData, isLoading } = useFormPreview({ formId })

  if (isLoading) {
    return <PageSpinner />
  }

  if (!formData?.data?.form) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
        <span className="flex items-center gap-2">
          <BadgeInfo size={20} className="text-blue-600" /> Something went wrong
          !
        </span>
        <Button onClick={() => window.history.back()} variant="outline">
          <ArrowLeft /> Back
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center">
      <Button
        onClick={() => window.history.back()}
        className="absolute top-2 left-2"
        variant="outline"
      >
        <ArrowLeft /> Back
      </Button>
      <div
        className={cn(
          "flex w-full max-w-140 flex-col gap-8 px-4 pb-8",
          formData?.data?.form?.theme
        )}
      >
        {formData?.data?.form?.title || formData?.data?.form?.description ? (
          <div
            className={
              "flex flex-col gap-1 rounded-b-lg border bg-primary p-6 text-primary-foreground"
            }
          >
            <h1 className="text-lg font-medium">
              {formData?.data?.form?.title}
            </h1>
            <p className="text-sm">{formData?.data?.form?.description}</p>
          </div>
        ) : null}
        <FormPages formPages={formData?.data?.form?.formPage ?? []} />
        <div className="flex w-full items-center justify-end">
          <span className="flex items-center gap-2 text-xs font-medium">
            Powered by
            <Link
              className="text-primary underline"
              href="https://fluoce.com/products/form"
              target="_blank"
            >
              Fluoce
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
