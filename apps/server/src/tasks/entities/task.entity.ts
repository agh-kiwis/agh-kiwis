import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Duration } from 'moment';
import { Category } from '../../categories/entities/category.entity';
import { IntervalColumn } from '../../types/IntervalColumn';
import { User } from '../../users/entities/user.entity';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { NullableField } from '../../utils/NullableField';
import { Interval } from '../../utils/interval.scalar';
import { ChunkInfo } from './chunkInfo.entity';
import { Notification } from './notification.entity';
import { TaskBreakdown } from './taskBreakdown.entity';

@ObjectType()
@Entity()
export class Task extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({
    description:
      'The name of the task, which is assigned by the user and can be changed in the future.',
  })
  @Index()
  @Column()
  name: string;

  @Field(() => Category, {
    description:
      'The category to which the task belongs. Category needs to be created by the user either before or during the task creation (in corresponding mutation).',
  })
  @ManyToOne(() => Category, (category) => category.tasks, { eager: true })
  category: Category;

  // TODO Think if this needs to be enum
  @Field(() => String, {
    description:
      'Priority is created by admins and can not be changed by users.',
  })
  @Column()
  priority: string;

  @Field({
    description:
      'Whether the task is a const or float. Float tasks are tasks that user wants algorithm to replan according to const tasks and other float tasks. In other words const tasks have fixed start and end times.',
  })
  @Column()
  isFloat: boolean;

  @Field({
    nullable: true,
    description:
      'Chunk is a connection for task with real time. Const tasks have stale one chunk, while floats can have many chunks. Chunk represents task in time. This field contains chunk preferences for the concrete task.',
  })
  @OneToOne(() => ChunkInfo, { eager: true })
  @JoinColumn()
  chunkInfo: ChunkInfo;

  @Field(() => Interval, {
    description:
      'A minimum time gap that user wants to have between this task and another tasks.',
  })
  @IntervalColumn()
  chillTime: Duration;

  @Field({
    description:
      'Whether or not to mark task chunk(s) as done after the time (deadline for that particular chunk) has passed.',
  })
  @Column({ default: false })
  shouldAutoResolve: boolean;

  @Field({
    description:
      'Whether or not the whole task is done. Should be done only if all task chunks are done.',
  })
  // TODO Convert this to view later on
  @Column({ default: false })
  isDone: boolean;

  @NullableField(() => Interval, {
    description:
      'Estimation on how much time this task would take. This can change in time and according to that value planning algorithm (in case of float tasks) will replan the task.',
  })
  @IntervalColumn({ nullable: true })
  estimation: Duration;

  @NullableField(() => String, {
    description: 'Point in time when the whole task needs to be done.',
  })
  @Column({ type: 'timestamp with time zone', nullable: true })
  deadline?: Date;

  // TODO Rename this to chunks
  @NullableField(() => [TaskBreakdown], {
    description:
      'Represents task in time, should be named chunk instead. Preferences are in ChunkInfo field.',
  })
  @OneToMany(() => TaskBreakdown, (taskBreakdown) => taskBreakdown.task)
  taskBreakdowns: TaskBreakdown[];

  @NullableField(() => Notification, {
    description: 'Notification preferences.',
  })
  @ManyToOne(() => Notification, (notification) => notification.tasks)
  notifications: Notification;

  @ManyToOne(() => User, (user: User) => user.tasks, { nullable: false })
  user: Promise<User>;
}
