import { Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { FormpageGuard } from '../formpage/formpage.guard';
import { FormPage } from 'src/decorator/formpage.decorator';
import { type FormPageType } from 'src/types/formpage.types';
import { FormfieldService } from './formfield.service';
import { FormfieldGuard } from './formfield.guard';
import { FormField } from 'src/decorator/formfield.decorator';

@Controller('form/:formId/formpage/:formPageId/formfield')
export class FormfieldController {
  constructor(private readonly formfieldService: FormfieldService) {}

  @UseGuards(FormpageGuard)
  @Post()
  async createField(@FormPage() formPage: FormPageType) {}

  @UseGuards(FormfieldGuard)
  @Patch(':formFieldId')
  async updateField(@FormField() formField: any) {}
}
