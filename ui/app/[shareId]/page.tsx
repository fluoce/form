"use client"

import { useGetForm } from "@/hooks/use-get-form"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { FormPages } from "./components/form-pages"
import Link from "next/link"
import { useEffect, useState } from "react"
import { formSubmissionKey } from "./const/localstorage-key"
import { ulid } from "ulid"
import { BadgeInfo } from "lucide-react"

export default function FormSubmit() {
  const { shareId } = useParams<{
    shareId: string
  }>()

  const { data: formData, isLoading } = useGetForm({ shareId })

  const [done, setDone] = useState(false)

  const [submissionId, setSubmissionId] = useState("")

  useEffect(() => {
    if (!formData?.data?.form) return
    const savedItem = localStorage.getItem(
      formSubmissionKey(formData?.data?.form?.id)
    )
    const savedData: {
      formId: string
      submissionId: string
    } | null = savedItem ? JSON.parse(savedItem) : null
    if (savedData) {
      setSubmissionId(savedData?.submissionId)
      return
    }
    const newSubmissionId = `sub_${ulid()}`
    localStorage.setItem(
      formSubmissionKey(formData?.data?.form?.id),
      JSON.stringify({
        formId: formData?.data?.form?.id,
        submissionId: newSubmissionId,
      })
    )
    setSubmissionId(newSubmissionId)
  }, [formData?.data?.form])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <div className="flex w-fit flex-col justify-end">
          <span className="text-end text-xs font-medium">Powered by</span>
          <div className="flex items-center gap-2">
            <img
              src="/Form-Fluoce.svg"
              alt=""
              className="h-8 w-8 animate-bounce"
            />
            <h1 className="text-xl font-semibold tracking-tight text-[#1447E6]">
              Form Fluoce
            </h1>
          </div>
        </div>
      </div>
    )
  }

  if (!formData?.data?.form) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <span className="flex items-center gap-2">
          <BadgeInfo size={20} className="text-blue-600" /> Form Not found !
        </span>
      </div>
    )
  }

  if (!done) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div>Form submited successfully !</div>
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center">
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
        <FormPages
          setDone={setDone}
          formId={formData?.data?.form?.id!}
          submissionId={submissionId}
          formPages={formData?.data?.form?.formPage ?? []}
        />
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
