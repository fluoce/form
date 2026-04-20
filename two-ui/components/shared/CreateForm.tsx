"use client";

import { useCallback, useRef, useState } from "react";
import CDialog from "../custom/CDialog";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import ErrorMessage from "./ErrorMessage";
import useForm from "@/hooks/use-form";

const CreateForm = ({
  className,
  variant,
  text = "Form",
}: {
  className?: string;
  variant?: "default" | "outline" | "secondary";
  text?: "Create Form" | "Form";
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleDialogSuccess = useCallback(() => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }, []);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const { createForm } = useForm();

  const { mutateAsync, isPending, isError, error } = createForm;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || name.trim().length < 2) return;
    const data = await mutateAsync({
      name,
    });
    if (data && data.data?.form) {
      setName("");
      setOpen(false);
    }
  };

  return (
    <CDialog
      open={open}
      onOpenChange={() => setOpen((prev) => !prev)}
      trigger={
        <Button className={className} variant={variant}>
          <Plus />
          {text}
        </Button>
      }
      disabled={!name || name.trim().length < 2}
      title="Create Form"
      description="Provide a name for your form. Forms help you collect responses and manage your workspace data efficiently."
      successBtnText="Create"
      isLoading={isPending}
      onSuccess={handleDialogSuccess}
    >
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <Field>
          <FieldLabel htmlFor="create-form">Form Name</FieldLabel>
          <Input
            disabled={isPending}
            onChange={(e) => setName(e.target.value)}
            id="create-form"
            placeholder="Enter Form name..."
          />
        </Field>
      </form>
      {isError && <ErrorMessage error={error?.message || ""} />}
    </CDialog>
  );
};

export default CreateForm;
