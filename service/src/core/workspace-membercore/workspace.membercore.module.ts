import { Module } from '@nestjs/common';
import { WorkspaceMembercoreService } from './workspace.membercore.service';

@Module({
    providers: [WorkspaceMembercoreService]
})
export class WorkspaceMembercoreModule { }
