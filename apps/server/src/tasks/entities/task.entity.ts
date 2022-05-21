import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';
import { ChunkInfo } from './chunkInfo.entity';
import { Notification } from './notification.entity';
import { Priority } from './priority.entity';
import { TaskBreakdown } from './taskBreakdown.entity';

@ObjectType()
@Entity()
export class Task {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index()
  @Column()
  name: string | null;

  @ManyToOne(() => Category, (category) => category.tasks)
  category: Category;

  @ManyToOne(() => Priority, (priority) => priority.tasks)
  priority: Priority;

  @Field()
  @Column()
  isFloat: boolean;

  @OneToOne(() => ChunkInfo)
  @JoinColumn()
  chunkInfo: ChunkInfo;

  @Field()
  @Column({ type: 'interval' })
  chillTime: Date;

  @ManyToOne(() => Notification, (notification) => notification.tasks)
  notifications: Notification;

  @Field()
  @Column()
  shouldAutoResolve: boolean;

  @Column({ type: 'interval' })
  estimation: Date;

  @OneToMany(() => TaskBreakdown, (taskBreakdown) => taskBreakdown.task)
  taskBreakdowns: TaskBreakdown[];

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt: Date;
}
