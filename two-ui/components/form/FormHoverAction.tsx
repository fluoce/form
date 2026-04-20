"use client";

import { Button } from "../ui/button";
import { Activity, FilePenLine, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { formRoutes } from "@/const/route-const";
import { FormSlice } from "@/types/slice";

const FormHoverAction = ({ form }: { form: FormSlice }) => {
  const router = useRouter();

  return (
    <div
      onClick={(e) => e.preventDefault()}
      className="smooth absolute right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100"
    >
      <Button
        onClick={() =>
          router.push(formRoutes.setting(form.workspaceId, form.id, "result"))
        }
        variant="ghost"
        className="text-muted-foreground"
        size="icon-sm"
      >
        <Activity />
      </Button>
      <Button
        onClick={() =>
          router.push(formRoutes.setting(form.workspaceId, form.id, "general"))
        }
        variant="ghost"
        className="text-muted-foreground"
        size="icon-sm"
      >
        <Settings />
      </Button>
    </div>
  );
};

export default FormHoverAction;
