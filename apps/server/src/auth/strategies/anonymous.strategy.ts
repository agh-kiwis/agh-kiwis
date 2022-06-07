import { Strategy } from 'passport-anonymous';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
// TODO this is not working
export class AnonymousStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  public validate(_payload: unknown, request: unknown): unknown {
    return request;
  }
}
