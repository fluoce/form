import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FormpagecoreService } from 'src/core/formpagecore/formpagecore.service';
import {
  CreateFormPageDto,
  FormPageType,
  UpdateFormPageDto,
} from 'src/types/formpage.types';
import { ResponseDataType } from 'src/types/response.type';

@Injectable()
export class FormpageService {
  constructor(private readonly formpagecoreService: FormpagecoreService) {}

  async createFormPage(
    formId: string,
    data: CreateFormPageDto,
  ): Promise<ResponseDataType> {
    const formPage = await this.formpagecoreService.createFormPage(
      formId,
      data,
    );
    if (!formPage) {
      throw new ServiceUnavailableException('Unable to create form page');
    }
    return {
      message: 'form page created successfully',
      formPage,
    };
  }

  async updateFormPage(
    formId: string,
    formPage: Pick<FormPageType, 'id' | 'position'>,
    data: UpdateFormPageDto,
  ): Promise<ResponseDataType> {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('Invalid data for updating form page');
    }
    if (data.position && data.position < 1) {
      throw new BadRequestException('Position must be at least 1');
    }
    const totalFormPageCount =
      await this.formpagecoreService.totalFormPageCount(formId);
    if (totalFormPageCount && data.position) {
      if (data.position > totalFormPageCount.valueOf()) {
        throw new BadRequestException(
          `Position cannot exceed ${totalFormPageCount}`,
        );
      }
    }
    const updatedFormPage = await this.formpagecoreService.updateFormPage(
      formId,
      formPage,
      data,
    );
    if (!updatedFormPage) {
      throw new ServiceUnavailableException('Unable to update form page');
    }
    return {
      message: 'form page update successfully',
      formPage: updatedFormPage,
    };
  }

  async deleteFormPage(
    formId: string,
    formPageId: string,
  ): Promise<ResponseDataType> {
    const formPage = await this.formpagecoreService.deleteFormPage(
      formId,
      formPageId,
    );
    if (!formPage) {
      throw new ServiceUnavailableException('Unable to update form page');
    }
    return {
      message: 'form page deleted successfully',
      formPage,
    };
  }

  async getFormPage(
    formId: string,
    formPageId: string,
  ): Promise<ResponseDataType> {
    const formPage = await this.formpagecoreService.getFormPage(
      formId,
      formPageId,
    );
    if (!formPage) {
      throw new NotFoundException('Form page not found');
    }
    return {
      message: 'form page fetched successfully',
      formPage,
    };
  }

  async getFormPages(formId: string): Promise<ResponseDataType> {
    const formPages = await this.formpagecoreService.getFormPages(formId);
    if (!formPages) {
      throw new NotFoundException('Form pages not found');
    }
    return {
      message: 'form pages fetched successfully',
      formPages,
    };
  }
}
