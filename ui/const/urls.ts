export const urls = Object.freeze({
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
    preview: ({ formId }: { formId: string }) => `/form/preview/${formId}`,
    publish: ({
      workspaceId,
      formId,
    }: {
      workspaceId: string
      formId: string
    }) => `/form/${workspaceId}/publish/${formId}`,
    public: ({ shareId }: { shareId: string }) => `/form/public/${shareId}`,
  },
  formPage: {
    create: ({ formId }: { formId: string }) => `/form/${formId}/formpage`,
    byId: ({ formId, formPageId }: { formId: string; formPageId: string }) =>
      `/form/${formId}/formpage/${formPageId}`,
    all: ({ formId }: { formId: string }) => `/form/${formId}/formpage`,
    preset: ({ formId }: { formId: string }) =>
      `/form/${formId}/formpage/preset`,
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
  submit: {
    addSubmit: ({ formId }: { formId: string }) => `/submit/${formId}`,
  },
})

export const externalUrl = Object.freeze({
  fluoce: "https://fluoce.com",
  fluoceFristForm: "https://form.fluoce.com/01KS71NWJFJN36PVGFZYNYMHJ5",
})
