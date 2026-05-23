import { ComponentProps } from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

export function PrimaryBtn(props: ComponentProps<"button">) {
  return (
    <Button
      {...props}
      className={cn("rounded-full bg-(--form) text-white", props.className)}
    >
      {props.children}
    </Button>
  )
}

export function SecondaryBtn(props: ComponentProps<"button">) {
  return (
    <Button
      {...props}
      className={cn("rounded-full bg-muted text-(--form)", props.className)}
    >
      {props.children}
    </Button>
  )
}
