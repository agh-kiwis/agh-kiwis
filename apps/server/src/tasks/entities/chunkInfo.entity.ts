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

@Entity()
export class ChunkInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'interval' })
  minTimeBetweenChunks: IPostgresInterval;

  @Column({ type: 'interval' })
  minChunkDuration: IPostgresInterval;

  @Column({ type: 'interval' })
  maxChunkDuration: IPostgresInterval;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
