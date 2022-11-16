import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { GeneralEntity } from '../../utils/GeneralEntity';

export enum RepeatType {
  DAYS = 'Days',
  WEEKS = 'Weeks',
  MONTHS = 'Months',
  YEARS = 'Years',
}

// TODO This needs to be converted to a virtual entity with no db connection.
@Entity()
@ObjectType({ description: 'Applicable only to const tasks repeat property.' })
export class Repeat extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'int' })
  repeatEvery: number;

  @Field()
  @Column({ type: 'enum', enum: RepeatType, default: RepeatType.DAYS })
  repeatType: RepeatType;
}
