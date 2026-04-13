import { Injectable } from '@nestjs/common';
import { createFractionalIndex } from 'src/func/fractional-indexing';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UlidService } from 'src/lib/ulid/ulid.service';
import {
  CreateFormFieldDto,
  FormFieldType,
  UpdateFormFieldDto,
} from 'src/types/formfield.types';

@Injectable()
export class FormfieldcoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ulidService: UlidService,
  ) {}

  async createField(
    formId: string,
    formPageId: string,
    data: CreateFormFieldDto,
  ): Promise<FormFieldType | null> {
    const config = data?.config ? JSON.parse(JSON.stringify(data.config)) : {};
    return await this.prisma.formField.create({
      data: {
        id: this.ulidService.generateFormFieldId('ff'),
        formId,
        formPageId,
        position: createFractionalIndex(
          data?.prevFieldId ?? null,
          data?.nextFieldId ?? null,
        ),
        config,
      },
    });
  }

  async updateField(
    formFieldId: string,
    formPageId: string,
    data: UpdateFormFieldDto,
  ): Promise<FormFieldType | null> {
    const position =
      data?.prevFieldId || data?.nextFieldId
        ? createFractionalIndex(
            data?.prevFieldId ?? null,
            data?.nextFieldId ?? null,
          )
        : undefined;
    const config = data?.config ? JSON.parse(JSON.stringify(data.config)) : {};
    return await this.prisma.formField.update({
      where: {
        id: formFieldId,
        formPageId,
      },
      data: {
        position,
        config,
      },
    });
  }

  async deleteField(
    formFieldId: string,
    formPageId: string,
  ): Promise<FormFieldType | null> {
    return await this.prisma.formField.delete({
      where: {
        id: formFieldId,
        formPageId,
      },
    });
  }

  async getField(
    formFieldId: string,
    formPageId: string,
  ): Promise<FormFieldType | null> {
    return await this.prisma.formField.findUnique({
      where: {
        id: formFieldId,
        formPageId,
      },
    });
  }

  async getPageFields(
    formId: string,
    formPageId: string,
  ): Promise<FormFieldType[] | null> {
    return await this.prisma.formField.findMany({
      where: {
        formId,
        formPageId,
      },
    });
  }
}
