import { FormTabType } from "@/types/form-types"

export const routes = {
  base: "/",
  dashboard: {
    base: "/dashboard",
    createWorkspace: "/dashboard/create-workspace",
    workspace: ({ workspaceId }: { workspaceId: string }) =>
      `/dashboard/${workspaceId}`,
    workspaceSetting: ({ workspaceId }: { workspaceId: string }) =>
      `/dashboard/${workspaceId}/setting`,
    trash: ({ workspaceId }: { workspaceId: string }) =>
      `/dashboard/${workspaceId}/trash`,
  },
  form: {
    forms: ({ workspaceId }: { workspaceId: string }) =>
      `/dashboard/${workspaceId}/form`,
    byId: ({ formId, workspaceId }: { workspaceId: string; formId: string }) =>
      `/dashboard/${workspaceId}/form/${formId}`,
  },
}
