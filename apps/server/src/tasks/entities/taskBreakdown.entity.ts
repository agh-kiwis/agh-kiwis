import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Repeat } from './repeat.entity';
import { Task } from './task.entity';
import { IPostgresInterval } from 'postgres-interval';
import { Field, ObjectType } from '@nestjs/graphql';
import { Interval } from '../../utils/interval.scalar';
import { GeneralEntity } from '../../utils/GeneralEntity';

@Entity()
@ObjectType()
export class TaskBreakdown extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'timestamp with time zone' })
  start: Date;

  @Field(() => Interval)
  @Column({ type: 'interval' })
  duration: IPostgresInterval;

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
