"use client";

import formFieldData from "@/temp/formField.json";
import { FieldSet } from "@/components/ui/field";
import { FieldRenderer } from "@/components/form/FormFieldRender";
import { Button } from "@/components/ui/button";
import { FormFieldType } from "@/types/formfield";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useFormTheme } from "@/providers/form-theme/form-theme-provider";

const FormPreview = ({ isMobileView }: { isMobileView?: boolean }) => {
  const { theme } = useFormTheme();

  return (
    <div
      className={cn(
        "flex h-full w-full max-w-160 flex-col items-center gap-6",
        theme,
      )}
    >
      <div className="bg-primary text-primary-foreground w-full rounded-b-xl p-6">
        <h1 className="text-lg font-medium">{formFieldData?.title}</h1>
        <p className="text-sm">{formFieldData?.description}</p>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={cn(
          "flex w-full flex-col px-4 pb-2",
          isMobileView ? "px-4" : "md:px-0",
        )}
      >
        <FieldSet className="gap-6">
          {formFieldData?.fields?.map((f) => (
            <div key={f.id} className="bg-primary/6 rounded-xl p-6">
              <FieldRenderer field={f.config as FormFieldType} />
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
      </form>
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
    </div>
  );
};

export default FormPreview;
