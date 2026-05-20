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
    let prevFieldId = data?.prevFieldId ?? null;
    let nextFieldId = data?.nextFieldId ?? null;
    if (!prevFieldId && !nextFieldId) {
      const lastField = await this.prisma.formField.findFirst({
        where: {
          formPageId,
        },
        orderBy: {
          position: 'desc',
        },
        select: {
          id: true,
          position: true,
        },
      });
      prevFieldId = lastField ? lastField?.position : null;
    }
    return await this.prisma.formField.create({
      data: {
        id: this.ulidService.generateFormFieldId('ff'),
        formId,
        formPageId,
        position: createFractionalIndex(prevFieldId, nextFieldId),
        config,
      },
    });
  }

  async createBulkField(
    formId: string,
    formPageId: string,
    data: {
      position: string;
      config: {
        type: string;
        label: string;
        placeholder: string;
        required: boolean;
      };
    }[],
  ): Promise<{
    count: number;
  } | null> {
    const payload: {
      id: string;
      formId: string;
      formPageId: string;
      position: string;
      config: {
        type: string;
        label: string;
        placeholder: string;
        required: boolean;
      };
    }[] = [];

    for (const field of data) {
      payload.push({
        id: this.ulidService.generateFormFieldId('ff'),
        formId,
        formPageId,
        position: field.position,
        config: field.config,
      });
    }

    if (!payload?.length) {
      return null;
    }

    return await this.prisma.formField.createMany({
      data: payload,
    });
  }

  async updateField(
    formFieldId: string,
    formPageId: string,
    data: UpdateFormFieldDto,
  ): Promise<FormFieldType | null> {
    const dataToUpdate: Record<string, any> = {};
    if (data?.prevFieldId || data?.nextFieldId) {
      const [prevPosition, nextPosition] = await Promise.all([
        data?.prevFieldId
          ? this.getFieldPosition(data.prevFieldId)
          : Promise.resolve(null),
        data?.nextFieldId
          ? this.getFieldPosition(data.nextFieldId)
          : Promise.resolve(null),
      ]);
      dataToUpdate.position = createFractionalIndex(
        prevPosition?.position ?? null,
        nextPosition?.position ?? null,
      );
    }

    if (data?.config) {
      dataToUpdate.config = JSON.parse(JSON.stringify(data.config));
    }

    return await this.prisma.formField.update({
      where: {
        id: formFieldId,
        formPageId,
      },
      data: {
        ...dataToUpdate,
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

  async getFieldPosition(formFieldId: string) {
    if (!formFieldId) return null;
    return await this.prisma.formField.findUnique({
      where: {
        id: formFieldId,
      },
      select: {
        position: true,
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
      orderBy: {
        position: 'asc',
      },
    });
  }
}
