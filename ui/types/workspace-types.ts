export type WorkspacePlanType =
  | "STARTER"
  | "PLUS"
  | "PRO"
  | "PREMIUM"
  | "ENTERPRISE"

export type WorkspaceStatusType =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "DELETED"

export interface WorkspaceType {
  id: string
  name: string
  slug: string
  ownerId: string
  ownerEmail: string
  plan: WorkspacePlanType
  status: WorkspaceStatusType
  createdAt?: string
  updatedAt?: string
  limits?: any | null
}

export type WorkspaceCreateType = {
  name: string
}

export type WorkspaceUpdateType = {
  workspaceId: string
  name?: string
  status?: WorkspaceStatusType
}
