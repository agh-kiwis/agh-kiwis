import { Field, ObjectType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Task } from './task.entity';

@Entity()
@ObjectType()
export class Notification extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  // TODO Add some default
  @Column({ type: 'interval' })
  timeBefore: IPostgresInterval;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
