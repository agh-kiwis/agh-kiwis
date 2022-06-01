import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
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
import * as bcrypt from 'bcryptjs';
import { AuthProvidersEnum } from '../../auth/auth-providers.enum';

@ObjectType()
@Entity()
// TODO Make some cleanup on types
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  // TODO Remove this to somewhere else, it's ugly and breaks every single rule
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  @Column()
  password: string;

  @Column({ nullable: true })
  previousPassword?: string;

  @Field()
  @Column({ nullable: true })
  gender?: string;

  @Field()
  @Index()
  @Column({ nullable: true })
  name?: string | null;

  @Field()
  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks?: Task[];

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Column({ default: true })
  isEnabled: boolean;

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
