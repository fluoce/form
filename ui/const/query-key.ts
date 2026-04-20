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
    trash: ["form", "trash"],
  },
}
