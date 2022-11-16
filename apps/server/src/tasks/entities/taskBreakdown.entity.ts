import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Duration } from 'moment';
import { Field, ObjectType } from '@nestjs/graphql';
import { IntervalColumn } from '../../types/IntervalColumn';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Interval } from '../../utils/interval.scalar';
import { Repeat } from './repeat.entity';
import { Task } from './task.entity';

@Entity()
@ObjectType()
export class TaskBreakdown extends GeneralEntity {
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

  @ManyToOne(() => Task, (task) => task.taskBreakdowns, {
    onDelete: 'CASCADE',
  })
  task: Task;
}
