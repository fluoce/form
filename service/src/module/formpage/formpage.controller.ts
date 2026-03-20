import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FormGuard } from '../form/form.guard';
import { FormpageService } from './formpage.service';
import { Form } from 'src/decorator/form.decorator';
import type { FormType } from 'src/types/form.types';
import { CreateFormPageDto, UpdateFormPageDto } from 'src/types/formpage.types';
import { FormpageGuard } from './formpage.guard';
import { FormPage } from 'src/decorator/formpage.decorator';
import type { FormPageType } from 'src/types/formpage.types';
import { FormPageIdPipe } from 'src/pipe/formpage.id.pipe';

@UseGuards(FormGuard)
@Controller('formpage/:formId')
export class FormpageController {
  constructor(private readonly formpageService: FormpageService) {}

  @Post()
  async createFormPage(
    @Form() form: FormType,
    @Body() data: CreateFormPageDto,
  ) {
    return await this.formpageService.createFormPage(form.id, data);
  }

  @UseGuards(FormpageGuard)
  @Patch(':formPageId')
  async updateFormPage(
    @Form() form: FormType,
    @FormPage() formPage: FormPageType,
    @Body() data: UpdateFormPageDto,
  ) {
    return await this.formpageService.updateFormPage(form.id, formPage, data);
  }

  @Delete(':formPageId')
  async deleteFormPage(
    @Param('formPageId', FormPageIdPipe) formPageId: string,
    @Form() form: FormType,
  ) {
    return await this.formpageService.deleteFormPage(form.id, formPageId);
  }

  @Get(':formPageId')
  async getFormPage(
    @Param('formPageId', FormPageIdPipe) formPageId: string,
    @Form() form: FormType,
  ) {
    return await this.formpageService.getFormPage(form.id, formPageId);
  }

  @Get()
  async getFormPages(@Form() form: FormType) {
    return await this.formpageService.getFormPages(form.id);
  }
}
