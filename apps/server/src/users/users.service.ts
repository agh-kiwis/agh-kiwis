import { Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { InitialSeed } from '../database/initial-seed';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput) {
    const user: User = await User.create(createUserInput).save();

    for (const color of InitialSeed.colors) {
      await Color.create({
        hexCode: color,
      }).save();
    }

    InitialSeed.colors.forEach(async (color, index) => {
      await Category.create({
        color: await Color.findOne({ where: { hexCode: color } }),
        name: InitialSeed.categories[index],
        user: user,
      }).save();
    });

    return user;
  }

  findOne(fields: EntityCondition<User>) {
    return User.findOne({
      where: fields,
    });
  }

  async update(updateUserInput: UpdateUserInput) {
    const user: User = await User.findOne({
      where: {
        id: updateUserInput.id,
      },
    });

    user.name = updateUserInput.name;
    user.birthDate = updateUserInput.birthDate;
    user.gender = updateUserInput.gender;
    user.introductionCompleted = updateUserInput.introductionCompleted;

    return await user.save();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async softDelete(id: number): Promise<void> {
    await User.delete(id);
  }
}
