import { Module } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitController } from './submit.controller';
import { SubmitcoreModule } from 'src/core/submitcore/submitcore.module';
import { FormpagecoreModule } from 'src/core/formpagecore/formpagecore.module';
import { FormcoreModule } from 'src/core/formcore/formcore.module';

@Module({
  imports: [SubmitcoreModule, FormcoreModule, FormpagecoreModule],
  providers: [SubmitService],
  controllers: [SubmitController],
})
export class SubmitModule {}
