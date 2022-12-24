import { Duration } from 'moment';
import { Field, InputType } from '@nestjs/graphql';
import { Interval } from '../../utils/interval.scalar';

@InputType()
export class ChunkInput {
  @Field({
    description: 'The time when chunk should start.',
  })
  start: Date;

  @Field(() => Interval, {
    description: 'Duration of the chunk.',
  })
  duration: Duration;

  @Field(() => Boolean, {
    description: 'Indicator whether the chunk is done.',
  })
  isDone: boolean;
}
