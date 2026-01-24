import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { WorkspacecoreModule } from 'src/core/workspacecore/workspacecore.module';

@Module({
  imports: [WorkspacecoreModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService]
})
export class WorkspaceModule { }
