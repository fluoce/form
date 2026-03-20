import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { FormpagecoreService } from 'src/core/formpagecore/formpagecore.service';
import { validateId } from 'src/func/validate-id';
import { UlidService } from 'src/lib/ulid/ulid.service';
import { FormType } from 'src/types/form.types';

@Injectable()
export class FormpageGuard implements CanActivate {
  constructor(
    private readonly ulidService: UlidService,
    private readonly formpagecoreService: FormpagecoreService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const form = (req as any).form as FormType;
    const { formPageId } = req.params as { formPageId: string };

    if (!formPageId) {
      throw new BadRequestException('Form page Id not provided');
    }

    validateId(formPageId, 'fp', (ulid) => this.ulidService.isValidUlid(ulid));

    const formPage = await this.formpagecoreService.getFormPage(
      form.id,
      formPageId,
    );

    if (!formPage) {
      throw new NotFoundException('form page not found');
    }

    (req as any).formPage = formPage;

    return true;
  }
}
