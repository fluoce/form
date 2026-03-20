import { Injectable } from '@nestjs/common';
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
      const nextPosition = lastPage?.position ? lastPage.position.plus(1) : 1;
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
    if (data?.name && !data?.position) {
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

    if (data?.position && !formPage.position.equals(data.position)) {
      const newPosition = formPage.position.plus(data.position).dividedBy(2);

      return await this.prisma.formPage.update({
        where: {
          id: formPage.id,
          formId,
        },
        data: {
          position: newPosition,
          name: data?.name ?? undefined,
        },
      });
    }

    return null;
  }

  async deleteFormPage(
    formId: string,
    formPageId: string,
  ): Promise<FormPageType | null> {
    return await this.prisma.$transaction(async (tx) => {
      const formPage = await tx.formPage.delete({
        where: {
          id: formPageId,
          formId,
        },
      });

      await tx.formPage.updateMany({
        where: {
          formId,
          position: {
            gt: formPage.position,
          },
        },
        data: {
          position: {
            decrement: 1,
          },
        },
      });

      return formPage;
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
