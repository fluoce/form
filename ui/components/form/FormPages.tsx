"use client";

import useFormPage from "@/hooks/use-form-page";
import { useSize } from "@/hooks/use-size";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import ErrorMessage from "../shared/ErrorMessage";
import CreateFormPage from "./CreateFormPage";
import UpdateFormPage from "./UpdateFormPage";
import { useSortable } from "@dnd-kit/react/sortable";
import { isSortable } from "@dnd-kit/react/sortable";
import { useDragDropManager } from "@dnd-kit/react";
import { useEffect } from "react";
import { FormPageSlice } from "@/types/slice";

export default function FormPages({ formId }: { formId: string }) {
  const isMobile = useSize(860);

  const { formPages, updateFormPage } = useFormPage();

  const { data, isLoading, error, isError } = formPages(formId);

  const formPagesData = data?.data?.formPages;

  console.log(formPagesData);

  const manager = useDragDropManager();

  useEffect(() => {
    if (!manager) return;
    const unsubscribe = manager.monitor.addEventListener("dragend", (event) => {
      if (event.canceled) return;
      const { source } = event.operation;
      if (!isSortable(source)) return;
      const { initialIndex, index } = source;
      if (initialIndex === index) return;
      const movedPage = formPagesData?.find((page) => page.id === source.id);
      if (!movedPage) return;
      updateFormPage.mutate({
        formId,
        formPageId: movedPage.id,
        position: index + 1,
      });
    });

    return () => unsubscribe();
  }, [manager, formPagesData, formId, updateFormPage]);

  if (isLoading) {
    return (
      <div className="custom-scroll flex w-full items-center gap-2 overflow-auto p-1">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} className="bg-background h-8 w-24" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "custom-scroll flex w-full items-center gap-2 overflow-auto p-1 pr-12",
        isMobile && "px-11",
      )}
    >
      {isError && (
        <ErrorMessage error={error?.message || "Failed to load Form page !"} />
      )}
      <CreateFormPage formId={formId} />
      {formPagesData?.map((page, idx) => (
        <SortablePages key={page.id} index={idx} page={page} />
      ))}
    </div>
  );
}

// SortablePages stays the same
const SortablePages = ({
  index,
  page,
}: {
  index: number;
  page: FormPageSlice;
}) => {
  const { ref } = useSortable({ id: page.id, index });

  return (
    <div
      ref={ref}
      className="bg-background flex cursor-grab items-center gap-2 rounded-md px-2 py-1"
    >
      <span className="line-clamp-1">{page.name}</span>
      <UpdateFormPage formPage={page} />
    </div>
  );
};
