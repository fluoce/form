import { FormSlice } from "@/types/slice";
import { FormStatusBadge } from "./FormStatusBadge";
import Link from "next/link";
import { formRoutes } from "@/const/route-const";
import FormHoverAction from "./FormHoverAction";

export const FormList = ({ forms }: { forms: FormSlice[] }) => {
  return forms.map((form) => (
    <Link
      href={formRoutes.setting(form.workspaceId, form.id, "edit")}
      key={form.id}
      className="bg-muted/50 hover:bg-muted smooth text-muted-foreground group flex w-full cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-xl p-3"
    >
      <div className="relative flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="line-clamp-1 font-medium">{form.name}</h3>
          <FormStatusBadge status={form.status} />
        </div>
        <FormHoverAction form={form} />
      </div>
    </Link>
  ));
};
