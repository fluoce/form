"use client";

import ErrorMessage from "@/components/shared/ErrorMessage";
import { Header } from "@/components/shared/Header";
import { PageSpinner } from "@/components/shared/Loader";
import NoData from "@/components/shared/NoData";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { workspaceRoutes } from "@/const/route-const";
import useForm from "@/hooks/use-form";
import { useAppSelector } from "@/providers/redux/redux-provider";
import { FormStatus } from "@/types/slice";
import { Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function FormGeneral() {
  const { formId, workspaceId } = useParams<{
    workspaceId: string;
    formId: string;
  }>();

  const router = useRouter();

  const [name, setName] = useState("");

  const [status, setStatus] = useState<FormStatus | "">("");

  const { form, updateForm } = useForm();

  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading, isError, isFetching } = form(formId);

  const formData = data?.data?.form;

  const { mutateAsync, isPending, error, isError: isUpdateError } = updateForm;

  const handleFormUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    forDelete?: boolean,
  ) => {
    e.preventDefault();
    if (forDelete) {
      await mutateAsync({
        formId,
        workspaceId,
        status: "ARCHIVED",
      }).then(() => router.replace(workspaceRoutes.allForm(workspaceId)));
    } else {
      if (user?.id !== formData?.userId) return;
      const hasNameChanged =
        name && name.trim().length >= 2 && name !== formData?.name;
      const hasStatusChanged = status && status !== formData?.status;
      if (!hasNameChanged && !hasStatusChanged) {
        return;
      }
      await mutateAsync({
        formId,
        workspaceId,
        name: hasNameChanged ? name : undefined,
        status: hasStatusChanged ? status : undefined,
      });
    }
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!formData || isError) {
    return (
      <NoData
        title={`Form not found`}
        description="We couldn't find this Form. It may have been deleted. If you believe this is an error, please contact support."
      />
    );
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-start justify-start gap-6 p-4 sm:py-8">
      <Header title="General" icon={<Settings />} type="Form setting" />
      <form onSubmit={handleFormUpdate} className="flex w-full flex-col gap-8">
        <FieldGroup>
          <FieldSet className="flex flex-col gap-8">
            <FieldLegend>General Form Information</FieldLegend>
            <FieldDescription>
              Edit your Form's basic settings, such as its name or status. You
              can also delete the Form if it's no longer needed.
            </FieldDescription>
            <FieldGroup className="max-w-100">
              <Field>
                <FieldLabel>Form Name</FieldLabel>
                <Input
                  disabled={isPending || isFetching}
                  value={name ?? formData.name}
                  onChange={(e) => setName(e.target.value)}
                  id="create-form"
                  placeholder={
                    formData.name ? formData.name : "Enter new form name..."
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Status Of Form</FieldLabel>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as FormStatus)}
                >
                  <SelectTrigger disabled={isPending || isFetching}>
                    <SelectValue
                      placeholder={
                        formData.status
                          ? formData.status
                          : "Select New workspace Status"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Button
            className="w-fit"
            type="submit"
            disabled={isPending || isFetching}
          >
            Save
          </Button>
          {isUpdateError && <ErrorMessage error={error?.message || ""} />}
        </FieldGroup>
        <FieldGroup>
          <FieldSet className="flex flex-col gap-8">
            <FieldLegend className="text-red-500">Archive Form</FieldLegend>
            <FieldDescription>
              This action will Archive your form. All of your data will be
              preserved, and you can reactivate the form later if needed from
              trash section.
            </FieldDescription>
          </FieldSet>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-fit"
                type="button"
                disabled={isPending || isFetching}
                variant="destructive"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Form</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will Archive your form. All of your data will be
                  preserved, and you can reactivate the form later if needed
                  from trash section.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  type="button"
                  disabled={isPending || isFetching}
                  variant="destructive"
                  onClick={(e: any) => handleFormUpdate(e, true)}
                >
                  {isPending || (isFetching && <Spinner />)} Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </FieldGroup>
      </form>
    </div>
  );
}
