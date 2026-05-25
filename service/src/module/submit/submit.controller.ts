import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitDto } from 'src/types/submit.types';
import { Public } from 'src/decorator/public.decorator';
import { FormGuard } from '../form/form.guard';
import type { Request } from 'express';
import { UAParserService } from 'src/lib/uaparser/uaparser.service';

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
  async getSubmitOverview(@Param('formId') formId: string) {
    return await this.submitService.getSubmitOverview(formId);
  }

  @UseGuards(FormGuard)
  @Get(':formId')
  async getSubmits(@Param('formId') formId: string) {
    return await this.submitService.getSubmits(formId);
  }
}
