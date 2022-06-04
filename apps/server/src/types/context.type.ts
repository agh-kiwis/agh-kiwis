/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO Fix types
import { User } from '../users/entities/user.entity';

export type ContextResponse = Response & any;

export type ContextRequest = Request & any;

export interface CustomContext {
  req: ContextRequest;

  res: ContextResponse;

  clientId: number;

  user?: User;
}
