import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { User } from 'src/decorator/user.decorator';
import type { UserPayload } from 'src/types/payload.types';
import { WorkspaceIdPipe } from 'src/pipe/workspace.id.pipe';
import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
} from 'src/types/workspace.types';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async createWorkspace(
    @User() user: UserPayload,
    @Body() data: CreateWorkspaceDto,
  ) {
    return await this.workspaceService.createWorkspace(
      user.sub,
      user.email,
      data,
    );
  }

  @Get('trash')
  async getTrashWorkspaces(@User() user: UserPayload) {
    return await this.workspaceService.getTrashWorkspaces(user.sub);
  }

  @Patch(':workspaceId')
  async updateWorkspace(
    @Param('workspaceId', WorkspaceIdPipe) workspaceId: string,
    @User() user: UserPayload,
    @Body() data: UpdateWorkspaceDto,
  ) {
    return await this.workspaceService.updateWorkspace(
      user.sub,
      workspaceId,
      data,
    );
  }

  @Get(':workspaceId')
  async getWorkspace(
    @Param('workspaceId', WorkspaceIdPipe) workspaceId: string,
    @User() user: UserPayload,
  ) {
    return await this.workspaceService.getWorkspace(user.sub, workspaceId);
  }

  @Get()
  async getWorkspaces(@User() user: UserPayload) {
    return await this.workspaceService.getWorkspaces(user.sub);
  }

  @Delete(':workspaceId')
  async deleteWorkspace(
    @Param('workspaceId', WorkspaceIdPipe) workspaceId: string,
    @User() user: UserPayload,
  ) {
    return await this.workspaceService.deleteWorkspace(user.sub, workspaceId);
  }
}
