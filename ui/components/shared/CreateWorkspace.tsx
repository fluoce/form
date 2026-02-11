"use client"

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import CDialog from "../custom/CDialog";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { useRef, useState, useCallback } from "react";
import ErrorMessage from "./ErrorMessage";
import useWorkspace from "@/hooks/use-workspace";
import { Spinner } from "../ui/spinner";
import { redirect } from "next/navigation";
import { workspaceRoutes } from "@/const/route-const";

export const CreateWorkspace = ({
    className,
    variant,
    text = "Create Workspace",
    page = false,
}: {
    className?: string;
    variant?: "default" | "outline" | "secondary";
    text?: "Create Workspace" | "Workspace";
    page?: boolean;
}) => {

    const formRef = useRef<HTMLFormElement>(null);

    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");

    const { createWorkspace } = useWorkspace()

    const { mutateAsync, isPending, isError, error } = createWorkspace

    const handleDialogSuccess = useCallback(() => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || name.trim().length < 2) return
        const data = await mutateAsync({
            name
        })
        if (data && data.data?.workspace) {
            setName("")
            if (page) {
                redirect(workspaceRoutes.dash(data.data.workspace.id))
            }
            setOpen(false)
        }
    };

    if (page) {
        return (
            <form ref={formRef} onSubmit={handleFormSubmit} className="w-full max-w-100">
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Create Workspace</FieldLegend>
                        <FieldDescription>
                            Provide a name for your workspace. Workspaces help you organize and manage your forms efficiently.
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="create-workspace">Workspace Name</FieldLabel>
                                <Input
                                    disabled={isPending}
                                    onChange={(e) => setName(e.target.value)}
                                    id="create-workspace"
                                    placeholder="Enter the workspace name..."
                                />
                            </Field>
                            <Field orientation='horizontal'>
                                <Button disabled={isPending || !name || name.trim().length < 2}>
                                    {isPending && <Spinner />}  Create
                                </Button>
                            </Field>
                            {isError && <ErrorMessage error={error?.message || ""} />}
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        )
    }

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
            title="Create Workspace"
            description="Provide a name for your workspace. Workspaces help you organize and manage your forms efficiently."
            successBtnText="Create"
            isLoading={isPending}
            onSuccess={handleDialogSuccess}
        >
            <form ref={formRef} onSubmit={handleFormSubmit}>
                <Field>
                    <FieldLabel htmlFor="create-workspace">Workspace Name</FieldLabel>
                    <Input
                        disabled={isPending}
                        onChange={(e) => setName(e.target.value)}
                        id="create-workspace"
                        placeholder="Enter the workspace name..."
                    />
                </Field>
            </form>
            {isError && <ErrorMessage error={error?.message || ""} />}
        </CDialog>
    );
};
