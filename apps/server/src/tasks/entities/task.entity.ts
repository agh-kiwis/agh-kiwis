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
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { NullableField } from '../../utils/NullableField';
import { Chunk } from './chunk.entity';
import { ChunkInfo } from './chunkInfo.entity';
import { Notification } from './notification.entity';

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

  // TODO This needs to be renamed and or removed
  @Field({
    nullable: true,
    description:
      'Information about timings. Chunk is a connection for task with real time, and chunkInfo stores all needed for that planning data. Const tasks have stale one chunk, while floats can have many chunks. Chunk represents task in time. This field contains chunk preferences for the concrete task.',
  })
  @OneToOne(() => ChunkInfo, { eager: true, cascade: true })
  @JoinColumn()
  chunkInfo: ChunkInfo;

  @NullableField(() => [Chunk], {
    description:
      'Represents task in time, should be named chunk instead. Preferences are in ChunkInfo field.',
  })
  @OneToMany(() => Chunk, (chunk) => chunk.task)
  chunks: Chunk[];

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

  @NullableField(() => Notification, {
    description: 'Notification preferences.',
  })
  @ManyToOne(() => Notification, (notification) => notification.tasks)
  notifications: Notification;

  @ManyToOne(() => User, (user: User) => user.tasks, { nullable: false })
  user: Promise<User>;
}
