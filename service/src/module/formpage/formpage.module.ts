import { Module } from '@nestjs/common';
import { FormpageController } from './formpage.controller';
import { FormpageService } from './formpage.service';
import { FormpagecoreModule } from 'src/core/formpagecore/formpagecore.module';
import { FormcoreModule } from 'src/core/formcore/formcore.module';

@Module({
  imports: [FormcoreModule, FormpagecoreModule],
  controllers: [FormpageController],
  providers: [FormpageService]
})
export class FormpageModule { }
