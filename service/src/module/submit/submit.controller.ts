import { Body, Controller, Post } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitDto } from 'src/types/submit.types';
import { Public } from 'src/decorator/public.decorator';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Public()
  @Post(':formId')
  async addSubmit(@Body() data: SubmitDto) {
    return await this.submitService.addSubmit(data);
  }
}
