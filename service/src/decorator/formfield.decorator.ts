import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FormField = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.formField;
  },
);
