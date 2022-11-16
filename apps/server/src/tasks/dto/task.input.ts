import { IsEnum } from 'class-validator';
import { Duration } from 'moment';
import { Field, InputType } from '@nestjs/graphql';
import { NullableField } from '../../utils/NullableField';
import { Interval } from '../../utils/interval.scalar';
import { Priority } from '../entities/priority.enum';
import { CategoryInput } from './category.input';
import { ChunkInfoInput } from './chunkInfo.input';
import { RepeatInput } from './repeat.input';

// TODO Change this to ONLY PROPS THAT CAN BE UPDATED
// And add description to fields
@InputType()
export class TaskInput {
  @Field()
  id: number;

  // All tasks fields
  @NullableField()
  name: string;
  @NullableField()
  start: Date;
  @NullableField(() => Interval)
  chillTime: Duration;

  @NullableField()
  isFloat: boolean;

  @NullableField()
  shouldAutoResolve: boolean;
  @NullableField(() => CategoryInput)
  category: CategoryInput;
  @NullableField(() => RepeatInput)
  repeat?: RepeatInput;
  @NullableField(() => Interval)
  timeBeforeNotification: Duration;

  @NullableField(() => String)
  @IsEnum(Priority)
  priority: string;

  @NullableField(() => ChunkInfoInput)
  chunkInfo: ChunkInfoInput;

  @NullableField(() => Interval)
  estimation: Duration;

  @NullableField(() => Date)
  deadline: Date;

  @NullableField(() => Interval)
  duration: Duration;

  @NullableField()
  isDone: boolean;
}
