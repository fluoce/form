'use client'

import { FormGrid } from "@/components/form/FormGrid"
import { FormList } from "@/components/form/FormList"
import CreateForm from "@/components/shared/CreateForm"
import { Header } from "@/components/shared/Header"
import NoData from "@/components/shared/NoData"
import Wrapper from "@/components/shared/Wrapper"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { formGridView } from "@/const/search-params"
import useForm from "@/hooks/use-form"
import { useUrlToggle } from "@/hooks/use-url-toggle"
import useWorkspace from "@/hooks/use-workspace"
import { useAppSelector } from "@/providers/redux/redux-provider"
import { Form, Grid2x2, Plus, Rows3 } from "lucide-react"

export default function FormsPage() {

    const { forms } = useForm()

    const { selectedWorkspaceId } = useAppSelector(state => state.workspace)

    const { open, handleClose, handleOpen } = useUrlToggle({
        queryKey: formGridView,
    })

    const { workspace } = useWorkspace()

    const { data: workspaceData } = workspace(selectedWorkspaceId as string)

    const { data } = forms

    const formList = data?.data?.forms ?? []

    if (!selectedWorkspaceId) {
        return null
    }

    return (
        <Wrapper>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-end justify-between gap-2 pb-2 border-b flex-wrap">
                    <Header
                        title={workspaceData?.data?.workspace.name || 'Forms'}
                        type={`All your ${workspaceData?.data?.workspace.name || "Workspace"}'s Forms`}
                    />
                    <div className="flex flex-1 justify-end">
                        <CreateForm />
                    </div>
                </div>
                {
                    formList && formList.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full items-center justify-end">
                                <ButtonGroup>
                                    <Button
                                        size='icon'
                                        variant={open ? 'secondary' : 'default'}
                                        onClick={handleClose}
                                    >
                                        <Grid2x2 />
                                    </Button>
                                    <Button
                                        size='icon'
                                        variant={open ? 'default' : 'secondary'}
                                        onClick={handleOpen}

                                    >
                                        <Rows3 />
                                    </Button>
                                </ButtonGroup>
                            </div>
                            {
                                open ? (
                                    <FormList forms={formList} />
                                ) : (
                                    <FormGrid forms={formList} />
                                )
                            }
                        </div>
                    ) : (
                        <NoData
                            icon={<Form className="text-muted-foreground" />}
                            title="No Forms Yet"
                            description="Click the button below to create your first form for this workspace."
                            actions={
                                <CreateForm />
                            }
                        />
                    )
                }
            </div>
        </Wrapper >
    )
}



