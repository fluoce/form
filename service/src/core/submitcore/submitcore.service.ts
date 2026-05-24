import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { SubmitDto } from 'src/types/submit.types';

@Injectable()
export class SubmitcoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ulidService: UlidService,
  ) {}

  async addSubmissionAnswer(data: SubmitDto): Promise<Boolean> {
    return await this.prisma.$transaction(async (prisma) => {
      const submit = await prisma.submit.upsert({
        where: {
          id: data.submissionId,
        },
        create: {
          id: data.submissionId,
          formId: data.formId,
          status: data?.done ? 'COMPLETED' : undefined,
        },
        update: {
          updatedAt: new Date(),
          status: data?.done ? 'COMPLETED' : undefined,
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
}
