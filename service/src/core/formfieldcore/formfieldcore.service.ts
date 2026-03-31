import { Injectable } from '@nestjs/common';
import { createFractionalIndex } from 'src/func/fractional-indexing';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { CreateFormFieldDto, FormFieldType } from 'src/types/formfield.types';

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
}
