import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp().getNext();
    return context?.req?.user;
  }
);
