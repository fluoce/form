export const urls = {
  auth: {
    me: "/me",
    refresh: "/refresh",
    exchange: "/exchange",
    logout: "/logout",
  },
  workspace: {
    base: "/workspace",
    byId: ({ workspaceId }: { workspaceId: string }) =>
      `/workspace/${workspaceId}`,
    trash: "/workspace/trash",
  },
  form: {
    create: ({ workspaceId }: { workspaceId: string }) =>
      `/form/${workspaceId}`,
    byId: ({ formId }: { formId: string }) => `/form/${formId}`,
    trash: ({ workspaceId }: { workspaceId: string }) =>
      `/form/trash/${workspaceId}`,
    all: ({ workspaceId }: { workspaceId: string }) =>
      `/form/all/${workspaceId}`,
  },
}
