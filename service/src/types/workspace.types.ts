import { WorkspaceStatus, WorkspacePlan } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

const workspaceNameMessage =
  'Workspace name must be between 2 and 30 characters';

export interface WorkspaceLimitsInterface {
  maxForms?: number;
  maxMembers?: number;
  maxSubmissionsPerMonth?: number;
  unlimited?: boolean;
}

export class CreateWorkspaceDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: workspaceNameMessage,
  })
  @MaxLength(30, {
    message: workspaceNameMessage,
  })
  name: string;
}

export class UpdateWorkspaceDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: workspaceNameMessage,
  })
  @MaxLength(30, {
    message: workspaceNameMessage,
  })
  name?: string;

  @IsOptional()
  @IsEnum(WorkspaceStatus)
  status?: WorkspaceStatus;
}

export interface WorkspaceType {
  id: string;
  slug: string;
  name: string;
  ownerId: string;
  status: WorkspaceStatus;
  plan: WorkspacePlan;
  limits: any;
  createdAt: Date;
  updatedAt: Date;
}
