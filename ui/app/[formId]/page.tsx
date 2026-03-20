"use client";

import Logo from "@/components/shared/Logo";
import NoData from "@/components/shared/NoData";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Form() {
  const { formId } = useParams<{
    formId: string;
  }>();

  if (!formId || !formId.startsWith("form_")) {
    return <NoData />;
  }

  return (
    <div className="flex items-center justify-center">
      {formId}
      <Link href={"/"} className="absolute right-2 bottom-2">
        <Logo />
      </Link>
    </div>
  );
}
