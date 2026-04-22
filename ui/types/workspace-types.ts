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
  | "ARCHIVED"

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
  name?: string
  status?: WorkspaceStatusType
}
