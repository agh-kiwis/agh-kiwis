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
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  // TODO Maybe remove business logic from entity
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  @Column()
  password: string;

  @Column()
  previousPassword: string;

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

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  @Index()
  hash: string | null;
}
