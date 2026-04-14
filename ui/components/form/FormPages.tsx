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
import { useEffect, useState } from "react";
import { FormPageSlice } from "@/types/slice";
import NoData from "../shared/NoData";
import { Monitor, NotepadText, Plus, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import FormPreview from "./FormPreview";
import {
  useAppDispatch,
  useAppSelector,
} from "@/providers/redux/redux-provider";
import { setFormPages } from "@/store/slice/form-slice";

export default function FormPages({ formId }: { formId: string }) {
  const [isMobileView, setIsMobileView] = useState(false);

  const dispatch = useAppDispatch();

  const isMobile = useSize(860);

  const { formPages: pages } = useAppSelector((state) => state.form);

  const { formPages, updateFormPage } = useFormPage();

  const { data, isLoading, error, isError } = formPages(formId);

  useEffect(() => {
    if (data) {
      dispatch(setFormPages(data?.data?.formPages ?? []));
    }
  }, [data]);

  const manager = useDragDropManager();

  useEffect(() => {
    if (!manager) return;
    const unsubscribe = manager.monitor.addEventListener("dragend", (event) => {
      if (event.canceled) return;
      const { source } = event.operation;
      if (!isSortable(source)) return;
      const { initialIndex, index } = source;
      if (initialIndex === index) return;
      const movedPage = pages?.find((page) => page.id === source.id);
      if (!movedPage) return;
      const newPages = [...(pages ?? [])];
      const oldIdx = newPages.findIndex((p) => p.id === movedPage.id);
      if (oldIdx === -1) return;
      newPages.splice(oldIdx, 1);
      newPages.splice(index, 0, movedPage);
      const prevPageId = index > 0 ? newPages[index - 1].id : undefined;
      const nextPageId =
        index < newPages.length - 1 ? newPages[index + 1].id : undefined;
      updateFormPage.mutate({
        formId,
        formPageId: movedPage.id,
        prevPageId,
        nextPageId,
      });
    });

    return () => unsubscribe();
  }, [manager, pages, formId, updateFormPage]);

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
    <>
      {isError && (
        <ErrorMessage
          className="px-2 pt-2"
          error={error?.message || "Failed to load Form page !"}
        />
      )}
      <div
        className={cn(
          "custom-scroll flex w-full items-center gap-2 overflow-auto p-2 pr-12",
          isMobile && "px-11",
        )}
      >
        <CreateFormPage formId={formId} />
        {pages?.map((page, idx) => (
          <SortablePages
            isActive={false}
            key={page.id}
            index={idx}
            page={page}
          />
        ))}
      </div>
      {pages && pages.length == 0 ? (
        <div className="w-full">
          <NoData
            icon={<NotepadText />}
            title="Create Your Form's First Page"
            description="Start by adding a page to your form. Each page can contain multiple questions or fields."
            actions={
              <CreateFormPage
                children={
                  <Button>
                    <Plus /> Page
                  </Button>
                }
                formId={formId}
              />
            }
          />
        </div>
      ) : (
        <div className="flex h-[calc(100%-48px)] w-full flex-col items-center justify-center gap-2 px-2 pb-2">
          <div
            className={cn(
              "custom-scroll bg-background flex h-full w-full items-center justify-center overflow-auto rounded-lg border",
              isMobileView && !isMobile && "w-90",
            )}
          >
            <FormPreview isMobileView={isMobileView} />
          </div>
          {!isMobile && (
            <ButtonGroup>
              <Button
                size="icon"
                onClick={() => setIsMobileView(false)}
                variant={isMobileView ? "outline" : "default"}
              >
                <Monitor />
              </Button>
              <Button
                size="icon"
                onClick={() => setIsMobileView(true)}
                variant={isMobileView ? "default" : "outline"}
              >
                <Smartphone />
              </Button>
            </ButtonGroup>
          )}
        </div>
      )}
    </>
  );
}

type SortablePagesProps = {
  index: number;
  page: FormPageSlice;
  isActive?: boolean;
};

const SortablePages = ({ index, page, isActive }: SortablePagesProps) => {
  const { ref } = useSortable({ id: page.id, index });

  return (
    <div
      ref={ref}
      className={cn(
        "bg-background flex cursor-grab items-center gap-2 rounded-md border px-2 py-1 text-sm",
        isActive && "bg-primary text-white",
      )}
    >
      <span className="line-clamp-1">{page.name}</span>
      <UpdateFormPage formPage={page} />
    </div>
  );
};
