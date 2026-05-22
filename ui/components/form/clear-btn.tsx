import type { ComponentProps } from "react"
import { Button } from "../ui/button"

export function ClearBtn(props: ComponentProps<"button">) {
  return (
    <Button
      {...props}
      type="button"
      className={` ${props?.className || ""}`}
      variant="destructive"
    >
      Clear
    </Button>
  )
}
