import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ChunkInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'interval' })
  minTimeBetweenChunks: Date;

  @Column({ type: 'interval' })
  minChunkDuration: Date;

  @Column({ type: 'interval' })
  maxChunkDuration: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
