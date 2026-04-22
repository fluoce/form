import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export function Wrapper({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center p-4 sm:p-8",
        className
      )}
    >
      <div className="w-full max-w-6xl"> {children}</div>
    </div>
  )
}
