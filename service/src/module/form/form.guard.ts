import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import type { Request } from 'express';
import { FormcoreService } from 'src/core/formcore/formcore.service';
import { validateId } from 'src/func/validate-id';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { UserPayload } from 'src/types/payload.types';

@Injectable()
export class FormGuard implements CanActivate {

  constructor(
    private readonly fromcoreService: FormcoreService,
    private readonly ulidService: UlidService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const user = (req as any).user as UserPayload
    const userId = user.sub
    const { formId } = req.params as { formId: string };

    if (!formId) {
      throw new BadRequestException("Form Id not provided");
    }

    validateId(formId, 'form', (ulid) => this.ulidService.isValidUlid(ulid))

    const form = await this.fromcoreService.getForm(userId, formId)

    if (!form) {
      throw new NotFoundException("form not found");
    }

    (req as any).form = form

    return true;
  }
}
