import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import moment, { Duration } from 'moment';
import { Field, ObjectType } from '@nestjs/graphql';
import { IntervalColumn } from '../../types/IntervalColumn';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { NullableColumn } from '../../utils/NullableColumn';
import { NullableField } from '../../utils/NullableField';
import { Interval } from '../../utils/interval.scalar';
import { Repeat } from './repeat.entity';

// TODO Those fields need to be virtual later on
@Entity()
@ObjectType()
export class ChunkInfo extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  // Shared properties
  @Field({
    description:
      'The time when task should start. In case of float tasks this can be different from chunk.start, as it is just informative data unrelated with real planed entity.',
  })
  @Column({ type: 'timestamp with time zone' })
  start: Date;

  @Field(() => Interval, {
    // 15 minutes is a default value
    defaultValue: moment.duration(15, 'minutes').toISOString(),
    description:
      'A minimum time gap that user wants to have between this task and another tasks.',
  })
  @IntervalColumn()
  chillTime: Duration;

  // Const tasks properties

  @NullableField(() => Repeat, {
    description:
      'Only to const tasks. Describes how often the task should repeat. When representing task in time, the chunks WILL be duplicated for the sake of easier calculations.',
  })
  @OneToOne(() => Repeat)
  @JoinColumn()
  repeat?: Repeat;

  // Float tasks properties

  @NullableField(() => Interval, {
    description:
      'Only float tasks. Represents a minimum duration of the chunk this task needs to be divided into.',
  })
  @IntervalColumn({ nullable: true })
  minChunkDuration: Duration;

  @NullableField(() => Interval, {
    description:
      'Only float tasks. Represents a maximum duration of the chunk this task needs to be divided into.',
  })
  @IntervalColumn({ nullable: true })
  maxChunkDuration: Duration;

  @NullableField(() => Interval, {
    description:
      'Only float tasks. Estimation on how much time this task would take. This can change in time and according to that value planning algorithm (in case of float tasks) will replan the task.',
  })
  @IntervalColumn({ nullable: true })
  estimation: Duration;

  @NullableField(() => String, {
    description:
      'Only float tasks. Point in time when the whole task needs to be done.',
  })
  @NullableColumn({ type: 'timestamp with time zone' })
  deadline?: Date;
}
