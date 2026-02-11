import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const Form = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.form
    }
)