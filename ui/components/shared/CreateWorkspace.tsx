"use client"

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import CDialog from "../custom/CDialog";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useRef, useState, useCallback } from "react";
import { serverFetch } from "@/actions/server-fetch";
import { useMutation } from "@/hooks/use-mutaion";
import ErrorMessage from "./ErrorMessage";
import { Spinner } from "../ui/spinner";


export const CreateWorkspace = ({ className }: { className?: string }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const { mutateAsync, isPending, isError, error } = useMutation(async (workspaceName: string) => {
        return await serverFetch({
            url: "/workspace",
            method: "POST",
            body: { name: workspaceName },
            path: "dev",
        });
    }, {
        validate(workspaceName) {
            if (!workspaceName.trim()) {
                return "workspace name is required"
            }
            return null
        },
    });

    const handleDialogSuccess = useCallback(() => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await mutateAsync(name)
        console.log(data);
        if (data.success) {
            setOpen(false);
            setName("")
        }
    };

    return (
        <CDialog
            open={open}
            onOpenChange={() => setOpen((prev) => !prev)}
            trigger={
                <Button className={className}>
                    <Plus />
                    Create Workspace
                </Button>
            }
            title="Create Workspace"
            description="Provide a name for your workspace. Workspaces help you organize and manage your forms efficiently."
            successBtnText="Create"
            cancelBtnText="Cancel"
            isLoading={isPending}
            onSuccess={handleDialogSuccess}
        >
            {isPending ? <Spinner /> : <form ref={formRef} onSubmit={handleFormSubmit}>
                <Field>
                    <FieldLabel htmlFor="create-workspace">Workspace Name</FieldLabel>
                    <Input
                        disabled={isPending}
                        onChange={(e) => setName(e.target.value)}
                        id="create-workspace"
                        placeholder="Enter the workspace name..."
                    />
                </Field>
            </form>}
            {isError && <ErrorMessage error={error || ""} />}
        </CDialog>
    );
};
