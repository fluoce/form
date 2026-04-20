"use client";

import FormPreview from "@/components/form/FormPreview";
import NoData from "@/components/shared/NoData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function Form() {
  const { formId } = useParams<{
    formId: string;
  }>();

  const router = useRouter();

  if (!formId || !formId.startsWith("form_")) {
    return <NoData />;
  }

  return (
    <div className="flex h-full w-full justify-center">
      <Button
        className="fixed top-1 left-1"
        onClick={() => router.back()}
        variant="outline"
        size="icon"
      >
        <ArrowLeft />
      </Button>
      <FormPreview />
    </div>
  );
}
