import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
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
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { ChunkInfo } from './chunkInfo.entity';
import { Notification } from './notification.entity';
import { Priority } from './priority.entity';
import { TaskBreakdown } from './taskBreakdown.entity';
import { IPostgresInterval } from 'postgres-interval';

@ObjectType()
@Entity()
export class Task extends BaseEntity {
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

  @Field(() => String)
  @Column({ type: 'interval' })
  chillTime: IPostgresInterval;

  @ManyToOne(() => Notification, (notification) => notification.tasks)
  notifications: Notification;

  @Field()
  @Column({ default: false })
  shouldAutoResolve: boolean;

  @Column({ type: 'interval', nullable: true })
  estimation: IPostgresInterval;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deadline?: Date;

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
