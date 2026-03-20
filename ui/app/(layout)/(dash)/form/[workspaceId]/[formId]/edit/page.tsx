"use client";

import FormPages from "@/components/form/FormPages";
import { useParams } from "next/navigation";

export default function FormEdit() {
  const { formId, workspaceId } = useParams<{
    workspaceId: string;
    formId: string;
  }>();

  return (
    <div className="bg-muted h-[calc(100vh-52px)] w-full min-w-0 flex-1">
      <FormPages formId={formId} />
    </div>
  );
}
