import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitDto } from 'src/types/submit.types';
import { Public } from 'src/decorator/public.decorator';
import { FormGuard } from '../form/form.guard';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Public()
  @Post(':formId')
  async addSubmit(@Body() data: SubmitDto) {
    return await this.submitService.addSubmit(data);
  }

  @UseGuards(FormGuard)
  @Get(':formId')
  async getSubmit(@Param('formId') formId: string) {
    return await this.submitService.getSubmit(formId);
  }
}
