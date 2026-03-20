import { Module } from '@nestjs/common';
import { FormpagecoreService } from './formpagecore.service';

@Module({
  providers: [FormpagecoreService],
  exports: [FormpagecoreService]
})
export class FormpagecoreModule { }
