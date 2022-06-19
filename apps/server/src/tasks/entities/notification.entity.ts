/* eslint-disable @typescript-eslint/ban-types */
import { Field, ObjectType } from '@nestjs/graphql';
import { Duration } from 'moment';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IntervalColumn } from '../../types/IntervalColumn';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Interval } from '../../utils/interval.scalar';
import { Task } from './task.entity';

@Entity()
@ObjectType()
export class Notification extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Interval)
  @IntervalColumn()
  timeBefore: Duration;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
