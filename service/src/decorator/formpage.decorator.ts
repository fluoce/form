import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FormPage = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.formPage;
  },
);
