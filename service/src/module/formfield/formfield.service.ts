import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { FormfieldcoreService } from 'src/core/formfieldcore/formfieldcore.service';
import {
  CreateFormFieldDto,
  UpdateFormFieldDto,
} from 'src/types/formfield.types';
import { ResponseDataType } from 'src/types/response.type';

@Injectable()
export class FormfieldService {
  constructor(private readonly formfieldcoreService: FormfieldcoreService) {}

  async createField(
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

  async updateField(
    formFieldId: string,
    formPageId: string,
    data: UpdateFormFieldDto,
  ): Promise<ResponseDataType> {
    const formField = await this.formfieldcoreService.updateField(
      formFieldId,
      formPageId,
      data,
    );

    if (!formField) {
      throw new ServiceUnavailableException('Unable to update form field');
    }

    return {
      message: 'formfield updated successfully',
      formField,
    };
  }

  async deleteField(
    formFieldId: string,
    formPageId: string,
  ): Promise<ResponseDataType> {
    const formField = await this.formfieldcoreService.deleteField(
      formFieldId,
      formPageId,
    );

    if (!formField) {
      throw new ServiceUnavailableException('Unable to delete form field');
    }

    return {
      message: 'formfield delete successfully',
      formField,
    };
  }

  async getField(
    formFieldId: string,
    formPageId: string,
  ): Promise<ResponseDataType> {
    const formField = await this.formfieldcoreService.getField(
      formFieldId,
      formPageId,
    );

    if (!formField) {
      throw new ServiceUnavailableException('Unable to get form field');
    }

    return {
      message: 'formfield fetched successfully',
      formField,
    };
  }

  async getPageFields(
    formId: string,
    formPageId: string,
  ): Promise<ResponseDataType> {
    const formFields = await this.formfieldcoreService.getPageFields(
      formId,
      formPageId,
    );

    if (!formFields) {
      throw new ServiceUnavailableException('Unable to get form fields');
    }

    return {
      message: 'formfields fetched successfully',
      formFields,
    };
  }
}
