import { Field, ObjectType } from '@nestjs/graphql';
import { Duration } from 'moment';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IntervalColumn } from '../../types/IntervalColumn';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Interval } from '../../utils/interval.scalar';

@Entity()
@ObjectType()
export class ChunkInfo extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  // We need to have information on when the task needs to be started
  @Field()
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
