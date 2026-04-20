"use client";

import { FormGrid } from "@/components/form/FormGrid";
import { FormList } from "@/components/form/FormList";
import CreateForm from "@/components/shared/CreateForm";
import { Header } from "@/components/shared/Header";
import { PageSpinner } from "@/components/shared/Loader";
import NoData from "@/components/shared/NoData";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { formGridView } from "@/const/localstorage-key";
import useForm from "@/hooks/use-form";
import useLocalStorage from "@/hooks/use-localstorage";
import useWorkspace from "@/hooks/use-workspace";
import { useAppSelector } from "@/providers/redux/redux-provider";
import { Form, Grid2x2, Rows3 } from "lucide-react";

export default function FormsPage() {
  const { forms } = useForm();

  const { selectedWorkspaceId } = useAppSelector((state) => state.workspace);

  const { value: isFormGridView, setValue } = useLocalStorage(formGridView);

  const { workspace } = useWorkspace();

  const { data: workspaceData } = workspace(selectedWorkspaceId as string);

  const { data, isLoading } = forms;

  const formList = data?.data?.forms ?? [];

  if (!selectedWorkspaceId) {
    return null;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <Wrapper>
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b pb-2">
          <Header
            title={workspaceData?.data?.workspace.name || "Forms"}
            type={`All your ${workspaceData?.data?.workspace.name || "Workspace"}'s Forms`}
          />
          <div className="flex flex-1 justify-end">
            <CreateForm />
          </div>
        </div>
        {formList && formList.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-end">
              <ButtonGroup>
                <Button
                  size="icon"
                  variant={isFormGridView ? "default" : "secondary"}
                  onClick={() => setValue(true)}
                >
                  <Grid2x2 />
                </Button>
                <Button
                  size="icon"
                  variant={isFormGridView ? "secondary" : "default"}
                  onClick={() => setValue(false)}
                >
                  <Rows3 />
                </Button>
              </ButtonGroup>
            </div>
            {isFormGridView ? (
              <FormGrid forms={formList} />
            ) : (
              <FormList forms={formList} />
            )}
          </div>
        ) : (
          <NoData
            icon={<Form className="text-muted-foreground" />}
            title="No Forms Yet"
            description="Click the button below to create your first form for this workspace."
            actions={<CreateForm />}
          />
        )}
      </div>
    </Wrapper>
  );
}
