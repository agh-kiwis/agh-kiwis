import { Field, ObjectType } from '@nestjs/graphql';
import { Duration } from 'moment';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Repeat } from './repeat.entity';
import { Task } from './task.entity';
import { IntervalColumn } from '../../types/IntervalColumn';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Interval } from '../../utils/interval.scalar';

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

  @ManyToOne(() => Task, (task) => task.taskBreakdowns)
  task: Task;

  @Field()
  @OneToOne(() => Repeat)
  @JoinColumn()
  repeat: Repeat;
}
