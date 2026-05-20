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
import { FormPagePresetDto } from 'src/types/formpage.types';

@Controller('form/:formId/formpage')
export class FormpageController {
  constructor(private readonly formpageService: FormpageService) {}

  @UseGuards(FormGuard)
  @Post()
  async createFormPage(
    @Form() form: FormType,
    @Body() data: CreateFormPageDto,
  ) {
    return await this.formpageService.createFormPage(form.id, data);
  }

  @UseGuards(FormGuard)
  @Post('preset')
  async createPresetFormPage(
    @Form() form: FormType,
    @Body() data: FormPagePresetDto,
  ) {
    return await this.formpageService.createPresetFormPage(form.id, data);
  }

  @UseGuards(FormpageGuard)
  @Patch(':formPageId')
  async updateFormPage(
    @FormPage() formPage: FormPageType,
    @Body() data: UpdateFormPageDto,
  ) {
    return await this.formpageService.updateFormPage(
      formPage.formId,
      formPage,
      data,
    );
  }

  @UseGuards(FormpageGuard)
  @Delete(':formPageId')
  async deleteFormPage(
    @Param('formPageId', FormPageIdPipe) formPageId: string,
    @FormPage() formPage: FormPageType,
  ) {
    return await this.formpageService.deleteFormPage(
      formPage.formId,
      formPageId,
    );
  }

  @UseGuards(FormpageGuard)
  @Get(':formPageId')
  async getFormPage(
    @Param('formPageId', FormPageIdPipe) formPageId: string,
    @FormPage() formPage: FormPageType,
  ) {
    return await this.formpageService.getFormPage(formPage.formId, formPageId);
  }

  @UseGuards(FormGuard)
  @Get()
  async getFormPages(@Form() form: FormType) {
    return await this.formpageService.getFormPages(form.id);
  }
}
