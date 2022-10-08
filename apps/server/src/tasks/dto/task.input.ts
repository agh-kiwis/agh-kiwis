import { Field, InputType } from '@nestjs/graphql';
import { Duration } from 'moment';
import { Interval } from '../../utils/interval.scalar';
import { NullableField } from '../../utils/NullableField';
import { CategoryInput } from './category.input';
import { ChunkInfoInput } from './chunkInfo.input';
import { RepeatInput } from './repeat.input';

// TODO Change this to ONLY PROPS THAT CAN BE UPDATED
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
  shouldAutoResolve: boolean;
  @NullableField(() => CategoryInput)
  category: CategoryInput;
  @NullableField(() => RepeatInput)
  repeat?: RepeatInput;
  @NullableField(() => Interval)
  timeBeforeNotification: Duration;
  // TODO There always need to be a priority in the database for this to work
  @NullableField((() => Number))
  priorityId: number;
    
    
    // Float task fields (without duplicating start field)
 @NullableField(() => ChunkInfoInput)
  chunkInfo: ChunkInfoInput;

  @NullableField(() => Interval)
  estimation: Duration;

  @NullableField(() => Date)
  deadline: Date;

    
    // Const task fields
      @NullableField(() => Interval)
    duration: Duration;  
    
    @NullableField()
    isDone: boolean;
    
}
