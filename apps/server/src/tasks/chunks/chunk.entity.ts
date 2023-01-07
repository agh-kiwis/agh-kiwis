import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Duration } from 'moment';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IntervalColumn } from '../../types/IntervalColumn';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { NullableField } from '../../utils/NullableField';
import { Interval } from '../../utils/interval.scalar';
import { Task } from '../entities/task.entity';

@Entity()
@ObjectType()
export class Chunk extends GeneralEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'timestamp with time zone' })
  start: Date;

  @Field(() => Interval)
  @IntervalColumn()
  duration: Duration;

  @Field()
  @Column({ default: false })
  isDone: boolean;

  @NullableField(() => Task)
  @ManyToOne(() => Task, (task) => task.chunks, {
    onDelete: 'CASCADE',
  })
  task: Task;
}
