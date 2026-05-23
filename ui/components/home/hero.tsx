import { externalUrl } from "@/const/urls"
import { PrimaryBtn, SecondaryBtn } from "./btns"
import Link from "next/link"
import { routes } from "@/const/routes"
import { cn } from "@/lib/utils"
import { p } from "@/const/css"
import DraggableCardDemo from "../draggable-card-demo-2"

export function Hero() {
  return (
    <div className="grid grid-cols-1 gap-16 sm:gap-24 lg:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <Link
            href={externalUrl.fluoceFristForm}
            target="_blank"
            className="smooth w-fit cursor-pointer rounded-full border px-1 py-0.5 pr-2 text-xs font-medium tracking-tight text-neutral-700 hover:shadow-xl dark:text-neutral-300"
          >
            💙 See it in action
          </Link>
          <h1 className="max-w-140 text-center text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-start">
            Start Building Better Forms Today
          </h1>
        </div>
        <div className="flex items-center justify-center lg:justify-start">
          <p className={cn("max-w-140 text-center lg:text-start", p)}>
            Everything you need to create, manage, and scale modern form
            experiences from one platform.
          </p>
        </div>
        <div className="flex items-center justify-center lg:justify-start">
          <div className="flex items-center gap-2">
            <Link tabIndex={-1} href={routes.dashboard.base}>
              <PrimaryBtn className="p-4.5 sm:p-5 md:p-6">
                Start Building
              </PrimaryBtn>
            </Link>
            <SecondaryBtn className="p-4.5 sm:p-5 md:p-6">
              Developers
            </SecondaryBtn>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <DraggableCardDemo />
      </div>
    </div>
  )
}
