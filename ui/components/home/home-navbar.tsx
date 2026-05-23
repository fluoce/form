import { externalUrl } from "@/const/urls"
import { PrimaryBtn, SecondaryBtn } from "./btns"
import Link from "next/link"
import { routes } from "@/const/routes"
import { envs } from "@/const/envs"

export function HomeNavbar() {
  return (
    <div className="flex items-center justify-between gap-4 bg-background p-2">
      <div className="flex flex-wrap items-start">
        <a href={envs.appUrl} className="flex items-center gap-1">
          <img src="/Form-Fluoce.svg" alt="form-fluoce" className="h-8 w-8" />
          <h1 className="text-2xl font-semibold tracking-tighter text-[#1447E6]">
            Form
          </h1>
        </a>
        <span className="mx-3.5 flex items-center gap-0.5 text-xs font-semibold text-muted-foreground">
          by
          <a
            target="_blank"
            className="hover:text-(--form) hover:underline"
            href={externalUrl.fluoce}
          >
            Fluoce
          </a>
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Link href={routes.dashboard.base}>
          <SecondaryBtn className="p-4.5">Login</SecondaryBtn>
        </Link>
        <Link href={routes.dashboard.base}>
          <PrimaryBtn className="p-4.5">Sing Up</PrimaryBtn>
        </Link>
      </div>
    </div>
  )
}
