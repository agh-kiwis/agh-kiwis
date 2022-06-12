import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IPostgresInterval } from 'postgres-interval';
import { Field, InputType } from '@nestjs/graphql';

@Entity()
@InputType()
export class ChunkInfo extends BaseEntity {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
