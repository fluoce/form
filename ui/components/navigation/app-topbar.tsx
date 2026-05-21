"use client"

import { ExternalLink, Eye, Search, Upload } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { routes } from "@/const/routes"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { FormTabType } from "@/types/form-types"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useFormPublish } from "@/hooks/use-form"
import { Field } from "../ui/field"
import Link from "next/link"
import { Copy, Link as L } from "lucide-react"
import { envs } from "@/const/envs"
import { handleCopy } from "@/utils/handle-copy"
import { useEffect, useState } from "react"
import { PrimarySpinner } from "../shared/loader-r"
import { ErrorAlert } from "../shared/error-alert"

const TABS: FormTabType[] = ["general", "edit", "result", "share"]

export function AppTopbar() {
  const { workspaceId, formId } = useParams<{
    workspaceId: string
    formId: string
  }>()

  const searchParams = useSearchParams()

  const tab = searchParams.get("tab")

  const paht = usePathname()

  const [copied, setCopied] = useState(false)

  const isOnFormPage = paht == routes.form.byId({ workspaceId, formId })

  const { mutateAsync, isError, isPending, error, data } = useFormPublish()

  const shareLink = data?.data?.form
    ? `${envs?.appUrl}/${data?.data?.form?.shareId}`
    : "#"

  return (
    <nav className="sticky top-0 z-20 flex h-12 items-center justify-between gap-2 border-b bg-sidebar p-2">
      <SidebarTrigger />
      {isOnFormPage ? (
        <Tabs
          value={tab || TABS[1]}
          onValueChange={(v) => {
            const params = new URLSearchParams(window.location.search)
            params.set("tab", v)
            window.history.replaceState(null, "", `?${params.toString()}`)
          }}
        >
          <TabsList variant="line">
            {TABS.map((t) => (
              <TabsTrigger key={t} value={t} className="capitalize">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : null}
      <div className="flex items-center gap-2">
        {isOnFormPage ? (
          <>
            <Link href={routes.form.preview({ formId })}>
              <Button tabIndex={-1} variant="outline">
                <Eye /> Preview
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => mutateAsync()}
                  className="bg-blue-600 text-white"
                >
                  <Upload /> Publish
                </Button>
              </PopoverTrigger>
              <PopoverContent className="m-2">
                <div className="flex flex-col gap-4 p-2">
                  <span className="text-muted-foreground">Publish Form</span>
                  {isPending ? (
                    <div className="flex h-23 w-full items-center justify-center">
                      <PrimarySpinner size="sm" />
                    </div>
                  ) : (
                    <Field>
                      <div className="flex flex-wrap items-center gap-4">
                        {isError ? (
                          <ErrorAlert error={error?.message} />
                        ) : (
                          <Link
                            className="flex gap-3 rounded border p-1 px-2 text-sm break-all hover:underline"
                            target="_blank"
                            href={shareLink}
                          >
                            <ExternalLink size={20} className="text-blue-600" />
                            {shareLink}
                          </Link>
                        )}
                        <div className="flex w-full items-center justify-between">
                          <span
                            className="flex cursor-pointer items-center gap-1 rounded border p-1.5 text-muted-foreground"
                            onClick={() =>
                              handleCopy({
                                setCopied,
                                text: shareLink,
                              })
                            }
                            title={copied ? "Copied!" : "Copy to clipboard"}
                            tabIndex={0}
                            role="button"
                            aria-label="Copy share link"
                          >
                            <Copy size={14} />
                            {copied && (
                              <span className="ml-1 text-[10px] font-medium text-green-600">
                                Copied!
                              </span>
                            )}
                          </span>
                          <Link
                            href={
                              routes?.form?.byId({ formId, workspaceId }) +
                              "?tab=share"
                            }
                            className="text-blue-600 underline"
                          >
                            More
                          </Link>
                        </div>
                      </div>
                    </Field>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button variant="outline">
            <Search /> Search
          </Button>
        )}
      </div>
    </nav>
  )
}
