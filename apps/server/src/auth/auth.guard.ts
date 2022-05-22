import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class JWTAuthGuard extends JwtStrategy {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    console.log(ctx.getContext().req);
    return ctx.getContext().req;
  }
}
