import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { SlugService } from 'src/lib/slug/slug.service';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { CreateWorkspaceDto, UpdateWorkspaceDto, WorkspaceType } from 'src/types/workspace.types';

@Injectable()
export class WorkspacecoreService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly ulidService: UlidService,
        private readonly slugService: SlugService
    ) { }

    async workspaceSlugExist(slug: string): Promise<boolean> {
        const exist = await this.prisma.workspace.findUnique({
            where: {
                slug
            },
        })
        if (exist) {
            return true
        }
        return false
    }

    async createWorkspace(ownerId: string, ownerEmail: string, data: CreateWorkspaceDto): Promise<WorkspaceType | null> {
        let baseSlug = this.slugService.baseSlug(data.name);
        let slug = baseSlug;
        let tries = 0;
        const maxTries = 3;
        while (await this.workspaceSlugExist(slug) && tries < maxTries) {
            slug = this.slugService.generateUniqueSlug(baseSlug);
            tries++;
        }
        if (!slug || await this.workspaceSlugExist(slug)) return null;
        return await this.prisma.workspace.create({
            data: {
                id: this.ulidService.generateWorkspaceId('ws'),
                name: data.name,
                slug,
                ownerId,
                ownerEmail
            }
        });
    }

    async updateWorkspace(ownerId: string, id: string, data: UpdateWorkspaceDto): Promise<WorkspaceType | null> {
        const updateData = {
            name: data.name ?? undefined,
            status: data.status ?? undefined
        }
        const workspace = await this.prisma.workspace.findFirst({
            where: {
                id,
                ownerId,
            },
        });
        if (!workspace) return null;
        return this.prisma.workspace.update({
            where: {
                id: workspace.id
            },
            data: {
                ...updateData
            },
        });
    }

    async getWorkspace(ownerId: string, id: string): Promise<WorkspaceType | null> {
        return await this.prisma.workspace.findFirst({
            where: {
                id,
                ownerId,
                status: { not: 'DELETED' }
            }
        });
    }

    async getWorkspaces(ownerId: string): Promise<WorkspaceType[] | null> {
        return await this.prisma.workspace.findMany({
            where: {
                ownerId,
                status: { not: 'DELETED' }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
    }

    async getTrashWorkspaces(ownerId: string): Promise<WorkspaceType[] | null> {
        return await this.prisma.workspace.findMany({
            where: {
                ownerId,
                status: "DELETED"
            }
        })
    }

    async deleteWorkspace(ownerId: string, id: string): Promise<boolean> {
        const result = await this.prisma.workspace.deleteMany({
            where: {
                id,
                ownerId
            }
        })
        return result.count === 1;
    }

}
