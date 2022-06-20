import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthProvidersEnum } from '../../auth/auth-providers.enum';
import { Category } from '../../categories/entities/category.entity';
import { Task } from '../../tasks/entities/task.entity';
import { GeneralEntity } from '../../utils/GeneralEntity';

@ObjectType()
@Entity()
export class User extends GeneralEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string | null;

  @BeforeInsert()
  @BeforeUpdate()
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

  // TODO Create NullableField decorator
  @Field({ nullable: true })
  @Column({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  @Index()
  @Column({ nullable: true })
  name?: string | null;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks?: Task[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Column({ default: true })
  isEnabled: boolean;
}
