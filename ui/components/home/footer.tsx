import { externalUrl } from "@/const/urls"
import { Dot } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex flex-col gap-4 rounded-t-xl bg-muted p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img
            src="/Form-Fluoce.svg"
            alt="form-fluoce"
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
          <h1 className="text-base font-semibold tracking-tight text-(--form) sm:text-lg">
            Form Fluoce
          </h1>
        </div>
        <span className="flex flex-wrap items-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} <Dot />{" "}
          <Link
            href={externalUrl.fluoce}
            target="_blank"
            className="text-(--form) underline"
          >
            Fluoce
          </Link>{" "}
          <Dot />
          All rights reserved
        </span>
      </div>
    </footer>
  )
}
