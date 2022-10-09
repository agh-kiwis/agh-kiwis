import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Task } from './task.entity';

@Entity()
@ObjectType()
export class Priority extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index()
  @Column()
  name: string | null;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
