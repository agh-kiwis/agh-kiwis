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

@Entity()
export class TaskBreakdown extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp with time zone' })
  start: Date;

  @Column({ type: 'interval' })
  duration: IPostgresInterval;

  @ManyToOne(() => Task, (task) => task.taskBreakdowns)
  task: Task;

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
