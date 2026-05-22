import { Module } from '@nestjs/common';
import { SubmitcoreService } from './submitcore.service';

@Module({
  providers: [SubmitcoreService],
  exports: [SubmitcoreService],
})
export class SubmitcoreModule {}
