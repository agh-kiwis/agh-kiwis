import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { IPostgresInterval } from 'postgres-interval';
import * as parse from 'postgres-interval';

@Scalar('Interval', () => Interval)
export class IntervalScalar implements CustomScalar<string, IPostgresInterval> {
  description = 'Interval string for Postgres, read more in docs';

  parseValue(value: string): IPostgresInterval {
    return parse(value); // value from the client
  }

  serialize(value: IPostgresInterval): string {
    return value.toISOString(); // value sent to the client
  }

  // TODO I have no idea what this function does
  parseLiteral(ast: ValueNode): IPostgresInterval {
    if (ast.kind === Kind.STRING) {
      return parse(ast.value);
    }
    // TODO Parse date literal there
    return null;
  }
}

export class Interval {}
