import { formSettingTab, WorkspaceSettingTab } from "@/types/type"

export const authRoutes = {
    ex: "/exchange",
    rf: "/refresh",
    me: "/me"
}

const base = '/dash'

const workspaceBase = '/ws'

export const workspaceRoutes = {
    create: `${base}/create-workspace`,
    dash: (workspaceId: string) => {
        return `${base}/${workspaceId}`
    },
    allForm: (workspaceId: string) => {
        return `${base}/${workspaceId}/forms`
    },
    setting: (workspaceId: string, tab: WorkspaceSettingTab) => {
        return `${workspaceBase}/${workspaceId}/${tab}`
    }
}

const formBase = '/form'

export const formRoutes = {
    formDash: (workspaceId: string, formId: string) => {
        return `${formBase}/${workspaceId}/${formId}`
    },
    setting: (workspaceId: string, formId: string, tab: formSettingTab) => {
        return `${formBase}/${workspaceId}/${formId}/${tab}`
    }
}