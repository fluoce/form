import { WorkspaceStatus, FormStatus } from "./slice"

export type WorkspaceSettingTab = "general" | "member" | "billing" | "domain" | "integration" | 'notification'

export type WorkspaceUpdateInputType = {
    workspaceId: string,
    name?: string,
    status?: WorkspaceStatus,
}

export type formSettingTab = "general"

export type formUpdateInputType = {
    formId: string
    workspaceId: string,
    name?: string,
    status?: FormStatus,
}