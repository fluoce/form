export const authRoutes = {
  ex: "/exchange",
  rf: "/refresh",
  me: "/me",
};

export const meUrlPath = {
  base: "/me",
};

export const workspaceUrlPath = {
  base: "/workspace",
  mutation: (workspaceId: string) => `/workspace/${workspaceId}`,
  query: (workspaceId: string) => `/workspace/${workspaceId}`,
  queryTrash: "/workspace/trash",
};

export const formUrlPath = {
  createMutation: (workspaceId: string) => `/form/${workspaceId}`,
  mutation: (formId: string) => `/form/${formId}`,
  query: (formId: string) => `/form/${formId}`,
  queryAll: (worksapceId: string) => `/form/all/${worksapceId}`,
  queryTrash: (worksapceId: string) => `/form/trash/${worksapceId}`,
};

export const formPageUrlPath = {
  createMutation: (formId: string) => `/form/${formId}/formpage`,
  mutation: (formId: string, formPageId: string) =>
    `/form/${formId}/formpage/${formPageId}`,
  query: (formId: string, formPageId: string) =>
    `/form/${formId}/formpage/${formPageId}`,
  queryAll: (formId: string) => `/form/${formId}/formpage`,
};

export const formFieldUrlPath = {
  createMutation: (formId: string, formPageId: string) =>
    `/form/${formId}/formpage/${formPageId}/formfield`,
  mutation: (formId: string, formPageId: string, formFieldId: string) =>
    `/form/${formId}/formpage/${formPageId}/formfield/${formFieldId}`,
  query: (formId: string, formPageId: string, formFieldId: string) =>
    `/form/${formId}/formpage/${formPageId}/formfield/${formFieldId}`,
  queryAll: (formId: string, formPageId: string) =>
    `/form/${formId}/formpage/${formPageId}/formfield`,
};
