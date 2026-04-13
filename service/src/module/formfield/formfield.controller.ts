import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FormpageGuard } from '../formpage/formpage.guard';
import { FormPage } from 'src/decorator/formpage.decorator';
import { type FormPageType } from 'src/types/formpage.types';
import { FormfieldService } from './formfield.service';
import { FormfieldGuard } from './formfield.guard';
import { FormField } from 'src/decorator/formfield.decorator';
import {
  CreateFormFieldDto,
  UpdateFormFieldDto,
  type FormFieldType,
} from 'src/types/formfield.types';

@Controller('form/:formId/formpage/:formPageId/formfield')
export class FormfieldController {
  constructor(private readonly formfieldService: FormfieldService) {}

  @UseGuards(FormpageGuard)
  @Post()
  async createField(
    @FormPage() formPage: FormPageType,
    @Body() data: CreateFormFieldDto,
  ) {
    return await this.formfieldService.createField(
      formPage.formId,
      formPage.id,
      data,
    );
  }

  @UseGuards(FormfieldGuard)
  @Put(':formFieldId')
  async updateField(
    @FormField() formField: FormFieldType,
    @Body() data: UpdateFormFieldDto,
  ) {
    return await this.formfieldService.updateField(
      formField.id,
      formField.formPageId,
      data,
    );
  }

  @UseGuards(FormfieldGuard)
  @Delete(':formFieldId')
  async deleteField(@FormField() formField: FormFieldType) {
    return await this.formfieldService.deleteField(
      formField.id,
      formField.formPageId,
    );
  }

  @UseGuards(FormfieldGuard)
  @Get(':formFieldId')
  async getFiled(@FormField() formField: FormFieldType) {
    return await this.formfieldService.getField(
      formField.id,
      formField.formPageId,
    );
  }

  @UseGuards(FormpageGuard)
  @Get()
  async getPageFields(@FormPage() formPage: FormPageType) {
    return await this.formfieldService.getPageFields(
      formPage.formId,
      formPage.id,
    );
  }
}
