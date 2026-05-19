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
    public: ({ formId }: { formId: string }) => `/form/public/${formId}`,
  },
  formPage: {
    create: ({ formId }: { formId: string }) => `/form/${formId}/formpage`,
    byId: ({ formId, formPageId }: { formId: string; formPageId: string }) =>
      `/form/${formId}/formpage/${formPageId}`,
    all: ({ formId }: { formId: string }) => `/form/${formId}/formpage`,
  },
  field: {
    create: ({ formId, formPageId }: { formId: string; formPageId: string }) =>
      `/form/${formId}/formpage/${formPageId}/field`,
    byId: ({
      formId,
      formPageId,
      fieldId,
    }: {
      formId: string
      formPageId: string
      fieldId: string
    }) => `/form/${formId}/formpage/${formPageId}/field/${fieldId}`,
    all: ({ formId, formPageId }: { formId: string; formPageId: string }) =>
      `/form/${formId}/formpage/${formPageId}/field`,
  },
}
