import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { SlugService } from 'src/lib/slug/slug.service';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { CreateFormDto, FormType, UpdateFormDto } from 'src/types/form.types';

@Injectable()
export class FormcoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ulidService: UlidService,
    private readonly slugService: SlugService,
  ) {}

  async formSlugExist(workspaceId: string, slug: string): Promise<boolean> {
    const exist = await this.prisma.form.findUnique({
      where: {
        workspaceId_slug: {
          workspaceId,
          slug,
        },
      },
    });
    if (exist) {
      return true;
    }
    return false;
  }

  async createForm(
    userId: string,
    workspaceId: string,
    data: CreateFormDto,
  ): Promise<FormType | null> {
    let baseSlug = this.slugService.baseSlug(data.name);
    let slug = baseSlug;
    let tries = 0;
    const maxTries = 3;
    while ((await this.formSlugExist(workspaceId, slug)) && tries < maxTries) {
      slug = this.slugService.generateUniqueSlug(baseSlug);
      tries++;
    }
    if (!slug || (await this.formSlugExist(workspaceId, slug))) return null;
    return await this.prisma.form.create({
      data: {
        id: this.ulidService.generateFormId('form'),
        workspaceId,
        userId,
        name: data.name,
        slug,
        shareId: this.ulidService.generateFormShareId(),
        version: 1,
      },
    });
  }

  async updateForm(
    userId: string,
    formId: string,
    data: UpdateFormDto,
  ): Promise<FormType | null> {
    return await this.prisma.form.update({
      where: {
        id: formId,
        userId,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteForm(userId: string, formId: string): Promise<FormType | null> {
    return await this.prisma.form.delete({
      where: {
        id: formId,
        userId,
      },
    });
  }

  async getForm(userId: string, formId: string): Promise<FormType | null> {
    return await this.prisma.form.findUnique({
      where: {
        id: formId,
        userId,
      },
    });
  }

  async getTrashForm(
    userId: string,
    workspaceId: string,
  ): Promise<FormType[] | null> {
    return await this.prisma.form.findMany({
      where: {
        userId,
        workspaceId,
        status: 'ARCHIVED',
      },
    });
  }

  async getForms(
    userId: string,
    workspaceId: string,
  ): Promise<FormType[] | null> {
    return await this.prisma.form.findMany({
      where: {
        workspaceId,
        userId,
        status: {
          not: 'ARCHIVED',
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async publishForm(userId: string, formId: string): Promise<FormType | null> {
    return await this.prisma.form.update({
      where: {
        id: formId,
        userId,
      },
      data: {
        version: {
          increment: 1,
        },
        status: 'PUBLISHED',
      },
    });
  }

  async getPreviewForm(shareId: string): Promise<FormType | null> {
    return await this.prisma.form.findUnique({
      where: {
        shareId,
      },
      include: {
        formPage: {
          include: {
            formField: {
              orderBy: {
                position: 'asc',
              },
            },
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }

  async getFullForm(shareId: string): Promise<FormType | null> {
    return await this.prisma.form.findUnique({
      where: {
        shareId,
        status: 'PUBLISHED',
      },
      include: {
        formPage: {
          include: {
            formField: {
              orderBy: {
                position: 'asc',
              },
            },
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }
}
