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
import { Field, ObjectType } from '@nestjs/graphql';
import { AuthProvidersEnum } from '../../auth/auth-providers.enum';
import { Category } from '../../categories/entities/category.entity';
import { Task } from '../../tasks/entities/task.entity';
import { GeneralEntity } from '../../utils/GeneralEntity';
import { NullableField } from '../../utils/NullableField';

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
    if (
      this.password &&
      (!this.previousPassword ||
        (await passwordUpdated(this.previousPassword, this.password)))
    ) {
      this.previousPassword = this.password;
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  // This field is null in case of social login
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  previousPassword?: string;

  @NullableField()
  @Column({ nullable: true })
  gender?: string;

  @NullableField()
  @Index()
  @Column({ nullable: true })
  name?: string | null;

  @NullableField()
  @Column({ nullable: true })
  birthDate?: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks?: Task[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Field()
  @Column({ default: false })
  introductionCompleted: boolean;

  @Column({ default: true })
  isEnabled: boolean;
}

const passwordUpdated = async (
  newPasswordPlain: string,
  previousPasswordHash: string
) => {
  if (!newPasswordPlain || !previousPasswordHash) {
    return false;
  }
  await bcrypt.compare(newPasswordPlain, previousPasswordHash);
};
