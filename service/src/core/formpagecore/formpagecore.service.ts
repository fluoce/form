import { Injectable } from '@nestjs/common';
import { createFractionalIndex } from 'src/func/fractional-indexing';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UlidService } from 'src/lib/ulid/ulid.service';
import {
  CreateFormPageDto,
  FormPageType,
  UpdateFormPageDto,
} from 'src/types/formpage.types';

@Injectable()
export class FormpagecoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ulidService: UlidService,
  ) {}

  async createFormPage(
    formId: string,
    data: CreateFormPageDto,
  ): Promise<FormPageType | null> {
    return await this.prisma.$transaction(async (prisma) => {
      const lastPage = await prisma.formPage.findFirst({
        where: { formId },
        orderBy: { position: 'desc' },
        select: { position: true },
      });
      const prevPosition = lastPage?.position ?? null;
      const nextPosition = createFractionalIndex(prevPosition, null);
      return await prisma.formPage.create({
        data: {
          id: this.ulidService.generateFormPageId('fp'),
          formId,
          name: data?.name || 'page',
          position: nextPosition,
        },
      });
    });
  }

  async updateFormPage(
    formId: string,
    formPage: Pick<FormPageType, 'id' | 'position'>,
    data: UpdateFormPageDto,
  ): Promise<FormPageType | null> {
    if (data?.name) {
      return await this.prisma.formPage.update({
        where: {
          id: formPage.id,
          formId,
        },
        data: {
          name: data?.name ?? undefined,
        },
      });
    }

    const [prev, next] = await Promise.all([
      data.prevPageId
        ? this.prisma.formPage.findUnique({
            where: {
              id: data.prevPageId,
              formId,
            },
            select: {
              position: true,
            },
          })
        : Promise.resolve(null),

      data.nextPageId
        ? this.prisma.formPage.findUnique({
            where: {
              id: data.nextPageId,
              formId,
            },
            select: {
              position: true,
            },
          })
        : Promise.resolve(null),
    ]);

    const newPosition = createFractionalIndex(
      prev?.position ?? null,
      next?.position ?? null,
    );

    return await this.prisma.formPage.update({
      where: {
        formId,
        id: formPage.id,
      },
      data: {
        position: newPosition,
      },
      select: {
        id: true,
        formId: true,
        name: true,
        position: true,
        createdAt: true,
        updatedAt: true,
        formField: true,
      },
    });
  }

  async deleteFormPage(
    formId: string,
    formPageId: string,
  ): Promise<FormPageType | null> {
    return await this.prisma.$transaction(async (tx) => {
      return await tx.formPage.delete({
        where: {
          id: formPageId,
          formId,
        },
      });
    });
  }

  async getFormPage(
    formId: string,
    formPageId: string,
  ): Promise<FormPageType | null> {
    return await this.prisma.formPage.findUnique({
      where: {
        id: formPageId,
        formId: formId,
      },
    });
  }

  async getFormPages(formId: string): Promise<FormPageType[] | null> {
    return await this.prisma.formPage.findMany({
      where: {
        formId,
      },
      select: {
        id: true,
        formId: true,
        name: true,
        position: true,
        createdAt: true,
        updatedAt: true,
        formField: true,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async totalFormPageCount(formId: string): Promise<Number | null> {
    return await this.prisma.formPage.count({
      where: {
        formId,
      },
    });
  }
}
