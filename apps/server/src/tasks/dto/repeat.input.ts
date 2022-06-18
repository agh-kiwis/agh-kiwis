import { Field, InputType } from '@nestjs/graphql';
import { RepeatType } from '../entities/repeat.entity';

// TODO Add some validation there
@InputType()
export class RepeatInput {
  @Field()
  startFrom: Date;

  @Field()
  repeatEvery: number;

  @Field(() => RepeatType, { defaultValue: RepeatType.DAYS })
  repeatType: RepeatType;
}
