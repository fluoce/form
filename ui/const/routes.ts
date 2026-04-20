export const routes = {
  base: "/",
  dashboard: {
    base: "/dashboard",
    createWorkspace: "/dashboard/create-workspace",
    workspace: ({ workspaceId }: { workspaceId: string }) =>
      `/dashboard/${workspaceId}`,
  },
  form: {
    forms: ({ workspaceId }: { workspaceId: string }) =>
      `/dashboard/${workspaceId}/form`,
    byId: ({ formId, workspaceId }: { workspaceId: string; formId: string }) =>
      `/dashboard/${workspaceId}/form/${formId}`,
  },
}
