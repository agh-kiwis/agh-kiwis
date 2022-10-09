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
import { Interval } from '../../utils/interval.scalar';
import { ChunkInfo } from './chunkInfo.entity';
import { Notification } from './notification.entity';
import { Priority } from './priority.entity';
import { TaskBreakdown } from './taskBreakdown.entity';

@ObjectType()
@Entity()
export class Task extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index()
  @Column()
  name: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.tasks, { eager: true })
  category: Category;

  @Field(() => Priority)
  @ManyToOne(() => Priority, { eager: true })
  priority: Priority;

  @Field()
  @Column()
  isFloat: boolean;

  @Field({ nullable: true })
  @OneToOne(() => ChunkInfo, { eager: true })
  @JoinColumn()
  chunkInfo: ChunkInfo;

  @Field(() => Interval)
  @IntervalColumn()
  chillTime: Duration;

  @Field()
  @Column({ default: false })
  shouldAutoResolve: boolean;

  @Field()
  @Column({ default: false })
  isDone: boolean;

  @Field(() => Interval, { nullable: true })
  @IntervalColumn({ nullable: true })
  estimation: Duration;

  @Field(() => String, { nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  deadline?: Date;

  @Field(() => [TaskBreakdown], { nullable: true })
  @OneToMany(() => TaskBreakdown, (taskBreakdown) => taskBreakdown.task)
  taskBreakdowns: TaskBreakdown[];

  @Field(() => Notification, { nullable: true })
  @ManyToOne(() => Notification, (notification) => notification.tasks)
  notifications: Notification;

  @ManyToOne(() => User, (user: User) => user.tasks)
  user: Promise<User>;
}
