export type UserSlice = {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt?: string;
    mobile?: string | null;
    photo?: string | null;
};

export type WorkspacePlan =
    | "STARTER"
    | "PLUS"
    | "PRO"
    | "PREMIUM"
    | "ENTERPRISE";

export type WorkspaceStatus =
    | "ACTIVE"
    | "INACTIVE"
    | "SUSPENDED"
    | "DELETED"

export type WorkspaceSlice = {
    id: string;
    name: string;
    slug: string;
    ownerId: string;
    ownerEmail: string;
    plan: WorkspacePlan;
    status: WorkspaceStatus;
    createdAt: string;
    updatedAt?: string;
    limits?: any | null;
}

export type FormStatus =
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED"

export type FormSlice = {
    id: string;
    workspaceId: string;
    userId: string;
    name: string;
    slug: string;
    description?: string;
    status: FormStatus;
    createdAt: string;
    updatedAt: string;
}