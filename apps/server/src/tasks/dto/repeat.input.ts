import { Field, InputType } from '@nestjs/graphql';
import { RepeatType } from '../entities/repeat.entity';

// TODO Add some validation there
@InputType()
export class RepeatInput {
  @Field()
  startFrom: Date;

  @Field()
  repeatEvery: number;

  // TODO It's better to put defaults closer to db
  @Field(() => RepeatType, { defaultValue: RepeatType.DAYS })
  repeatType: RepeatType;
}
