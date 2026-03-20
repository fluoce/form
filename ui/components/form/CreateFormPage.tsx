import useFormPage from "@/hooks/use-form-page";
import { useCallback, useRef, useState } from "react";
import CDialog from "../custom/CDialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import ErrorMessage from "../shared/ErrorMessage";

export default function CreateFormPage({ formId }: { formId: string }) {
  const [pageName, setPageName] = useState("");

  const [open, setOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const { createFormPage } = useFormPage();

  const { mutateAsync, isPending, error, isError } = createFormPage;

  const handleDialogSuccess = useCallback(() => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }, []);

  const handleCreateFormPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync({
      formId,
      name: pageName,
    });
    setOpen(false);
    setPageName("");
  };

  return (
    <CDialog
      open={open}
      onOpenChange={() => setOpen((prev) => !prev)}
      trigger={
        <Button size="icon" variant="outline">
          <Plus />
        </Button>
      }
      title="Add a New Page to this Form"
      description="Create a new page for your form to organize questions and improve
            the respondent experience."
      successBtnText="Create"
      onSuccess={handleDialogSuccess}
      isLoading={isPending}
    >
      <form ref={formRef} onSubmit={handleCreateFormPage}>
        <Field>
          <FieldLabel htmlFor="create-form-page">Page Name</FieldLabel>
          <Input
            id="create-form-page"
            type="text"
            placeholder="Page name . . ."
            name="pageName"
            autoComplete="off"
            maxLength={30}
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
          />
          {isError && (
            <ErrorMessage
              error={error?.message || "Failed to create Form page !"}
            />
          )}
        </Field>
      </form>
    </CDialog>
  );
}
