"use client";

import useFormPage from "@/hooks/use-form-page";
import { FormPageSlice } from "@/types/slice";
import { useState } from "react";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EllipsisVertical } from "lucide-react";
import { Spinner } from "../ui/spinner";

export default function UpdateFormPage({
  formPage,
}: {
  formPage: FormPageSlice;
}) {
  const [pageName, setPageName] = useState(formPage?.name || "");

  const [open, setOpen] = useState(false);

  const { updateFormPage, deleteFormPage } = useFormPage();

  const { mutateAsync, isPending, error, isError } = updateFormPage;

  const {
    mutateAsync: dMutateAsync,
    isPending: dIsPending,
    error: dError,
    isError: dIsError,
  } = deleteFormPage;

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button size="icon-xs" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Page Name</DialogTitle>
          <DialogDescription>
            Rename the current page to help organize your form and improve the
            respondent experience.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="update-form-page"> New Page Name</FieldLabel>
          <Input
            id="update-form-page"
            type="text"
            placeholder="New page name . . ."
            name="pageName"
            autoComplete="off"
            maxLength={30}
            required
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
          />
          {isError && (
            <ErrorMessage
              error={error?.message || "Failed to update Form page !"}
            />
          )}
          {dIsError && (
            <ErrorMessage
              error={dError?.message || "Failed to delete Form page !"}
            />
          )}
        </Field>
        <DialogFooter>
          <div className="flex w-full flex-wrap items-center gap-2">
            <Button
              variant="destructive"
              className="w-fit"
              disabled={dIsPending || isPending}
              onClick={async () => {
                await dMutateAsync({
                  formId: formPage.formId,
                  formPageId: formPage.id,
                });
                setOpen(!open);
              }}
            >
              {dIsPending && <Spinner />} Delete
            </Button>
            <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={isPending || dIsPending}
                onClick={async () => {
                  if (pageName == formPage.name) {
                    setOpen(false);
                    return;
                  }
                  await mutateAsync({
                    formId: formPage.formId,
                    formPageId: formPage.id,
                    name: pageName,
                  });
                  setOpen(!open);
                }}
              >
                {isPending && <Spinner />} Update
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
