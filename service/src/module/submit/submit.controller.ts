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
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      req.ip;
    console.log('req-headers', req.headers);
    const userAgent = req.headers['user-agent'] || '';
    const parser = this.uaParser.parseUserAgent(userAgent);
    return await this.submitService.addSubmit(data, {
      ipAddress: ipAddress || '',
      userAgent: parser,
    });
  }

  @UseGuards(FormGuard)
  @Get('overview/:formId')
  async getSubmitOverview(@Param('formId') formId: string) {
    return await this.submitService.getSubmitOverview(formId);
  }

  @UseGuards(FormGuard)
  @Get(':formId')
  async getSubmit(@Param('formId') formId: string) {
    return await this.submitService.getSubmit(formId);
  }
}
