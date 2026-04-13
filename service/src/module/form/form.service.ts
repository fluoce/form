import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FormcoreService } from 'src/core/formcore/formcore.service';
import { CreateFormDto, UpdateFormDto } from 'src/types/form.types';
import { ResponseDataType } from 'src/types/response.type';

@Injectable()
export class FormService {
  constructor(private readonly formcoreService: FormcoreService) {}

  async createForm(
    userId: string,
    workspaceId: string,
    data: CreateFormDto,
  ): Promise<ResponseDataType> {
    const form = await this.formcoreService.createForm(
      userId,
      workspaceId,
      data,
    );
    if (!form) {
      throw new ServiceUnavailableException('Unable to create Form');
    }
    return {
      message: 'form created successfully',
      form,
    };
  }

  async updateForm(
    userId: string,
    formId: string,
    data: UpdateFormDto,
  ): Promise<ResponseDataType> {
    const form = await this.formcoreService.updateForm(userId, formId, data);
    if (!form) {
      throw new NotFoundException('form not found or failed to update');
    }
    return {
      message: 'form updated successfully',
      form,
    };
  }

  async deleteForm(userId: string, formId: string): Promise<ResponseDataType> {
    const form = await this.formcoreService.deleteForm(userId, formId);
    if (!form) {
      throw new NotFoundException('form not found or failed to delete');
    }
    return {
      message: 'form delete successfully',
    };
  }

  async getForm(userId: string, formId: string): Promise<ResponseDataType> {
    const form = await this.formcoreService.getForm(userId, formId);
    if (!form) {
      throw new NotFoundException('form not found');
    }

    return {
      message: 'form fetched successfully',
      form,
    };
  }

  async getTrashForm(
    userId: string,
    workspaceId: string,
  ): Promise<ResponseDataType> {
    const forms = await this.formcoreService.getTrashForm(userId, workspaceId);
    if (!forms) {
      throw new NotFoundException('Forms not found');
    }
    return {
      message: 'trash forms fetched successfully',
      forms,
    };
  }

  async getForms(
    userId: string,
    workspaceId: string,
  ): Promise<ResponseDataType> {
    const forms = await this.formcoreService.getForms(userId, workspaceId);
    if (!forms) {
      throw new NotFoundException('Forms not found');
    }
    return {
      message: 'forms fetched successfully',
      forms,
    };
  }
}
