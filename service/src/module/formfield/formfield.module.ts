import { Module } from '@nestjs/common';
import { FormfieldController } from './formfield.controller';
import { FormfieldService } from './formfield.service';
import { FormpagecoreModule } from 'src/core/formpagecore/formpagecore.module';
import { FormfieldcoreModule } from 'src/core/formfieldcore/formfieldcore.module';

@Module({
  imports: [FormpagecoreModule, FormfieldcoreModule],
  controllers: [FormfieldController],
  providers: [FormfieldService],
})
export class FormfieldModule {}
