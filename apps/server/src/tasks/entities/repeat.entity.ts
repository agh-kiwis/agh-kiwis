import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { GeneralEntity } from '../../utils/GeneralEntity';

export enum RepeatType {
  DAYS = 'Days',
  WEEKS = 'Weeks',
  MONTHS = 'Months',
  YEARS = 'Years',
}

@Entity()
@ObjectType({ description: 'Applicable only to const tasks repeat property.' })
export class Repeat extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'timestamp with time zone' })
  startFrom: Date;

  @Field()
  @Column({ type: 'int' })
  repeatEvery: number;

  @Field()
  @Column({ type: 'enum', enum: RepeatType, default: RepeatType.DAYS })
  repeatType: RepeatType;
}
