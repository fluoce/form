"use client";

import { useParams } from "next/navigation";

export default function FormResult() {
  const { formId, workspaceId } = useParams<{
    workspaceId: string;
    formId: string;
  }>();

  return <div>{formId}</div>;
}
