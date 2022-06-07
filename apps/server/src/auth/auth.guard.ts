import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
// TODO Change this
export class JWTAuthGuard extends JwtStrategy {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
