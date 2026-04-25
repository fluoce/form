"use client"

import { useState } from "react"
import { FieldBar } from "./components/field-bar"
import { FieldEditBar } from "./components/field-edit-bar"
import { PageBar } from "./components/page-bar"
import { PageContent } from "./components/page-content"

export function FormEdit() {
  const [isMobile, setIsMobile] = useState(false)

  return (
    <div className="flex h-[calc(100vh-48px)] w-full items-start justify-between gap-2 p-2">
      <FieldBar />
      <div className="flex h-full w-full flex-1 flex-col gap-2">
        <PageBar isMobile={isMobile} setIsMobile={setIsMobile} />
        <PageContent isMobile={isMobile} />
      </div>
      <FieldEditBar />
    </div>
  )
}
