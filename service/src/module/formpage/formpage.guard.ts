import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { validateId } from 'src/func/validate-id';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { UserPayload } from 'src/types/payload.types';

@Injectable()
export class FormpageGuard implements CanActivate {
  constructor(
    private readonly ulidService: UlidService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const user = (req as any).user as UserPayload;
    const userId = user.sub;

    const { formId, formPageId } = req.params as {
      formId: string;
      formPageId: string;
    };

    validateId(formId, 'form', (ulid) => this.ulidService.isValidUlid(ulid));
    validateId(formPageId, 'fp', (ulid) => this.ulidService.isValidUlid(ulid));

    const formPage = await this.prisma.formPage.findFirst({
      where: {
        id: formPageId,
        form: {
          id: formId,
          userId,
        },
      },
    });

    if (!formPage) {
      throw new NotFoundException('form page not found');
    }

    (req as any).formPage = formPage;

    return true;
  }
}
