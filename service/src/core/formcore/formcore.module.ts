import { Module } from '@nestjs/common';
import { FormcoreService } from './formcore.service';

@Module({
  providers: [FormcoreService],
  exports: [FormcoreService]
})
export class FormcoreModule { }
