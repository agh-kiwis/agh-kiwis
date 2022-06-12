import { Field, ObjectType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GeneralEntity } from '../../utils/GeneralEntity';

@Entity()
@ObjectType()
export class ChunkInfo extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'interval' })
  minTimeBetweenChunks: IPostgresInterval;

  @Field(() => String)
  @Column({ type: 'interval' })
  minChunkDuration: IPostgresInterval;

  @Field(() => String)
  @Column({ type: 'interval' })
  maxChunkDuration: IPostgresInterval;
}
