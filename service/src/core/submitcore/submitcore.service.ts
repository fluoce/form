import { Injectable } from '@nestjs/common';
import { JsonValue } from '@prisma/client/runtime/client';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { SubmissionsType, SubmitDto, SubmitType } from 'src/types/submit.types';
import { UserAgentType } from 'src/types/types';

@Injectable()
export class SubmitcoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ulidService: UlidService,
  ) {}

  async addSubmissionAnswer(
    data: SubmitDto,
    meta: {
      ipAddress: string;
      userAgent: UserAgentType;
    },
  ): Promise<Boolean> {
    return await this.prisma.$transaction(async (prisma) => {
      const submit = await prisma.submit.upsert({
        where: {
          id: data.submissionId,
        },
        create: {
          id: data.submissionId,
          formId: data.formId,
          status: data?.done ? 'COMPLETED' : undefined,
          ipAddress: meta.ipAddress,
          device: meta.userAgent.device,
          os: meta.userAgent.os,
          browser: meta.userAgent.browser,
        },
        update: {
          updatedAt: new Date(),
          status: data?.done ? 'COMPLETED' : undefined,
          completedAt: data?.done ? new Date() : undefined,
        },
      });
      if (!submit) {
        return false;
      }
      const answers = Object.entries(data.answers);
      if (!answers.length) {
        return false;
      }
      await Promise.all(
        answers.map(([fieldId, value]) =>
          prisma.submissionAnswer.upsert({
            where: {
              submitId_fieldId: {
                submitId: submit.id,
                fieldId,
              },
            },
            create: {
              id: this.ulidService.generateSubmissionAnswerId('ans'),
              submitId: submit.id,
              fieldId,
              valueText: typeof value === 'string' ? value : null,
              valueNumber: typeof value === 'number' ? value : null,
              valueBoolean: typeof value === 'boolean' ? value : null,
              valueJson:
                value !== null &&
                (Array.isArray(value) || typeof value === 'object')
                  ? value
                  : null,
            },
            update: {
              valueText: typeof value === 'string' ? value : null,
              valueNumber: typeof value === 'number' ? value : null,
              valueBoolean: typeof value === 'boolean' ? value : null,
              valueJson:
                value !== null &&
                (Array.isArray(value) || typeof value === 'object')
                  ? value
                  : null,
            },
          }),
        ),
      );
      return true;
    });
  }

  async getSubmitOverview(formId: string) {
    const [total, completed, desktop, mobile, tablet] = await Promise.all([
      this.prisma.submit.count({
        where: {
          formId,
        },
      }),
      this.prisma.submit.count({
        where: {
          formId,
          status: 'COMPLETED',
        },
      }),
      this.prisma.submit.count({
        where: {
          formId,
          device: 'desktop',
        },
      }),
      this.prisma.submit.count({
        where: {
          formId,
          device: 'mobile',
        },
      }),
      this.prisma.submit.count({
        where: {
          formId,
          device: 'tablet',
        },
      }),
    ]);
    return {
      submissionCounts: {
        total,
        completed,
        partial: total - completed,
      },
      deviceCounts: {
        desktop,
        mobile,
        tablet,
        other: total - desktop - mobile - tablet,
      },
    };
  }

  async getSubmissions(formId: string): Promise<SubmissionsType> {
    const [formFields, submissions] = await Promise.all([
      this.prisma.formField.findMany({
        where: {
          formId,
        },
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          id: true,
          config: true,
        },
      }),
      this.prisma.submit.findMany({
        where: {
          formId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          submissionAnswer: true,
        },
      }),
    ]);
    return { formFields, submissions };
  }
}
