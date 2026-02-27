import { FormSlice } from "@/types/slice"
import { FormStatusBadge } from "./FormStatusBadge"
import Link from "next/link"
import { formRoutes } from "@/const/route-const"
import FormHoverAction from "./FormHoverAction"

export const FormList = ({ forms }: { forms: FormSlice[] }) => {

    return (
        forms.map(form =>
            <Link
                href={formRoutes.formDash(form.workspaceId, form.id)}
                key={form.id}
                className="flex items-center gap-4 justify-between rounded-xl p-3 w-full hover:bg-muted smooth cursor-pointer overflow-hidden group"
            >
                <div className="flex items-center justify-between gap-2 w-full relative">
                    <div className="flex items-center gap-2">
                        <h3 className="line-clamp-1 font-medium">{form.name}</h3>
                        <FormStatusBadge status={form.status} />
                    </div>
                    <FormHoverAction form={form} />
                </div>
            </Link>
        )
    )
}