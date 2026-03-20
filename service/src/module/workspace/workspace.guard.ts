import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { WorkspacecoreService } from 'src/core/workspacecore/workspacecore.service';
import { validateId } from 'src/func/validate-id';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { UserPayload } from 'src/types/payload.types';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(
    private readonly workspacecoreService: WorkspacecoreService,
    private readonly ulidService: UlidService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const user = (req as any).user as UserPayload;
    const userId = user.sub;
    const { workspaceId } = req.params as { workspaceId: string };

    if (!workspaceId) {
      throw new BadRequestException('Workspace Id not provided');
    }

    validateId(workspaceId, 'ws', (ulid) => this.ulidService.isValidUlid(ulid));

    const workspace = await this.workspacecoreService.getWorkspace(
      userId,
      workspaceId,
    );

    if (!workspace) {
      throw new ForbiddenException('No workspace access');
    }

    (req as any).workspace = workspace;

    return true;
  }
}
