"use client"

import { useRef, useState } from "react"
import { FieldBar } from "./components/field-bar"
import { FieldEditBar } from "./components/field-edit-bar"
import { PageBar } from "./components/page-bar"
import { PageContent } from "./components/page-content"
import { useClickOutside } from "@/hooks/use-click-outside"
import { useAppDispatch } from "@/provider/store"
import { setFieldId } from "@/provider/store/slice/field-id-slice"

export function FormEdit() {
  const [isMobile, setIsMobile] = useState(false)

  const dispatch = useAppDispatch()

  const pageRef = useRef<HTMLDivElement | null>(null)

  const editRef = useRef<HTMLDivElement | null>(null)

  useClickOutside({
    refs: [pageRef, editRef],
    callback: () => {
      dispatch(setFieldId(null))
    },
  })

  return (
    <div className="flex h-[calc(100vh-48px)] w-full items-start justify-between gap-2 p-2">
      <FieldBar />
      <div className="flex h-full w-full flex-1 flex-col gap-2">
        <PageBar isMobile={isMobile} setIsMobile={setIsMobile} />
        <PageContent fieldRef={pageRef} isMobile={isMobile} />
      </div>
      <FieldEditBar fieldRef={editRef} />
    </div>
  )
}
