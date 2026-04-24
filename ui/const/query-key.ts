export const queryKeys = {
  workspace: {
    all: ["workspaces"],
    byId: ({ workspaceId }: { workspaceId: string }) => [
      "workspace",
      workspaceId,
    ],
    trash: ["workspace", "trash"],
  },
  form: {
    all: ({ workspaceId }: { workspaceId: string }) => ["forms", workspaceId],
    byId: ({ formId }: { formId: string }) => ["form", formId],
    trash: ({ workspaceId }: { workspaceId: string }) => [
      "form",
      "trash",
      workspaceId,
    ],
  },
  formPage: {
    all: ({ formId }: { formId: string }) => ["form-page", formId],
    byId: ({ formId, formPageId }: { formId: string; formPageId: string }) => [
      "form-page",
      formId,
      formPageId,
    ],
  },
  field: {
    all: ({ formId, formPageId }: { formId: string; formPageId: string }) => [
      "field",
      formId,
      formPageId,
    ],
    byId: ({
      formId,
      formPageId,
      fieldId,
    }: {
      formId: string
      formPageId: string
      fieldId: string
    }) => ["field", formId, formPageId, fieldId],
  },
}
