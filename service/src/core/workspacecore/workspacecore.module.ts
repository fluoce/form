import { Module } from '@nestjs/common';
import { WorkspacecoreService } from './workspacecore.service';

@Module({
  providers: [WorkspacecoreService],
  exports: [WorkspacecoreService]
})
export class WorkspacecoreModule { }
