import { Module } from '@nestjs/common';
import { FormfieldcoreService } from './formfieldcore.service';

@Module({
  providers: [FormfieldcoreService],
  exports: [FormfieldcoreService],
})
export class FormfieldcoreModule {}
