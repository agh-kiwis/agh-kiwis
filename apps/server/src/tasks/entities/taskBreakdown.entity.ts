import {
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

@Entity()
export class TaskBreakdown {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time with time zone' })
  start: Date;

  @Column({ type: 'interval' })
  duration: Date;

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
