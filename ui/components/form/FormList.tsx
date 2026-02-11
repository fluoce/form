import { FormSlice } from "@/types/slice"
import { FormStatusBadge } from "./FormStatusBadge"
import Link from "next/link"
import { formRoutes } from "@/const/route-const"

export const FormList = ({ forms }: { forms: FormSlice[] }) => {
    return (
        forms.map(form =>
            <Link
                href={formRoutes.formDash(form.workspaceId, form.id)}
                key={form.id}
                className="bg-muted/50 flex items-center gap-4 justify-between rounded-xl px-4 py-2 w-full hover:bg-muted smooth cursor-pointer overflow-hidden"
            >
                <div className="flex items-center justify-between gap-2 w-full">
                    <h2>{form.name}</h2>
                    <FormStatusBadge status={form.status} />
                </div>
            </Link>
        )
    )
}