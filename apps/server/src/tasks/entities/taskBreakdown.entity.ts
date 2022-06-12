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

@Entity()
@ObjectType()
export class TaskBreakdown extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'timestamp with time zone' })
  start: Date;

  @Field(() => String)
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
