"use client"

import { useState } from "react"
import { PageSpinner } from "@/components/shared/loader-r"
import { PageHeader } from "@/components/shared/page-header"
import { Wrapper } from "@/components/shared/wrapper-r"
import { Field } from "@/components/ui/field"
import { envs } from "@/const/envs"
import { useForm } from "@/hooks/use-form"
import { Copy, Link as L, Square } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Kbd } from "@/components/ui/kbd"

export function FormShare() {
  const { data, isLoading } = useForm()

  const [copied, setCopied] = useState(false)

  if (isLoading) {
    return <PageSpinner />
  }

  const shareLink = `${envs.shareLink}/${data?.data?.form?.id}`

  async function funcHandleCopy() {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1200)
    } catch (err) {
      setCopied(false)
    }
  }

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Share or embed your Form"
          description="Use the options below to share your form with others or embed it on your website."
        />
        <div className="flex flex-col gap-1">
          <Avatar className={cn("size-10", data?.data?.form?.theme)}>
            <AvatarFallback className="bg-primary">
              {data?.data?.form?.name[0].slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="flex flex-wrap items-center gap-2">
            {data?.data?.form?.name} <Kbd>{data?.data?.form?.slug}</Kbd>
          </h3>
        </div>
        <Field>
          <span className="flex items-center gap-2">
            <L size={18} className="text-blue-600" /> Share Link
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              className="rounded border p-1 px-2 text-sm hover:underline"
              target="_blank"
              href={shareLink}
            >
              {shareLink}
            </Link>
            <span
              className="flex cursor-pointer items-center gap-1 rounded border p-1.5 text-muted-foreground"
              onClick={funcHandleCopy}
              title={copied ? "Copied!" : "Copy to clipboard"}
              tabIndex={0}
              role="button"
              aria-label="Copy share link"
            >
              <Copy size={16} />
              {copied && (
                <span className="ml-1 text-xs font-medium text-green-600">
                  Copied!
                </span>
              )}
            </span>
          </div>
        </Field>
        <Field>
          <span className="flex items-center gap-2">
            <Square size={18} className="text-blue-600" /> Embed Form
          </span>
          <span className="text-sm text-muted-foreground">
            This feature will be coming soon!
          </span>
        </Field>
      </div>
    </Wrapper>
  )
}
