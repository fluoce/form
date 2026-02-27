import { FormSlice } from "@/types/slice"
import { FormStatusBadge } from "./FormStatusBadge"
import { formRoutes } from "@/const/route-const"
import Link from "next/link"
import FormHoverAction from "./FormHoverAction"

export const FormGrid = ({ forms }: { forms: FormSlice[] }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {forms.map(form =>
                <Link
                    href={formRoutes.formDash(form.workspaceId, form.id)}
                    key={form.id}
                    className="bg-muted/50 flex flex-col gap-4 items-start group justify-start cursor-pointer hover:bg-muted smooth p-4 rounded-xl overflow-hidden"
                >
                    <div className="flex items-center justify-between gap-4 w-full relative">
                        <h3 className="line-clamp-1 font-medium">{form.name}</h3>
                        <FormStatusBadge status={form.status} className="group-hover:opacity-0 smooth" />
                        <FormHoverAction form={form} />
                    </div>
                </Link>
            )}
        </div >
    )
}