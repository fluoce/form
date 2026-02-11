import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { FormcoreModule } from 'src/core/formcore/formcore.module';
import { WorkspacecoreModule } from 'src/core/workspacecore/workspacecore.module';

@Module({
  imports: [WorkspacecoreModule, FormcoreModule],
  controllers: [FormController],
  providers: [FormService]
})
export class FormModule { }
