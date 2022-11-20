import { Field, InputType } from '@nestjs/graphql';
import { RepeatType } from '../entities/repeat.entity';

// TODO Add some validation there
@InputType()
export class RepeatInput {
  @Field(() => RepeatType, { defaultValue: RepeatType.DAYS })
  repeatType: RepeatType;

  @Field({ nullable: true })
  repeatEvery: number;

  @Field({ nullable: true })
  repeatUntil?: Date;
}
