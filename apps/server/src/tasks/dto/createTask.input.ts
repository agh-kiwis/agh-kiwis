import { IsEnum } from 'class-validator';
import { Duration } from 'moment';
import { Field, InputType } from '@nestjs/graphql';
import { NullableField } from '../../utils/NullableField';
import { Interval } from '../../utils/interval.scalar';
import { Priority } from '../entities/priority.enum';
import { CategoryInput } from './category.input';

// TODO Add Validation
@InputType()
export class CreateTaskInput {
  @Field({
    description:
      'The name of the task, which is assigned by the user and can be changed in the future.',
  })
  name: string;

  @Field(() => CategoryInput, {
    description: 'Either existing category id or new category name and color.',
  })
  category: CategoryInput;

  @Field({ defaultValue: 'medium' })
  @IsEnum(Priority)
  priority: string;

  @Field({
    description:
      'The time when task should start. This can be different from chunk.start, as it is just informative data unrelated with real planed entity.',
  })
  start: Date;

  @Field(() => Interval, {
    description:
      'A minimum time gap that user wants to have between this task and another tasks.',
  })
  chillTime: Duration;

  @Field({
    defaultValue: false,
    description:
      'Whether or not to mark task chunk(s) as done after the time (deadline for that particular chunk) has passed.',
  })
  shouldAutoResolve: boolean;

  @NullableField(() => Interval, {
    description: 'The time before user wants to receive task notification.',
  })
  timeBeforeNotification: Duration;
}
