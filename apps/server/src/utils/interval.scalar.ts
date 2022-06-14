import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { IPostgresInterval } from 'postgres-interval';
import * as parse from 'postgres-interval';

@Scalar('Interval', () => Interval)
export class IntervalScalar implements CustomScalar<string, IPostgresInterval> {
  description = 'Interval from postgresInterval';

  parseValue(value: string): IPostgresInterval {
    return parse(value); // value from the client
  }

  serialize(value: IPostgresInterval): string {
    return value.toPostgres(); // value sent to the client
  }

  // TODO I have no idea what this function does
  parseLiteral(ast: ValueNode): IPostgresInterval {
    if (ast.kind === Kind.STRING) {
      return parse(ast.value);
    }
    return null;
  }
}

export class Interval {}
