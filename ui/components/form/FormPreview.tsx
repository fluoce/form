"use client";

import { FieldSet } from "@/components/ui/field";
import { FieldRenderer } from "@/components/form/FormFieldRender";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useFormTheme } from "@/providers/form-theme/form-theme-provider";
import { FormFieldSlice } from "@/types/slice";
import { useAppSelector } from "@/providers/redux/redux-provider";
import NoData from "../shared/NoData";
import { Plus } from "lucide-react";
import FormContentDialog from "./FormContentDialog";

const FormPreview = ({ isMobileView }: { isMobileView?: boolean }) => {
  const { theme } = useFormTheme();

  const { formPages, selectedPage, form } = useAppSelector(
    (state) => state.form,
  );

  const formPage = formPages.find((page) => page.id == selectedPage);

  return (
    <div
      className={cn(
        "flex h-full w-full max-w-160 flex-col items-center gap-6",
        theme,
      )}
    >
      {(form?.title || form?.description) && (
        <div className="bg-primary text-primary-foreground w-full rounded-b-xl p-6">
          <h1 className="text-lg font-medium">{form?.title}</h1>
          <p className="text-sm">{form?.description}</p>
        </div>
      )}
      {formPage && formPage?.formField?.length > 0 ? (
        <form
          onSubmit={(e) => e.preventDefault()}
          className={cn(
            "flex w-full flex-col px-4 pb-2",
            isMobileView ? "px-4" : "md:px-0",
          )}
        >
          <FieldSet className="gap-6">
            {[...(formPage?.formField ?? [])]
              .sort((a, b) =>
                a.position < b.position ? -1 : a.position > b.position ? 1 : 0,
              )
              .map((f) => (
                <div key={f?.id} className="bg-primary/6 rounded-xl p-6">
                  <FieldRenderer field={f as FormFieldSlice} />
                </div>
              ))}

            <div className="grid grid-cols-3 gap-4">
              <Button
                type="button"
                className="text-muted-foreground col-span-1 rounded-full p-5 hover:text-red-500"
                variant="secondary"
              >
                Clear
              </Button>
              <Button type="button" className="col-span-2 rounded-full p-5">
                Submit
              </Button>
            </div>
          </FieldSet>
          <footer className="flex w-full flex-col items-center gap-2 rounded-t-xl p-4">
            <div className="text-muted-foreground flex items-center justify-center gap-1 text-xs">
              <span>Powered by</span>
              <Link
                href="https://fluoce.com"
                target="_blank"
                className="text-primary font-semibold underline hover:no-underline"
              >
                Fluoce
              </Link>
            </div>
          </footer>
        </form>
      ) : (
        <NoData
          title="No content yet"
          description="Your form page doesn't have any content. Start by adding a field, base or preset."
          actions={
            <div className="flex items-center gap-2">
              <FormContentDialog>
                <Button>
                  <Plus /> Content
                </Button>
              </FormContentDialog>
            </div>
          }
        />
      )}
    </div>
  );
};

export default FormPreview;
