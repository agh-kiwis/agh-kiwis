import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Duration } from 'moment';
import { IntervalColumn } from '../../types/IntervalColumn';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Interval } from '../../utils/interval.scalar';

@Entity()
@ObjectType()
export class ChunkInfo extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({
    description:
      'The time when task should start. This can be different from taskBreakdown.start, as it is just informative data unrelated with real planed entity.',
  })
  @Column({ type: 'timestamp with time zone' })
  start: Date;

  @Field(() => Interval)
  @IntervalColumn()
  minTimeBetweenChunks: Duration;

  @Field(() => Interval)
  @IntervalColumn()
  minChunkDuration: Duration;

  @Field(() => Interval)
  @IntervalColumn()
  maxChunkDuration: Duration;
}
