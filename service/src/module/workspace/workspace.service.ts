import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { WorkspacecoreService } from 'src/core/workspacecore/workspacecore.service';
import { ResponseDataType } from 'src/types/response.type';
import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
} from 'src/types/workspace.types';

@Injectable()
export class WorkspaceService {
  constructor(private readonly workspacecoreService: WorkspacecoreService) {}

  async createWorkspace(
    ownerId: string,
    ownerEmail: string,
    data: CreateWorkspaceDto,
  ): Promise<ResponseDataType> {
    const workspace = await this.workspacecoreService.createWorkspace(
      ownerId,
      ownerEmail,
      data,
    );
    if (!workspace) {
      throw new ServiceUnavailableException('Unable to create workspace');
    }
    return {
      message: 'workspace created successfully',
      workspace,
    };
  }

  async updateWorkspace(
    ownerId: string,
    workspaceId: string,
    data: UpdateWorkspaceDto,
  ): Promise<ResponseDataType> {
    if (!data.name && !data.status) {
      throw new BadRequestException('No update data provided');
    }
    const workspace = await this.workspacecoreService.updateWorkspace(
      ownerId,
      workspaceId,
      data,
    );
    if (!workspace) {
      throw new NotFoundException('Workspace not found or has been deleted');
    }
    return {
      message: 'Workspace updated successfully',
      workspace,
    };
  }

  async getWorkspace(ownerId: string, id: string): Promise<ResponseDataType> {
    const workspace = await this.workspacecoreService.getWorkspace(ownerId, id);
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    return {
      message: 'workspace fetched successfully',
      workspace,
    };
  }

  async getWorkspaces(ownerId: string): Promise<ResponseDataType> {
    const workspaces = await this.workspacecoreService.getWorkspaces(ownerId);
    if (!workspaces) {
      throw new NotFoundException('Workspaces not found');
    }
    return {
      message: 'workspaces fetched successfully',
      workspaces,
    };
  }

  async getTrashWorkspaces(ownerId: string): Promise<ResponseDataType> {
    const workspaces =
      await this.workspacecoreService.getTrashWorkspaces(ownerId);
    if (!workspaces) {
      throw new NotFoundException('Trash Workspaces not found');
    }
    return {
      message: 'Trash workspaces fetched successfully',
      workspaces,
    };
  }

  async deleteWorkspace(
    ownerId: string,
    id: string,
  ): Promise<ResponseDataType> {
    const workspaceDeleteSuccess =
      await this.workspacecoreService.deleteWorkspace(ownerId, id);
    if (!workspaceDeleteSuccess) {
      throw new NotFoundException(
        'Workspace not found or could not be permanently deleted',
      );
    }
    return {
      message: 'workspace permanently deleted',
    };
  }
}
