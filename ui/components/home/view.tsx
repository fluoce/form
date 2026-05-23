import { p } from "@/const/css"
import { cn } from "@/lib/utils"

export function View() {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className={cn("px-0.5 text-center lg:text-end", p)}>
        Manage everything from one clean dashboard
      </p>
      <img
        src="dd.png"
        alt="form-fluoce-dashboard"
        className="rounded-xl border"
      />
    </div>
  )
}
