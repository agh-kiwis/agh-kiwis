import { Field, ObjectType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Interval } from '../../utils/interval.scalar';
import { Task } from './task.entity';

@Entity()
@ObjectType()
export class Notification extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Interval)
  // TODO Add some default
  @Column({ type: 'interval' })
  timeBefore: IPostgresInterval;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
