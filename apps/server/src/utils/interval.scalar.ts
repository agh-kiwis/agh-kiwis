import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import moment = require('moment');
import { Duration } from 'moment';

@Scalar('Interval', () => Interval)
export class IntervalScalar implements CustomScalar<string, Duration> {
  description = 'Interval string for Postgres, read more in docs';

  parseValue(value: string): Duration {
    return moment.duration(value); // value from the client
  }

  serialize(value: Duration): string {
    return value.toISOString(); // value sent to the client
  }

  // TODO I have no idea what this function does
  parseLiteral(ast: ValueNode): Duration {
    if (ast.kind === Kind.STRING) {
      return moment.duration(ast.value);
    }
    return null;
  }
}

export class Interval {}
