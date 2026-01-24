import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { User } from 'src/decorator/user.decorator';
import type { UserPayload } from 'src/types/payload.types';
import { WorkspaceIdPipe } from 'src/pipe/workspace.id.pipe';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from 'src/types/workspace.types';

@Controller('workspace')
export class WorkspaceController {

    constructor(private readonly workspaceService: WorkspaceService) { }

    @Post()
    async createWorkspace(
        @User() user: UserPayload,
        @Body() data: CreateWorkspaceDto
    ) {
        const ownerId = user.sub
        const ownerEmail = user.email
        return await this.workspaceService.createWorkspace(ownerId, ownerEmail, data)
    }

    @Get("trash")
    async getTrashWorkspaces(@User() user: UserPayload
    ) {
        const ownerId = user.sub
        return await this.workspaceService.getTrashWorkspaces(ownerId)
    }

    @Patch(":workspaceId")
    async updateWorkspace(
        @Param("workspaceId", WorkspaceIdPipe) workspaceId: string,
        @User() user: UserPayload,
        @Body() data: UpdateWorkspaceDto
    ) {
        const ownerId = user.sub
        return await this.workspaceService.updateWorkspace(ownerId, workspaceId, data)
    }

    @Get(":workspaceId")
    async getWorkspace(
        @Param("workspaceId", WorkspaceIdPipe) workspaceId: string,
        @User() user: UserPayload
    ) {
        const ownerId = user.sub
        return await this.workspaceService.getWorkspace(ownerId, workspaceId)
    }

    @Get()
    async getWorkspaces(
        @User() user: UserPayload
    ) {
        const ownerId = user.sub
        return await this.workspaceService.getWorkspaces(ownerId)
    }

    @Delete(":workspaceId")
    async deleteWorkspace(
        @Param("workspaceId", WorkspaceIdPipe) workspaceId: string,
        @User() user: UserPayload
    ) {
        const ownerId = user.sub
        return await this.workspaceService.deleteWorkspace(ownerId, workspaceId)
    }
}
