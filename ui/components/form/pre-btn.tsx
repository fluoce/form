import type { ComponentProps } from "react"
import { Button } from "../ui/button"

export function PrevBtn(props: ComponentProps<"button">) {
  return (
    <Button
      {...props}
      type="button"
      className={` ${props?.className || ""}`}
      variant="outline"
    >
      Previous
    </Button>
  )
}
