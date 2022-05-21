import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Color } from './color.entity';
import { Task } from './task.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string | null;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];

  @OneToOne(() => Color)
  @JoinColumn()
  color: Color;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
