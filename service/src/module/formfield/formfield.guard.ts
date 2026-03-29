import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { validateId } from 'src/func/validate-id';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { UserPayload } from 'src/types/payload.types';

@Injectable()
export class FormfieldGuard implements CanActivate {
  constructor(
    private readonly ulidService: UlidService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const user = (req as any).user as UserPayload;
    const userId = user.sub;

    const { formId, formPageId, formFieldId } = req.params as {
      formId: string;
      formPageId: string;
      formFieldId: string;
    };

    validateId(formId, 'form', (ulid) => this.ulidService.isValidUlid(ulid));
    validateId(formPageId, 'fp', (ulid) => this.ulidService.isValidUlid(ulid));
    validateId(formFieldId, 'ff', (ulid) => this.ulidService.isValidUlid(ulid));

    const formField = await this.prisma.formField.findFirst({
      where: {
        id: formFieldId,
        formPage: {
          id: formPageId,
          form: {
            id: formId,
            userId,
          },
        },
      },
    });

    if (!formField) {
      throw new NotFoundException('form field not found');
    }

    (req as any).formField = formField;

    return true;
  }
}
