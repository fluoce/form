import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { FormfieldcoreService } from 'src/core/formfieldcore/formfieldcore.service';
import { CreateFormFieldDto } from 'src/types/formfield.types';
import { ResponseDataType } from 'src/types/response.type';

@Injectable()
export class FormfieldService {
  constructor(private readonly formfieldcoreService: FormfieldcoreService) {}

  async createFiled(
    formId: string,
    formPageId: string,
    data: CreateFormFieldDto,
  ): Promise<ResponseDataType> {
    const formField = await this.formfieldcoreService.createField(
      formId,
      formPageId,
      data,
    );

    if (!formField) {
      throw new ServiceUnavailableException('Unable to create form field');
    }

    return {
      message: 'formfield created successfully',
      formField,
    };
  }
}
