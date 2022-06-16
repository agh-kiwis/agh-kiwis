import { Field, ObjectType } from '@nestjs/graphql';
import { IPostgresInterval } from 'postgres-interval';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { Interval } from '../../utils/interval.scalar';

@Entity()
@ObjectType()
export class ChunkInfo extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Interval)
  @Column({ type: 'interval' })
  minTimeBetweenChunks: IPostgresInterval;

  @Field(() => Interval)
  @Column({ type: 'interval' })
  minChunkDuration: IPostgresInterval;

  @Field(() => Interval)
  @Column({ type: 'interval' })
  maxChunkDuration: IPostgresInterval;
}
