import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string | null;

  @Column()
  password: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Index()
  @Column()
  name: string | null;

  @Field()
  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt: Date;
}
