import type { ComponentProps } from "react"
import { Button } from "../ui/button"

export function SubmitBtn(props: ComponentProps<"button">) {
  return (
    <Button {...props} className={`col-span-2 ${props?.className || ""}`}>
      {props?.children}
    </Button>
  )
}
