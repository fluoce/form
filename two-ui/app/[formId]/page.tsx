"use client";

import FormPreview from "@/components/form/FormPreview";
import NoData from "@/components/shared/NoData";
import { useParams } from "next/navigation";

export default function Form() {
  const { formId } = useParams<{
    formId: string;
  }>();

  if (!formId || !formId.startsWith("form_")) {
    return <NoData />;
  }

  return <FormPreview />;
}
