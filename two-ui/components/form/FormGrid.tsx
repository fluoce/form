import { FormSlice } from "@/types/slice";
import { FormStatusBadge } from "./FormStatusBadge";
import { formRoutes } from "@/const/route-const";
import Link from "next/link";
import FormHoverAction from "./FormHoverAction";

export const FormGrid = ({ forms }: { forms: FormSlice[] }) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
      {forms.map((form) => (
        <Link
          href={formRoutes.setting(form.workspaceId, form.id, "edit")}
          key={form.id}
          className="text-muted-foreground group smooth bg-muted/50 hover:bg-muted flex cursor-pointer flex-col items-start justify-start gap-4 overflow-hidden rounded-xl p-4"
        >
          <div className="relative flex w-full items-center justify-between gap-4">
            <h3 className="line-clamp-1 font-medium">{form.name}</h3>
            <FormStatusBadge
              status={form.status}
              className="smooth group-hover:opacity-0"
            />
            <FormHoverAction form={form} />
          </div>
        </Link>
      ))}
    </div>
  );
};
