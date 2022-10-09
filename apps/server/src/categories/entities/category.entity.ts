import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Color } from './color.entity';

@ObjectType()
@Entity()
export class Category extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index()
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.categories)
  @Index()
  user: User;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];

  @Field(() => Color)
  @ManyToOne(() => Color, { eager: true })
  color: Color;
}
