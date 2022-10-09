import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { GeneralEntity } from '../../utils/GeneralEntity';

@ObjectType()
@Entity()
export class Color extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index()
  @Column()
  hexCode: string;
}
