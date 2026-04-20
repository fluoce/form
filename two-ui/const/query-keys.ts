export const meQueryKey = {
  me: ["me"],
};

export const workspaceQueryKey = {
  workspaces: ["workspaces"],
  workspace: (workspaceId: string) => {
    return ["workspace", `${workspaceId}`];
  },
  trashWorkspaces: ["workspace", "trash"],
};

export const formQueryKey = {
  forms: (workspaceId: string) => {
    return ["forms", workspaceId];
  },
  form: (formId: string) => {
    return ["form", formId];
  },
  trashForms: (workspaceId: string) => {
    return ["forms", "trash", workspaceId];
  },
};

export const formPageQueryKey = {
  formPages: (formId: string) => {
    return ["formPages", formId];
  },
  formPage: (formId: string, formPageId: string) => {
    return ["formPage", formId, formPageId];
  },
};

export const formFieldQueryKey = {
  formFields: (formId: string, formPageId: string) => {
    return ["formField", formId, formPageId];
  },
  formField: (formId: string, formPageId: string, formFieldId: string) => {
    return ["formField", formId, formPageId, formFieldId];
  },
};
