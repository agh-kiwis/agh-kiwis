import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
// In order to use AuthGuard together with GraphQL, you have to extend
// the built-in AuthGuard class and override getRequest() method.
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest(err: any, user: any) {
    console.log('Hello there!!!');
    console.log(user);
    if (err || !user) {
      throw err || new AuthenticationError('Authentication failed');
    }
    return user;
  }
}
