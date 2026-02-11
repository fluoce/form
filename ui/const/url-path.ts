export const meUrlPath = {
    base: '/me'
}

export const workspaceUrlPath = {
    base: "/workspace",
    mutation: (workspaceId: string) => `/workspace/${workspaceId}`,
    query: (workspaceId: string) => `/workspace/${workspaceId}`,
    queryTrash: "/workspace/trash"
}

export const formUrlPath = {
    base: `/form`,
    createMutation: (workspaceId: string) => `/form/${workspaceId}`,
    mutation: (formId: string) => `/form/${formId}`,
    query: (formId: string) => `/form/${formId}`,
    queryAll: (worksapceId: string) => `/form/all/${worksapceId}`,
    queryTrash: (worksapceId: string) => `/form/trash/${worksapceId}`
}
