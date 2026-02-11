import { createFormMutation, deleteFormMutation, updateFormMutation } from "@/actions/mutation/form/form-mutation";
import { getFormQuery, getFormsQuery, getTrashFormsQuery } from "@/actions/query/form/form-query";
import { formQueryKey } from "@/const/query-keys";
import { useAppSelector } from "@/providers/redux/redux-provider";
import { formUpdateInputType } from "@/types/type";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export default function useForm() {

    const queryClient = useQueryClient()

    const workspaceId = useAppSelector(state => state.workspace.selectedWorkspaceId)

    const createForm = useMutation({
        mutationFn: async ({ name }: { name: string }) => createFormMutation({ name, workspaceId: workspaceId as string }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: formQueryKey.forms(workspaceId as string)
            })
        }
    })

    const updateForm = useMutation({
        mutationFn: async ({ workspaceId, formId, name, status }: formUpdateInputType) => {
            if (!name && !status) {
                return null
            }
            updateFormMutation({
                workspaceId,
                formId,
                name,
                status
            })
        },
        onSuccess: (_, variables,) => {
            const formId = variables.formId
            queryClient.invalidateQueries({
                queryKey: formQueryKey.forms(workspaceId as string)
            });
            queryClient.invalidateQueries({
                queryKey: formQueryKey.form(formId)
            })
        }
    })

    const deleteForm = useMutation({
        mutationFn: async ({ formId, workspaceId }: { formId: string, workspaceId: string }) => {
            deleteFormMutation({
                formId,
                workspaceId
            })
        },
        onSuccess: (_, variables,) => {
            const workspaceId = variables.workspaceId
            const formId = variables.formId
            queryClient.invalidateQueries({
                queryKey: formQueryKey.trashForms(workspaceId)
            });
            queryClient.invalidateQueries({
                queryKey: formQueryKey.form(formId)
            })
        }
    })

    const forms = useQuery({
        queryKey: formQueryKey.forms(workspaceId as string),
        queryFn: () => getFormsQuery({ workspaceId: workspaceId as string }),
        enabled: Boolean(workspaceId)
    })

    const form = (formId: string) => useQuery({
        queryKey: formQueryKey.form(formId),
        queryFn: () => getFormQuery({ formId, workspaceId: workspaceId as string }),
        enabled: Boolean(formId)
    })

    const trashForm = useQuery({
        queryKey: formQueryKey.trashForms(workspaceId as string),
        queryFn: () => getTrashFormsQuery({
            workspaceId: workspaceId as string
        }),
        enabled: Boolean(workspaceId)
    })

    return {
        createForm,
        updateForm,
        deleteForm,
        forms,
        form,
        trashForm
    }
}

