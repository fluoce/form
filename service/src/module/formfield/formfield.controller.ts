import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { FormpageGuard } from '../formpage/formpage.guard';
import { FormPage } from 'src/decorator/formpage.decorator';
import { type FormPageType } from 'src/types/formpage.types';
import { FormfieldService } from './formfield.service';
import { FormfieldGuard } from './formfield.guard';
import { FormField } from 'src/decorator/formfield.decorator';
import { CreateFormFieldDto } from 'src/types/formfield.types';

@Controller('form/:formId/formpage/:formPageId/formfield')
export class FormfieldController {
  constructor(private readonly formfieldService: FormfieldService) {}

  @UseGuards(FormpageGuard)
  @Post()
  async createField(
    @FormPage() formPage: FormPageType,
    @Body() data: CreateFormFieldDto,
  ) {
    return await this.formfieldService.createFiled(
      formPage.formId,
      formPage.id,
      data,
    );
  }

  @UseGuards(FormfieldGuard)
  @Patch(':formFieldId')
  async updateField(@FormField() formField: any) {}
}
