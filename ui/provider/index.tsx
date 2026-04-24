"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from "react"
import { TanstackProvider } from "./tanstack/tanstack-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function ({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TanstackProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-right" />
      </TanstackProvider>
    </ThemeProvider>
  )
}
