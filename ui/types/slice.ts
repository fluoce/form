export type UserSlice = {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt?: string;
    mobile?: string | null;
    photo?: string | null;
};

export type WorkspaceSlice = {
    id: string;
    name: string;
    slug: string;
    ownerId: string;
    ownerEmail: string;
    plan: string;
    status: string;
    createdAt: string;
    updatedAt?: string;
    limits?: any | null;
}
