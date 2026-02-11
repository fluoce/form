
export const meQueryKey = {
    me: ['me']
}

export const workspaceQueryKey = {
    workspaces: ['workspaces'],
    workspace: (workspaceId: string) => {
        return ['workspace', `${workspaceId}`]
    },
    trashWorkspaces: ['workspace', 'trash',]
}

export const formQueryKey = {
    forms: (workspaceId: string) => {
        return ['forms', workspaceId]
    },
    form: (formId: string) => {
        return ['form', formId]
    },
    trashForms: (workspaceId: string) => {
        return ['forms', 'trash', workspaceId]
    },
}