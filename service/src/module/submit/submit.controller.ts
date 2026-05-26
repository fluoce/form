import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitDeleteDto, SubmitDto } from 'src/types/submit.types';
import { Public } from 'src/decorator/public.decorator';
import { FormGuard } from '../form/form.guard';
import type { Request } from 'express';
import { UAParserService } from 'src/lib/uaparser/uaparser.service';
import { Form } from 'src/decorator/form.decorator';
import type { FormType } from 'src/types/form.types';

@Controller('submit')
export class SubmitController {
  constructor(
    private readonly submitService: SubmitService,
    private readonly uaParser: UAParserService,
  ) {}

  @Public()
  @Post(':formId')
  async addSubmit(@Req() req: Request, @Body() data: SubmitDto) {
    const parser = this.uaParser.parseUserAgent(req);
    return await this.submitService.addSubmit(data, {
      ipAddress: parser.ipAddress || '',
      userAgent: {
        browser: parser.browser || '',
        device: parser.device || '',
        os: parser.os || '',
      },
    });
  }

  @UseGuards(FormGuard)
  @Get('overview/:formId')
  async getSubmitOverview(@Form() form: FormType) {
    return await this.submitService.getSubmitOverview(form.id);
  }

  @UseGuards(FormGuard)
  @Get(':formId')
  async getSubmits(@Form() form: FormType) {
    return await this.submitService.getSubmits(form.id);
  }

  @UseGuards(FormGuard)
  @Delete(':formId')
  async deleteSubmits(@Form() form: FormType, @Body() data: SubmitDeleteDto) {
    return await this.submitService.deleteSubmits(form.id, data);
  }
}
